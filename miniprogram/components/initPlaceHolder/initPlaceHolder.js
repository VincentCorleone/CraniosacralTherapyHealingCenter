// components/initPlaceHolder/initPlaceHolder.js
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

  },

  /**
   * Component methods
   */
  methods: {
    chooseLocation: function(){
      wx.navigateTo({
        url: '/pages/map/map',
        events: {
          getLocationFromOpeningPage: function(data) {
            console.log(data)
          },
        }
      })
    }
  }
})
