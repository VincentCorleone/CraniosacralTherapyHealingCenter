// components/setUpPeriod/setUpPeriod.js
Component({
  /**
   * Component properties
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * Component initial data
   */
  data: {
    isSettingUpTime: false,
  },

  /**
   * Component methods
   */
  methods: {
    attached: function(){
      console.log(this.properties.show)
      console.log("attached")
    },
    
    onClose: function(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {}
      this.triggerEvent('close', myEventDetail, myEventOption)
    },

    setUpStartTime: function(){
      this.setData({isSettingUpTime: true})
    },

    finishSettingUpStartTime: function(e){
      this.setData({isSettingUpTime: false})
    }

  }
})
