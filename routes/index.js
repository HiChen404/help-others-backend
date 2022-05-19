const express = require('express')
const router = express.Router()
const db = require('../utils/database/create')
const createError = require('http-errors')
const validator = require('express-joi-validation').createValidator({})
const { sosInfo_schema } = require('../schema/sosInfo')
const { read } = require('../utils/database/read')

/* GET home page. */
router.post('/publish', validator.body(sosInfo_schema), async function (req, res, next) {
  const timeStamp = new Date().getTime()
  const { area, degree, username, phone, detail } = req.body
  const sosForm = {
    area,
    degree,
    username,
    phone,
    detail,
    create_at: timeStamp,
    audit_status: 0,
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

router.get('/data', async (req, res, next) => {
  //分页信息
  const { first, size, page } = req.query
  const [value, error] = await read({ first, size, page })
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

module.exports = router
