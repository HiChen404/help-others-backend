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
const { audit_schema } = require('../schema/audit')
const { audit_controller } = require('../utils/database/audit')

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
  const { first, size, range, degree, categories, area } = req.query
  const [value, error] = await read({ first, size, range, degree, categories, area })
    .then(value => [value, null])
    .catch(err => [null, err])
  if (error) {
    return next(createError(500, '服务器错误'))
  }

  return res.send({
    code: 0,
    data: value,
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
router.patch('/data', validator.query(audit_schema), async (req, res) => {
  console.log(req.query)
  const [value, err] = await audit_controller(req.query)
    .then(res => [res, null])
    .catch(err => [null, err])
  if (err) {
    return res.send({
      code: '1',
      msg: err,
    })
  }
  res.send({
    code: 0,
    msg: '修改成功',
  })
})

module.exports = router
