export default class Square {
  constructor(index, color, piece = null) {
    this.index = index
    this.color = color
    this.piece = piece
    this.isSelected = false
    this.available = false
  }
}