const joi = require('joi')

const first = joi.number().integer().required()
const size = joi.number().integer().required()
const range = joi.string().equal('0', '1', '2')
const degree = joi.string().equal('0', '1', '2', '3')
const categories = joi.string().equal('0', '1', '2', '3', '4')

exports.query_schema = joi.object({
  first,
  size,
  range,
  degree,
  categories,
})
