const joi = require('joi')

const first = joi.number().integer().required()
const size = joi.number().integer().required()
const range = joi.string().equal('0', '1', '2')
const degree = joi.string().equal('0', '1', '2', '3')
const categories = joi.string().equal('0', '1', '2', '3', '4')
const area = joi.string().equal(
  '0',
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
  //
  '410100',
  '410200',
  '410300',
  '410400',
  '410500',
  '410600',
  '410700',
  '410800',
  '410900',
  '411000',
  '411100',
  '411200',
  '411300',
  '411400',
  '411500',
  '411600',
  '411700',
)

exports.query_schema = joi.object({
  first,
  size,
  range,
  degree,
  categories,
  area,
})
