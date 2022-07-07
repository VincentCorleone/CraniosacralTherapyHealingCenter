// pages/i/index.js
Component({

  /**
   * Page initial data
   */
  data: {
    show: false,
  },


  methods: {
    showPopup() {
      this.setData({ show: true });
    },

    selectIdentity(event) {
      const identity = event.target.dataset.id;
      const currentUrl = `/${getCurrentPages()[0].route}`
      const urlTo = `/pages/${identity}Home/${identity}Home`
      

      if (currentUrl!=urlTo){
        wx.navigateTo({
          url: urlTo,
        })
      }

      this.setData({show: false})
    },
  },


  onClose() {
    this.setData({ show: false });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

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