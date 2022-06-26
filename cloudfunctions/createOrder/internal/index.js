const cloud = require('wx-server-sdk');

cloud.init({env: cloud.DYNAMIC_CURRENT_ENV});

const db = cloud.database();

// 关于时间的设置，将一天划分为48个时间块，输入起始时间块和结束时间块来描述时间段，且最后五分之一的时间被 用作疗愈师休息和场馆整理的时间，如 0，0 表示  0:00~0:24
//   3,4 表示1:30~2:18
// dateTime 格式 { "date": "20220627", "timeNoStart": 18, "timeNoEnd": 20}
// place 格式 { "placeId": 2, "roomId": 1,  "bedId":  1 }
exports.createOrderInternally = (clientUnionId, healerUnionId, place , dateTime ) =>  {        
  const db = wx.cloud.database();
  db.collection('orders').add({
    orderNo: clientUnionId + dateTime.date + healerId,
    // clientId(注意可能重复) + 开始时间 + 地点 + healerId（注意可能重复） + 2位数字（如果重复，自增）
    clientUnionId: clientUnionId,
    healerUnionId: healerUnionId,
    dateTime: dateTime,
    place: place,
    consumed: false,
    actualStartTime: null,
    actualEndTime: null,
  })
}