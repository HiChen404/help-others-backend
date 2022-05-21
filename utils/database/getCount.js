const { _, collection } = require('./index')

exports.getCount = async query => {
  return new Promise(async (resolve, reject) => {
    const res = await collection
      .where(query)
      .count()
      .catch(err => {
        resolve(err)
      })
    resolve(res)
  })
}
