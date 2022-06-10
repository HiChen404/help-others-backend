const express = require('express')
const router = express.Router()
const { _, collection2 } = require('../utils/database/index')

//获取趋势数据
router.get('/trend', async (req, res) => {
  console.log(req.ip)
  const rowData = await collection2
    .where({
      now: _.gt(100000),
    })
    .orderBy('now', 'desc')
    .limit(1)
    .get()

  res.send(rowData.data[0])
})

module.exports = router
