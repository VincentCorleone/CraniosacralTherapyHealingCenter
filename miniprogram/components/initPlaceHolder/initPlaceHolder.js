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
    name: '',
    address: '',
    location: {txtForHuman: ''},
    newRoom: '',
    rooms:[],
    selectedRoomIndex: -1,
    step: 1,
    currentDate: '12:00',
  },

  /**
   * Component methods
   */
  methods: {
    chooseLocation: function(){
      const that = this;
      wx.navigateTo({
        url: '/pages/map/map',
        events: {
          getLocationFromOpeningPage: function(data) {
            console.log(data)
            that.setData({location: data});
          },
        }
      })
    },
    addRoom: function(){
      let tmpRooms = this.data.rooms;
      tmpRooms.push({name: this.data.newRoom, beds:[]});
      this.setData({rooms: tmpRooms, newRoom: ''});
      console.log(this.data)
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
      console.log(toSubmit)
      wx.cloud.callFunction({
        name: 'applyAsPlaceHolder',
        data: toSubmit,
      })
    },
    next: function(){
      this.setData({step: 2})
      console.log(this.data)
    },
    setUpOpeningPeriods: function(){
      this.setData({isSettingUpPeriods: true})
    },
    onSettingUpPeriodsClose: function(){
      this.setData({isSettingUpPeriods: false})
    },
  },
})
