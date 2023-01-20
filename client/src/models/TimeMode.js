export default class TimeMode {
  constructor(timer, increment = 0) {
    this.timer = timer
    this.increment = increment
  }

  toString() {
    return `00:${TimeMode.zeroPad(this.timer, 2)}:00|${this.increment}`
  }

  toPretty() {
    return this.increment
      ? `${this.timer} | ${this.increment}`
      : `${this.timer} мин`
  }

  static zeroPad(num, size) {
    num = num.toString()
    while (num.length < size) num = "0" + num
    return num
  }
}