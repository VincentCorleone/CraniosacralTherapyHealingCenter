class TimeInADay {
  constructor(value){
    this.hour = parseInt(value.split(":")[0]);
    this.minute = parseInt(value.split(":")[1]);
  }

  valueOf () {
    return this.hour * 60 + this.minute
  }

  toString() {
    const minuteT = this.minute<10? '0' + this.minute.toString() : this.minute.toString()
    return `${this.hour}:${minuteT}`
  }
}

module.exports = TimeInADay;
