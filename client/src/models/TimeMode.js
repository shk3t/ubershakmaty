import {zeroPad} from "../utils"

export default class TimeMode {
  constructor(timer, increment = 0) {
    this.timer = timer
    this.increment = increment
  }

  toString() {
    return `00:${zeroPad(this.timer, 2)}:00|${this.increment}`
  }

  toPretty() {
    return this.increment
      ? `${this.timer} | ${this.increment}`
      : `${this.timer} мин`
  }
}