const { _, collection } = require('./index')

exports.read = async (params, context) => {
  const { first, size, page } = params

  return new Promise(async (resolve, reject) => {
    const res = await collection
      .where({
        create_at: _.gt(100000),
      })
      .orderBy('create_at', 'desc')
      .skip(Number(first))
      .limit(Number(size))
      .get()
      .catch(err => {
        return reject(err)
      })
    return resolve(res)
  })
}
