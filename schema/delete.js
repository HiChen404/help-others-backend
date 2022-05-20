const joi = require('joi')

const id = joi.string().required()

exports.delete_schema = joi.object({
  id,
})
