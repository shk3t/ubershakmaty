import Color from "./Color"
import Square from "./Square"
import Piece from "./Pieces"

export default class Board {
  static INITIAL = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  selectedSquare = null

  constructor(pieces = null) {
    if (pieces == null) {
      return Board.fromFen(Board.INITIAL)
    }

    let squares = Array(64)

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const color = (i + j) % 2 ? Color.WHITE : Color.BLACK
        squares[8 * i + j] = new Square(8 * i + j, color, pieces[8 * i + j])
      }
    }

    this.squares = squares
    this.turn = Color.WHITE
  }

  selectPiece(index) {
    const targetSquare = this.squares[index]

    if (!targetSquare.piece || targetSquare.piece.color !== this.turn) {
      return false
    }

    if (this.selectedSquare) this.selectedSquare.isSelected = false
    targetSquare.isSelected = true
    this.selectedSquare = targetSquare

    return true
  }

  unselectPiece() {
    if (!this.selectedSquare) return false
    this.selectedSquare.isSelected = false
    this.selectedSquare = null
    return true
  }

  movePiece(index) {
    const targetSquare = this.squares[index]
    // TODO replace with another validation
    if (
      index === this.selectedSquare.index ||
      (targetSquare.piece &&
        targetSquare.piece.color === this.selectedSquare.piece.color)
    ) {
      this.unselectPiece()
      return false
    }

    targetSquare.piece = this.selectedSquare.piece
    this.selectedSquare.piece = null
    this.toggleTurn()
    this.unselectPiece()
    return true
  }

  toggleTurn() {
    this.turn = this.turn === Color.WHITE ? Color.BLACK : Color.WHITE
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