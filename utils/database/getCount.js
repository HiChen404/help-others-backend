const { _, collection } = require('./index')

exports.getCount = async () => {
  return new Promise(async (resolve, reject) => {
    const res = await collection.count().catch(err => {
      resolve(err)
    })
    console.log(res)
    resolve(res)
  })
}
