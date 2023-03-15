// pages/healerDetail/healerDetail.js
const APP = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    h: 0,
    multiIndex: [0, 0],
    multiArray: [[], []],
    timeObject: [
      { 
        dayValue: "今天", 
        timeSpans: 
          ['9:00-9:50', 
          '10:00-10:50', 
          '14:00-14:50']
      },
      { 
        dayValue: "明天", 
        timeSpans: 
          ['21:00-21:50', 
          '10:00-10:50', 
          '14:00-14:50']
      },
    ],

    // 地点选择器 - 数据 >>
    
    locationObject: [
      {
        locationValue: "港铁天颂 - 有朋天下头荐骨疗愈中心",
        bedsLocationNo:
          [ 
            "大厅",
            "小厅",
            "日式和风",
            "身临其境"
          ]
      },
      {
        locationValue: "星河丹堤 - 宥梵深圳头荐骨疗愈中心",
        bedsLocationNo:
        [
          "大厅",
          "和风细雨",
          "一览无余"
        ]
      }
    ],
    multiIndexLocation: [0, 0],
    multiArrayLocation: [[], []],
    // 地点选择器 - 数据 <<
  },

  back: function (e) {
    wx.navigateBack()
  },
    // 地点选择器 - 函数 >>
  bindMultiPickerColumnChangeLocation: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    switch (e.detail.column) {
      case 0:
        this.data.multiArrayLocation[1] = this.data.locationObject[e.detail.value].bedsLocationNo;
        this.data.multiIndexLocation[0] = e.detail.value;
        this.data.multiIndexLocation[1] = 0;
        break;
      case 1:
        this.data.multiIndexLocation[1] = e.detail.value;
        break;
    }

    this.setData(this.data);
  },

  // 地点选择器 - 函数 <<

   // 时间选择器 - 函数 >>
   bindMultiPickerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    switch (e.detail.column) {
      case 0:
        this.data.multiArray[1] = this.data.timeObject[e.detail.value].timeSpans;
        this.data.multiIndex[0] = e.detail.value;
        this.data.multiIndex[1] = 0;
        break;
      case 1:
        this.data.multiIndex[1] = e.detail.value;
        break;
    }

    this.setData(this.data);
  },

  // 时间选择器 - 函数 <<

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 时间选择器 - 页面启动加载 >>
    Object.keys(this.data.timeObject).forEach((value, index) => {
      this.data.multiArray[0].push(this.data.timeObject[index].dayValue);
      console.log(this.data.timeObject[index].dayValue);
    });
    console.log(this.data.multiArray[0]);
    this.data.multiArray[1] = this.data.timeObject[0].timeSpans;
    // 时间选择器 - 页面启动加载 <<

    // 地点选择器 - 页面启动加载 >>
    Object.keys(this.data.locationObject).forEach((value, index) => {
      this.data.multiArrayLocation[0].push(this.data.locationObject[index].locationValue);
      console.log(this.data.locationObject[index].locationValue);
    });
    console.log(this.data.multiArrayLocation[0]);
    this.data.multiArrayLocation[1] = this.data.locationObject[0].bedsLocationNo;
    // 地点选择器 - 页面启动加载 <<

    this.setData(this.data);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onAcceptButtonTapped: function () {

    wx.cloud.callFunction({
      name: 'createOrder',
      data: {
        // ...
      },
      success: res => {
        const payment = res.result.payment
        wx.requestPayment({
          ...payment,
          success (res) {
            console.log('pay success', res)
          },
          fail (err) {
            console.error('pay fail', err)
          }
        })
      },
      fail: console.error,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      h: APP.globalData.navHeight,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})