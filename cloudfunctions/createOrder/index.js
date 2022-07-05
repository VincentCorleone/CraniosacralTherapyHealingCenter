// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


exports.main = async (event, context) => {
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()
  let { userInfo, healerUnionId, dataTime, place} = event

}
