// 云函数代码
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  const ip = cloud.getWXContext().CLIENTIP;
  const params = {
    "body" : "有朋天下头荐骨疗愈中信 - 预约疗愈师",
    // 商品描述	body	是	String(128)	腾讯充值中心 -QQ 会员充值÷？
    "outTradeNo" : Date.now().toString(),
    // 商户订单号
    "spbillCreateIp" : ip,
    // 发起支付的终端的ip
    "subMchId" : "1626924865",
    // 子商户号
    "totalFee" : 600,
    // 总金额
    "envId": "super-longevity-0vzqk",
    // 回调函数所在云环境的id
    "functionName": "pay_cb"
    // 回调函数的名称
  }
  const res = await cloud.cloudPay.unifiedOrder(params)
  return res
}