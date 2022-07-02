// components/timeSelector/timeSelector.js
Component({
  /**
   * Component properties
   */
  properties: {
    minHour: 9,
    maxHour: 21
  },

  /**
   * Component initial data
   */
  data: {
    show: false
  },

  /**
   * Component methods
   */
  methods: {
    filter(type, options) {
      if (type === 'minute') {
        return options.filter((option) => option % 30 === 0);
      }

      return options;
    },

    onClose: function() {

    }
  }
})
