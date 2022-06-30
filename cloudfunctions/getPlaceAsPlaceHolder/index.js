// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database()
  var place = {}
  const promise = db.collection('places').where({
    holderOpenId: wxContext.OPENID
  }).get()
  console.log(place)
  return (await promise).then(res => {return res})
}