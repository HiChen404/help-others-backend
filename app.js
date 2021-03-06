const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const joi = require('joi')
const cors = require('cors')
const { create } = require('domain')
const rateLimit = require('express-rate-limit')

const sosRouter = require('./routes/sos')
const virusDataRouter = require('./routes/virusData')

const app = express()

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 限制時間
  max: 100, // 限制請求數量
  message: 'Too many requests, please try again later!',
})
app.use(limiter)
// view engine setup
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api', sosRouter)
app.use('/data', virusDataRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, '当前接口不存在'))
})
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  // res.status(err.status || 500)

  if (err instanceof joi.ValidationError)
    return res.send({
      code: err.statusCode || 500,
      msg: err.message,
    })

  res.send({
    code: err.statusCode || 500,
    msg: err.message,
  })
})

module.exports = app
