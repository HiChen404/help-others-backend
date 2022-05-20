const express = require('express')
const router = express.Router()
const db = require('../utils/database/create')
const createError = require('http-errors')
const validator = require('express-joi-validation').createValidator({})
const { sosInfo_schema } = require('../schema/sosInfo')
const { read } = require('../utils/database/read')
const { remove } = require('../utils/database/delete')
const { delete_schema } = require('../schema/delete')
const { query_schema } = require('../schema/query')
const { getCount } = require('../utils/database/getCount.js')

/* GET home page. */
router.post('/publish', validator.body(sosInfo_schema), async function (req, res, next) {
  const timeStamp = new Date().getTime()
  const { area, degree, username, phone, detail, categories } = req.body
  const sosForm = {
    area,
    degree,
    username,
    phone,
    detail,
    create_at: timeStamp,
    categories,
    audit_status: '0',
  }

  const [info, err] = await db
    .main(sosForm)
    .then(value => [value, null])
    .catch(err => [null, err])
  if (err) {
    return next(createError(500, '服务器错误'))
  }
  res.send({
    code: 0,
    msg: '发布成功，请您耐心等待!',
  })
})

router.get('/data', validator.query(query_schema), async (req, res, next) => {
  //分页信息
  const { first, size, range, degree, categories } = req.query
  const [value, error] = await read({ first, size, range, degree, categories })
    .then(value => [value, null])
    .catch(err => [null, err])
  if (error) {
    return next(createError(500, '服务器错误'))
  }
  const { total } = await getCount()

  return res.send({
    code: 0,
    data: { total: total, ...value },
  })
})

router.delete('/data', validator.query(delete_schema), async (req, res, next) => {
  const { id } = req.query
  const [value, error] = await remove(id)
    .then(value => {
      if (value.deleted === 0) {
        return ['该条目不存在', null]
      }
      return ['删除成功', null]
    })
    .catch(err => [null, err])
  if (error) {
    return next(createError(500, '服务器错误'))
  }
  return res.send({
    code: 0,
    msg: value,
  })
})

module.exports = router
