// components/osStateBarHolder/osStateBarHolder.ts
var appInstance = getApp()
console.log(appInstance) 


Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {
    h: 0,
  },

  lifetimes: {
    attached: async function(){
      const statusBarHeight = (await wx.getSystemInfo()).statusBarHeight;
      this.setData({
        h: appInstance.globalData.statusBarHeight,
      });
      // console.log(wx.getMenuButtonBoundingClientRect());
    },
  },

  /**
   * Component methods
   */
  methods: {

  }
})
