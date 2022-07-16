// components/osStateBarHolder/osStateBarHolder.ts
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
        h: statusBarHeight
      });
      // console.log(wx.getMenuButtonBoundingClientRect());
    }
  },

  /**
   * Component methods
   */
  methods: {

  }
})
