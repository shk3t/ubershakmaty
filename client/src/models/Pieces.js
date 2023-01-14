import Color from "./Color"
import whitePawnImage from "../assets/chessFigures/pawn_white.png"
import blackPawnImage from "../assets/chessFigures/pawn_black.png"
import whiteRookImage from "../assets/chessFigures/rook_white.png"
import blackRookImage from "../assets/chessFigures/rook_black.png"
import whiteKnightImage from "../assets/chessFigures/knight_white.png"
import blackKnightImage from "../assets/chessFigures/knight_black.png"
import whiteBishopImage from "../assets/chessFigures/bishop_white.png"
import blackBishopImage from "../assets/chessFigures/bishop_black.png"
import whiteQueenImage from "../assets/chessFigures/queen_white.png"
import blackQueenImage from "../assets/chessFigures/queen_black.png"
import whiteKingImage from "../assets/chessFigures/king_white.png"
import blackKingImage from "../assets/chessFigures/king_black.png"

export default class Piece {
  constructor(color = null) {
    this.color = color
    this.square = null
    this.selected = false
  }

  static fromSymbol(symbol) {
    const color = symbol === symbol.toUpperCase() ? Color.WHITE : Color.BLACK

    const PieceClass = {
      p: Pawn,
      r: Rook,
      n: Knight,
      b: Bishop,
      q: Queen,
      k: King,
    }[symbol.toLowerCase()]

    return new PieceClass(color)
  }

  select() {
    const board = this.square.board

    if (this.color !== board.turn) {
      return false
    }

    this.selected = true
    board.unselectPiece()
    board.selectedPiece = this
    this.hintPossibleMoves()

    return true
  }

  hintPossibleMoves() {
    console.log("not implemented")
  }

  move(index) {
    const board = this.square.board
    const targetSquare = board.squares[index]

    // TODO replace with another validation
    // this.square.index === index ||
    // (targetSquare.piece &&
    //   targetSquare.piece.color === this.selectedPiece.color)
    // this !== board.selectedPiece

    if (!targetSquare.possibleMove) {
      return false
    }

    targetSquare.piece = this
    this.square.piece = null
    this.square = targetSquare
    board.unselectPiece()
    board.toggleTurn()
    return true
  }
}

export class Pawn extends Piece {
  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whitePawnImage : blackPawnImage
    this.moved = false
  }

  hintPossibleMoves() {
    const board = this.square.board
    const index = this.square.index
    const x = index % 8
    const y = Math.floor(index / 8)

    const direction = this.color === Color.WHITE ? -1 : 1
    let hintIndex
    let targetSquare

    hintIndex = 8 * (y + direction) + x
    targetSquare = board.squares[hintIndex]
    if (!targetSquare.piece) {
      targetSquare.possibleMove = true
      if (!this.moved && !targetSquare.piece) {
        hintIndex = 8 * (y + direction * 2) + x
        targetSquare = board.squares[hintIndex]
        targetSquare.possibleMove = true
      }
    }

    hintIndex = 8 * (y + direction) + x - 1
    targetSquare = board.squares[hintIndex]
    if (targetSquare.piece && this.color !== targetSquare.piece.color) {
      targetSquare.possibleMove = true
    }
    hintIndex = 8 * (y + direction) + x + 1
    targetSquare = board.squares[hintIndex]
    if (targetSquare.piece && this.color !== targetSquare.piece.color) {
      targetSquare.possibleMove = true
    }
  }

  move(index) {
    if (super.move(index)) {
      this.moved = true
      return true
    }
    return false
  }
}

export class Rook extends Piece {
  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whiteRookImage : blackRookImage
  }
}

export class Knight extends Piece {
  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whiteKnightImage : blackKnightImage
  }
}

export class Bishop extends Piece {
  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whiteBishopImage : blackBishopImage
  }
}

export class Queen extends Piece {
  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whiteQueenImage : blackQueenImage
  }
}

export class King extends Piece {
  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whiteKingImage : blackKingImage
  }
}

// Piece.Type = {
//   EMPTY: "EMPTY",
//   PAWN: "PAWN",
//   ROOK: "ROOK",
//   KNIGHT: "KNIGHT",
//   BISHOP: "BISHOP",
//   QUEEN: "QUEEN",
//   KING: "KING",
// }