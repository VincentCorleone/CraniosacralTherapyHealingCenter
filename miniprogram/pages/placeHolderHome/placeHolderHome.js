// pages/placeHolderHome/placeHolderHome.js
Page({

  /**
   * Page initial data
   */
  data: {
    active: 'healers',
    originPlace: {},
  },
  
  onChange(event) {
    this.setData({ active: event.detail });
  },

  /**
   * Lifecycle function--Called when page load
   */
  async onLoad(options) {
    const res = await wx.cloud.callFunction({
      name: 'getPlaceAsPlaceHolder',
    })
    // this.data.originPlace = res.result
    this.setData({
      originPlace: res.result
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})