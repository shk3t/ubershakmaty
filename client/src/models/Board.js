import Color from "./Color"
import Square from "./Square"
import Piece from "./Pieces"

export default class Board {
  static INITIAL = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  selectedPiece = null

  constructor(pieces = null) {
    if (pieces == null) {
      return Board.fromFen(Board.INITIAL)
    }

    let squares = Array(64)

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const color = (i + j) % 2 ? Color.WHITE : Color.BLACK
        squares[8 * i + j] = new Square(
          8 * i + j,
          color,
          this,
          pieces[8 * i + j]
        )
      }
    }

    this.squares = squares
    this.turn = Color.WHITE
  }

  getSquare(x, y) {
    if (x < 0 || x > 7 || y < 0 || y > 7) return null
    return this.squares[8 * y + x]
  }

  unselectPiece() {
    if (!this.selectedPiece) return false
    this.selectedPiece.selected = false
    this.selectedPiece = null
    this.removeHints()
    return true
  }

  toggleTurn() {
    this.turn = this.turn === Color.WHITE ? Color.BLACK : Color.WHITE
  }

  removeHints() {
    for (const square of this.squares) {
      square.possibleMove = false
    }
  }

  toFen() {
    return "abc"
  }

  static fromFen(fen) {
    const pieces = Array(64)
    const rep = fen.split(" ")[0].replaceAll("/", "")

    for (let i = 0, j = 0; i < pieces.length; i++, j++) {
      if (Boolean(Number(rep[j]))) {
        i += Number(rep[j]) - 1
      } else {
        pieces[i] = Piece.fromSymbol(rep[j])
      }
    }

    return new Board(pieces)
  }
}