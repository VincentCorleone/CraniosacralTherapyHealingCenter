// components/timeSelector/timeSelector.js
const TimeInADay = require('../../utils/time.js')

Component({
  /**
   * Component properties
   */
  properties: {
    minHour: 9,
    maxHour: 21,
    show: false,
  },

  /**
   * Component initial data
   */
  data: {
    filter(type, options) {
      if (type === 'minute') {
        return options.filter((option) => option % 30 === 0);
      }

      return options;
    },
    currentTime: '12:00',
  },

  /**
   * Component methods
   */
  methods: {
    onCancel: function() {
      this.triggerEvent('close',{},{})
    },
    onConfirm: function() {
      this.triggerEvent('confirm',(new TimeInADay(this.data.currentTime)),{})
    },
    onInput: function(e) {
      this.setData({currentTime: e.detail})
    }
  }
})
