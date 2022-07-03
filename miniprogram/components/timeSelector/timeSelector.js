// components/timeSelector/timeSelector.js
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
  },

  /**
   * Component methods
   */
  methods: {
    onClose: function() {
      this.triggerEvent('close',{},{})
    }
  }
})
