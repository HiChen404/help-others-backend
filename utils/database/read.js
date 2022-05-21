const { _, collection } = require('./index')
const { getCount } = require('./getCount')

exports.read = async (
  params = {
    degree: '0',
    range: '2',
  },
  context,
) => {
  const { first, size, range = '2', degree = '0', categories = '0' } = params
  let query = {
    create_at: _.gt(1053035748710),
  }
  //返回所有程度的
  if (degree !== '0') {
    query = {
      ...query,
      degree: _.eq(degree),
    }
  }
  if (range !== '2') {
    query = {
      ...query,
      audit_status: _.eq(range),
    }
  }
  if (categories !== '0') {
    query = {
      ...query,
      categories: _.eq(categories),
    }
  }
  return new Promise(async (resolve, reject) => {
    const res = await collection
      .where(query)
      .orderBy('create_at', 'desc')
      .skip(Number(first) - 1)
      .limit(Number(size))
      .get()
      .catch(err => {
        return reject(err)
      })
    const { total } = await getCount(query).catch(err => {
      return reject(err)
    })
    return resolve({
      total,
      ...res,
    })
  })
}
