const { _, collection } = require('./index')

// 1. 获取数据库引用

exports.main = async (data, context) => {
  return new Promise(async (resolve, reject) => {
    const res = await collection.add(data).catch(e => {
      return reject(e)
    })
    resolve(res)
  })

  //必须包括 create_at字段
}
