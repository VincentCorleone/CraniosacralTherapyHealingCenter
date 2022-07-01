// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database()
  const promise = db.collection('places').where({
    holderOpenId: wxContext.OPENID
  }).get()
  const place = (await promise).data[0]
  return place;
}