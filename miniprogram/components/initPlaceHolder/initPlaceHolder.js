// components/initPlaceHolder/initPlaceHolder.js
const TimeInADay = require('../../utils/time.js')
const computedBehavior = require('miniprogram-computed').behavior


Component({
  behaviors: [computedBehavior],
  /**
   * Component properties
   */
  properties: {
    remoteData: {}
  },

  /**
   * Component initial data
   */
  data: {
    holderOpenId: '',
    name: '',
    address: '',
    location: {txtForHuman: ''},
    newRoom: '',
    rooms:[],
    selectedRoomIndex: -1,
    step: 1,
    currentDate: '12:00',
    isSettingUpPeriod: false,
    earliestTime: undefined,
    latestTime: undefined,
    timeTable: [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
    status: '',
    currentSettingIndex: undefined,
    latestTime: undefined,
    earliestTime: undefined
  },

  observers: {
    'remoteData': function (remoteData) {
      if( Object.keys(remoteData).length>0 ){
        this.loadFromRemote(remoteData)
      }
    }
  },

  computed: {
    ratiosTable(data){
      var toReturn = [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
      ]

      if( false ){

      }else 
      {
        for (let i = 0; i < data.timeTable.length; i++) {
          const element = data.timeTable[i];
          if(element.length > 0){
            var element1D = Array.prototype.concat.apply([], element);

            if(data.earliestTime!=undefined && element1D[0].valueOf() != data.earliestTime.valueOf()){
              element1D.splice(0,0,data.earliestTime)
            }
            if(data.earliestTime!=undefined && element1D[element1D.length-1].valueOf() != data.latestTime.valueOf()){
              element1D.splice(element1D.length,0,data.latestTime)
            }

            // in element1D
            var tmpRow = toReturn[i]
            const timeLength = element1D[element1D.length-1].valueOf() - element1D[0].valueOf()
            for (let j = 0; j < element1D.length-1; j++) {
              const a = element1D[j].valueOf();
              const b = element1D[j+1].valueOf();
              const periodLength = b-a;
              const plainElement = element.map(function (s) {
                const tmpPeriod = [s[0].valueOf(),s[1].valueOf()]
                return tmpPeriod
              })

              const include = function (arr2D,arr1D) {
                for (let q = 0; q < arr2D.length; q++) {
                  const element = arr2D[q];
                  if(element[0]==arr1D[0] && element[1]==arr1D[1]){
                    return true
                  }
                }
                return false
              }
              const substantial = include(plainElement,[a,b])

              const ratio = `${100*periodLength/timeLength}%`
              tmpRow.push({ratio: ratio, substantial: substantial})
            }
          }
        }
      }
      return toReturn
    }
  },
  /**
   * Component methods
   */
  methods: {
    updateEarliestTime: function (time) {
      if( this.data.earliestTime == undefined){
        this.data.earliestTime = time
      }else if (this.data.earliestTime > time){
        this.data.earliestTime = time
      }
    },
    updateLatestTime: function(time){
      if( this.data.latestTime == undefined){
        this.data.latestTime = time
      }else if( this.data.latestTime < time){
        this.data.latestTime = time
      }
    },
    chooseLocation: function(){
      const that = this;
      wx.navigateTo({
        url: '/pages/map/map',
        events: {
          getLocationFromOpeningPage: function(data) {
            that.setData({location: data});
          },
        }
      })
    },
    addRoom: function(){
      let tmpRooms = this.data.rooms;
      tmpRooms.push({name: this.data.newRoom, beds:[]});
      this.setData({rooms: tmpRooms, newRoom: ''});
    },
    addBed: function(){
      let tmpRooms = this.data.rooms
      tmpRooms[this.data.selectedRoomIndex].beds.push(this.data.newBed)
      this.setData({rooms: tmpRooms,newBed:''})
    },
    selectRoom: function(event){
      const tmpIndex = event.currentTarget.dataset.index;
      this.setData({selectedRoomIndex:tmpIndex})
    },
    submit: function (data) {
      const toSubmit = {
        ...data,
        address: this.data.address,
        location: this.data.location,
        rooms: this.data.rooms,
        openingTimePeriods2D: this.data.timeTable,
      }

      wx.cloud.callFunction({
        name: 'applyAsPlaceHolder',
        data: toSubmit,
      })
    },
    save: function(){
      this.submit({action: 'save'})
    },
    apply: function name(params) {
      this.submit({action: 'apply'})
    },
    loadFromRemote: function (result) {
      const that = this
      const timeTable = result.openingTimePeriods2D.map( element => element.map( eleB => eleB.map( eleC => new TimeInADay(`${eleC.hour}:${eleC.minute}`) )))
      timeTable.forEach(element => {
        if(element.length > 0){
          that.updateEarliestTime(element[0].earliestTime)
          that.updateLatestTime(element[element.length-1].latestTime)
        }
      });
      this.setData({
        holderOpenId: result.holderOpenId,
        name: result.name,
        address: result.address,
        location: result.location,
        rooms: result.rooms,
        timeTable: timeTable,
        earliestTime: this.data.earliestTime,
        latestTime: this.data.latestTime
      })
    },
    next: function(){
      this.setData({step: 2})
    },
    setUpOpeningPeriods: function(e){
      this.data.currentSettingIndex = e.currentTarget.dataset.index
      this.setData({isSettingUpPeriod: true})
    },
    onCancelPeriod: function(e){
      this.setData({isSettingUpPeriod: false})
    },

    onConfirmPeriod: function(e){
      const that = this;
      const addAPeriod = function(sortedPeriods,period){
        // 每天不允许超过三个时间段
        if (sortedPeriods.length >=3){
          return
        }
        // 取period第一个元素，在periods中找到一个地方，前小后大
        if(sortedPeriods.length == 0){
          sortedPeriods.push(period)
          that.updateEarliestTime(period[0])
          that.updateLatestTime(period[1])
          return;
        }else{
          for (let i = 0; i <= sortedPeriods.length; i++) {
            var tmpPeriods = [ ...sortedPeriods ]
            tmpPeriods.splice(i,0,period)
            //检查是否符合情况，符合的话直接返回函数
            if( i==0 ){
              if(tmpPeriods[i][1] < tmpPeriods[i+1][0]){
                sortedPeriods.splice(i,0,period)
                that.updateEarliestTime(period[0])
                return;
              }
            }else if(i==sortedPeriods.length){
              if(tmpPeriods[i-1][1] < tmpPeriods[i][0]){
                sortedPeriods.splice(i,0,period)
                that.updateLatestTime(period[1])
                return;
              }
            }else {
              if( tmpPeriods[i][1] < tmpPeriods[i+1][0] && tmpPeriods[i-1][1] < tmpPeriods[i][0]){
                sortedPeriods.splice(i,0,period)
                return;
              }
            }
            //检查是否有必要进行下一轮
            if( tmpPeriods[i][0] > tmpPeriods[i+1][1] ){
              continue
            }else {
              break
            }
          }
        }
      }
      addAPeriod(this.data.timeTable[this.data.currentSettingIndex], [...e.detail])

      this.setData({
        isSettingUpPeriod: false, 
        timeTable: this.data.timeTable,
        earliestTime: this.data.earliestTime,
        latestTime: this.data.latestTime
      })
    }
    
  },
  
})
