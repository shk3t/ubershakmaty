import {xyToAN} from "../utils"

export default class Square {
  constructor(index, color, board, piece = null) {
    this.index = index
    this.color = color
    this.piece = piece
    this.board = board
    this.possibleMove = false

    if (piece) this.piece.square = this
  }

  isEmpty() {
    return !this.piece
  }

  removePiece() {
    this.piece.square = null
    this.piece = null
  }

  putPiece(piece) {
    piece.square = this
    this.piece = piece
  }

  getXY() {
    const index = this.index
    return {x: index % 8, y: Math.floor(index / 8)}
  }

  select() {
    if (this.isEmpty()) return false
    return this.piece.select()
  }

  getMoveUci(targetSquare) {
    return xyToAN(this.getXY()) + xyToAN(targetSquare.getXY())
  }

  isEnPassant() {
    const board = this.board
    const {x, y} = this.getXY()
    return board.enPassant && x === board.enPassant.x && y === board.enPassant.y
  }
}