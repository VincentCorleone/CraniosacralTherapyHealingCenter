// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


function validate(data) {
  const b1 = data.name!=undefined && data.name.length>0;
  if(!b1){return false;}

  const b2 = data.address!=undefined && data.address.length>0;
  if(!b2){return false;}

  const b3 = data.location!=undefined && data.location.txtForHuman!=undefined && data.location.txtForHuman.length>0 && data.location.latitude!=undefined && data.location.longitude!=undefined;
  if(!b3){return false;}

  var b4 = data.rooms!=undefined && data.rooms.length>0
  if(b4){
    for (let index = 0; index < data.rooms.length; index++) {
      const element = data.rooms[index];
      const tb4 = element.name!=undefined && element.beds!=undefined && element.beds.length>0
      b4 = b4 && tb4;
      if(!b4){
        break;
      }
    }
  }
  if(!b4){return false;}

  var b5 = data.openingTimePeriods2D!=undefined && data.openingTimePeriods2D.length>0
  if(b5){
    data.openingTimePeriods2D.forEach(day => {
      day.forEach(timePeriod => {
        const tb5 = timePeriod.length==2 && timePeriod[0].hour != undefined && timePeriod[0].minute != undefined && timePeriod[1].hour != undefined && timePeriod[1].minute != undefined 
        b5 = b5&&tb5
      });
    });
  }
  if(!b5){return false;}

  return true;
}

const entry = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database()
  const toInsert = {
    name: event.name,
    address: event.address,
    location: event.location,
    rooms: event.rooms,
    openingTimePeriods2D: event.openingTimePeriods2D,
  }

  if( event.action=="save"){
    if(event._id == null){
      db.collection('places').add({
        data: {
          ...toInsert,
          holderOpenId: wxContext.OPENID,
          status: 'saved'
        }
      }).then(res => {console.log(res)})
    }else{
      db.collection('places').doc(event._id).update({
        data: {
          ...toInsert,
          status: 'saved'
        }
      }).then(res => {console.log(res)})
    }


  }else if( event.action=="apply"){
    if(validate(toInsert)){
      if(event._id == null){
        db.collection('places').add({
          data: {
            ...toInsert,
            holderOpenId: wxContext.OPENID,
            status: 'saved'
          }
        }).then(res => {console.log(res)})
      }else {
        db.collection('places').doc(event._id).update({
          data: {
            ...toInsert,
            status: 'submitted'
          }
        }).then(res => {console.log(res)})
      }
    }
  }


  return {
    msg: "applyAspplaceHolder:ok"
  }
}

// 云函数入口函数
exports.main = entry