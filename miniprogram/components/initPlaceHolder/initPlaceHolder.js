// components/initPlaceHolder/initPlaceHolder.js
const TimeInADay = require('../../utils/time.js')

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
    latestTIme: undefined,
    timeTable: [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
    currentSettingIndex: undefined,
    latestTime: undefined,
    earliestTime: undefined
  },

  /**
   * Component methods
   */
  methods: {
    attached: function(){

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
    apply: function(){
      const toSubmit = {
        name: this.data.name,
        address: this.data.address,
        location: this.data.location,
        rooms: this.data.rooms
      }
      wx.cloud.callFunction({
        name: 'applyAsPlaceHolder',
        data: toSubmit,
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
          return;
        }else{
          for (let i = 0; i <= sortedPeriods.length; i++) {
            var tmpPeriods = [ ...sortedPeriods ]
            tmpPeriods.splice(i,0,period)
            //检查是否符合情况，符合的话直接返回函数
            if( i==0 ){
              if((new TimeInADay(tmpPeriods[i][1])) < (new TimeInADay(tmpPeriods[i+1][0]))){
                sortedPeriods.splice(i,0,period)
                return;
              }
            }else if(i==sortedPeriods.length){
              if((new TimeInADay(tmpPeriods[i-1][1])) < (new TimeInADay(tmpPeriods[i][0]))){
                sortedPeriods.splice(i,0,period)
                return;
              }
            }else {
              if( (new TimeInADay(tmpPeriods[i][1])) < (new TimeInADay(tmpPeriods[i+1][0])) && (new TimeInADay(tmpPeriods[i-1][1])) < (new TimeInADay(TimeInADay(tmpPeriods[i][0])))){
                sortedPeriods.splice(i,0,period)
                return;
              }
            }
            //检查是否有必要进行下一轮
            if( (new TimeInADay(tmpPeriods[i][0])) > (new TimeInADay(tmpPeriods[i+1][1])) ){
              continue
            }else {
              break
            }
          }
        }
      }
      addAPeriod(this.data.timeTable[this.data.currentSettingIndex], [...e.detail])
      console.log(this.data.timeTable)
      this.setData({isSettingUpPeriod: false})
    }
    
  },
})
