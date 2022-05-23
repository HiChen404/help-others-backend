const { _, collection } = require('./index')

exports.audit_controller = async (params, context) => {
  const { id, audit } = params
  let query = {
    _id: id,
  }
  return new Promise((resolve, reject) => {
    const res = collection
      .where(query)
      .update({
        audit_status: audit,
      })
      .catch(err => reject(err))
    resolve(res)
  })
}
