// pages/healerDetail/healerDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    locationObject: [{}]
  },

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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Object.keys(this.data.timeObject).forEach((value, index) => {
      this.data.multiArray[0].push(this.data.timeObject[index].dayValue);
      console.log(this.data.timeObject[index].dayValue);
    });
    console.log(this.data.multiArray[0]);
    // this.data.multiArray[0] = collection;
    this.data.multiArray[1] = this.data.timeObject[0].timeSpans;

    this.setData(this.data);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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