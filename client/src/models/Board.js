import Color from "./Color"
import Square from "./Square"
import Piece from "./Pieces"

export default class Board {
  static xyToAN({x, y}) {
    return String.fromCharCode(97 + x) + (8 - y).toString()
  }

  static anToXY(an) {
    if (an === "-") return null
    return {x: an.charCodeAt(0) - 97, y: Number(8 - an[1])}
  }

  static DEFAULT_FEN =
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

  constructor(fen = Board.DEFAULT_FEN) {
    const pieces = Array(64)
    const [pieceData, turn, castling, enPassant, halfmoveClock, moveNumber] =
      fen.replaceAll("/", "").split(" ")

    for (let i = 0, j = 0; i < pieces.length; i++, j++) {
      if (Boolean(Number(pieceData[j]))) {
        i += Number(pieceData[j]) - 1
      } else {
        pieces[i] = Piece.fromAN(pieceData[j])
      }
    }

    this.squares = Array(64)
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const color = (y + x) % 2 ? Color.WHITE : Color.BLACK
        this.squares[8 * y + x] = new Square(
          8 * y + x,
          color,
          this,
          pieces[8 * y + x]
        )
      }
    }

    this.turn = turn === "w" ? Color.WHITE : Color.BLACK
    this.whiteCanLongCastle = castling.includes("Q")
    this.whiteCanShortCastle = castling.includes("K")
    this.blackCanLongCastle = castling.includes("q")
    this.blackCanShortCastle = castling.includes("k")
    this.enPassant = Board.anToXY(enPassant)
    this.halfmoveClock = Number(halfmoveClock)
    this.moveNumber = Number(moveNumber)
    this.selectedPiece = null
  }

  getSquare(x, y) {
    if (x < 0 || x > 7 || y < 0 || y > 7) {
      return null
    }
    return this.squares[8 * y + x]
  }

  unselectPiece() {
    if (!this.selectedPiece) return false
    this.selectedPiece.selected = false
    this.selectedPiece = null
    this.removeHints()
    return true
  }

  endTurn() {
    this.turn = this.turn === Color.WHITE ? Color.BLACK : Color.WHITE
    this.moveNumber++
    this.halfmoveClock++
    this.enPassant = null
  }

  removeHints() {
    for (const square of this.squares) {
      square.possibleMove = false
    }
  }

  removeHints() {
    for (const square of this.squares) {
      square.possibleMove = false
    }
  }

  restartHalfmoveClock() {
    this.halfmoveClock = -1
  }

  removeHints() {
    for (const square of this.squares) {
      square.possibleMove = false
    }
  }

  toFen() {
    const pieceData = []
    let emptyCounter = 0
    for (const square of this.squares) {
      if (square.index % 8 === 0) {
        if (emptyCounter) {
          pieceData.push(emptyCounter.toString())
          emptyCounter = 0
        }
        pieceData.push("/")
      }
      if (square.isEmpty()) {
        emptyCounter++
      } else {
        if (emptyCounter) {
          pieceData.push(emptyCounter.toString())
          emptyCounter = 0
        }
        pieceData.push(square.piece.toAN())
      }
    }

    return `${pieceData.join("").substring(1)} ${
      this.turn === Color.WHITE ? "w" : "b"
    } ${this.enPassant ? Board.xyToAN(this.enPassant) : "-"} ${
      this.halfmoveClock
    } ${this.moveNumber}`
  }
}