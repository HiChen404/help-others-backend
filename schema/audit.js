const joi = require('joi')

const id = joi.string().required()
const audit = joi.string().equal('0', '1').required()

exports.audit_schema = joi.object({
  id,
  audit,
})
