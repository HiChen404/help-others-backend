const cloudbase = require('@cloudbase/node-sdk')
require('dotenv').config()

const app = cloudbase.init({
  env: process.env.env,
  secretId: process.env.secretId,
  secretKey: process.env.secretKey,
})

const db = app.database()
const _ = db.command
const collection = db.collection('sos_info')
const collection2 = db.collection('fetchData')

module.exports = { _, collection, collection2 }
