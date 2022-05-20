const { _, collection } = require('./index')

exports.remove = async id => {
  let query = {
    _id: id,
  }

  return new Promise(async (resolve, reject) => {
    const res = await collection
      .where(query)
      .remove()
      .catch(err => {
        return reject(err)
      })
    return resolve(res)
  })
}
