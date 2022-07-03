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
    isSettingIndex: -1,
    period: ['','']
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
      
      this.data.isSettingIndex = 0
      this.setUpTime()
    },

    setUpEndTime: function(){
      this.data.isSettingIndex = 1
      this.setUpTime()
    },

    setUpTime: function(){
      this.setData({isSettingUpTime: true})
    },

    cancelSettingUpTime: function(e){
      this.setData({isSettingUpTime: false})
    },

    confirmSettingUpTime: function(e){
      var tmpPeriod = this.data.period
      tmpPeriod[this.data.isSettingIndex] = e.detail
      console.log(tmpPeriod)
      this.setData({isSettingUpTime: false, period: tmpPeriod})
    }

  }
})
