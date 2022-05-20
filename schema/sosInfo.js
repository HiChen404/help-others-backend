const joi = require('joi')

const area = joi
  .string()
  .length(6)
  .equal(
    '410102',
    '410103',
    '410104',
    '410105',
    '410106',
    '410108',
    '410122',
    '410181',
    '410182',
    '410183',
    '410184',
    '410185',
  )
  .required()
const degree = joi.string().length(1).equal('1', '2', '3').required()
const phone = joi.string().length(11).required()
const detail = joi.string().min(10).max(150).required()
const username = joi.string().min(2).max(15).required()
const categories = joi.string().length(1).equal('1', '2', '3', '4').required()

exports.sosInfo_schema = joi.object({
  area,
  degree,
  username,
  phone,
  detail,
  categories,
})
