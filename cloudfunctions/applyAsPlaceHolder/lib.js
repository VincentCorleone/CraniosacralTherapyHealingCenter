const originPlace  = {
  name: "创业花园",
  rooms: [
      {
        beds: [
          "123"
        ],
        name: "床"
      }
  ]
}

function place2Codes(originPlace){
  placeCode = originPlace.name

  bedCodes = []

  originPlace.rooms.forEach(room => {
      room.beds.forEach(bed => {
          const bedCode = `${placeCode}·${room.name}·${bed}`
          bedCodes.push(bedCode)
      })
  });

  const txtOfQrCodes = [...bedCodes,placeCode]

  return txtOfQrCodes
}

function genZipFromPlace(originPlace){
  var txtOfQrCodes = place2Codes(originPlace)

  if(!fs.existsSync('qrCodes')){
      fs.mkdirSync('qrCodes')
  }
  if(!fs.existsSync('output')){
      fs.mkdirSync('output')
  }

  console.log('before genqrfiles')
  genQrFiles(txtOfQrCodes).then(async ()=>{
      console.log('2.1')
      var zipdir = require('zip-dir');

      await zipdir('qrCodes', { saveTo: 'output/qrCodes.zip' }, function (err, buffer) {
      // `buffer` is the buffer of the zipped file
      // And the buffer was saved to `~/myzip.zip`
      });
      

      console.log('2.2')
      // fs.rmdirSync('qrCodes',{recursive: true})
  })

  console.log('3.1')
}


const QRCode = require('qrcode')
const fs = require('node:fs')
const text2png = require('text2png');
const { text } = require('stream/consumers');

PngImg = require('png-img');

const expand = function(img, ratio){
  const iWidth = img.size().width
  const iHeight = img.size().height
  img = img.setSize(iWidth*(ratio), iHeight*(ratio))

  for (let w = iWidth-1; w >= 0 ; w--) {
      for (let h = iHeight-1; h >= 0; h--) {
          img.fill((w)*ratio,(h)*ratio,ratio,ratio,img.get(w,h))
      }
  }
}

const combine = function(qr,txt){
  const iWidth = qr.size().width
  const iHeight = qr.size().height + txt.size().height

  const qrHeight = qr.size().height

  qr.setSize(iWidth,iHeight)

  const offset = (qr.size().width - txt.size().width)/2
  for (let w = iWidth-1; w >= 0 ; w--) {
      for (let h = iHeight-1; h >=qrHeight; h--) {
          if(w<txt.size().width+offset && w>=offset && txt.get(w-offset,h-qrHeight).a>0){
              qr.set(w,h,txt.get(w-offset,h-qrHeight))
          }else{
              qr.set(w,h,{r:255,g:255,b:255,a:255})
          }
      }
  }
}



async function genQrFiles (txtOfQrCodes) {

  

  for await(const code of txtOfQrCodes) {
      console.log("1.0 "+ code)
      await QRCode.toFile(
          `qrCodes/${code}.png`,
          [{data: code, mode: 'byte'}],
          {version: 3}
      )
      console.log("1.1")
  
  
      fs.writeFileSync(`qrCodes/${code}_orgin.png`, text2png(`${code}`, {
              color: 'black',
              font: '50px Lobster',
          })
      );
      console.log("1.2")
  
      const buf = fs.readFileSync(`qrCodes/${code}.png`)
      // console.log(buf.byteLength)
      console.log("1.3")
  
      const buf_orgin = fs.readFileSync(`qrCodes/${code}_orgin.png`)
  
      var imgQR = new PngImg(buf)
      var imgText = new PngImg(buf_orgin)
      console.log("1.4")
  
      expand(imgQR,8)
  
      combine(imgQR,imgText)
      console.log("1.5")
  
      await imgQR.save(`qrCodes/${code}.png`,function(error) {
          if(error) {
              console.error('Error:', error);
          } else {
              console.log('OK');
          }
      })
      console.log("1.6")
  
      fs.rmSync(`qrCodes/${code}_orgin.png`)
  }
}


genZipFromPlace(originPlace)

module.exports = {genZipFromPlace}