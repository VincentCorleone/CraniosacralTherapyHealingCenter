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
    period: [undefined,undefined]
  },

  /**
   * Component methods
   */
  methods: {
    attached: function(){
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
      this.setData({isSettingUpTime: false, period: tmpPeriod})
    },

    confirmPeriod: function(){
      var isValid = function(startTime, endTime){
        var startH,startM
        [ startH,startM ] = startTime.split(":")
        var endH,endM
        [ endH,endM] = endTime.split(":")
        if(parseInt(startH) < parseInt(endH)){
          return true;
        }else if (parseInt(startH)==parseInt(endH) && parseInt(startM) < parseInt(endM)){
          return true;
        }else{
          return false;
        }
      }
      if (this.data.period[0]!=undefined && this.data.period[1]!=undefined && isValid(this.data.period[0],this.data.period[1])){
        this.triggerEvent("confirm", this.data.period,{})
      }
    }

  }
})
