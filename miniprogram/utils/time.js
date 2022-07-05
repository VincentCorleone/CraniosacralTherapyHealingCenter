class TimeInADay {
  constructor(value){
    this.hour = parseInt(value.split(":")[0]);
    this.minute = parseInt(value.split(":")[1]);
  }

  valueOf () {
    return this.hour * 60 + this.minute
  }
}

module.exports = TimeInADay;
