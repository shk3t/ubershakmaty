export default class Square {
  constructor(index, color, board, piece = null) {
    this.index = index
    this.color = color
    this.piece = piece
    this.board = board
    this.possibleMove = false

    if (piece)
      this.piece.square = this
  }
}