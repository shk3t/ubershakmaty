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
  static MoveRange = Array(7)
    .fill()
    .map((_, i) => i + 1)

  MoveRules = {
    isEmpty: (targetSquare) => targetSquare.isEmpty(),
    isNotAlly: (targetSquare) =>
      targetSquare.isEmpty() || this.color !== targetSquare.piece.color,
    isEnemy: (targetSquare) => {
      return !targetSquare.isEmpty() && this.color !== targetSquare.piece.color
    },
  }

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

    if (this.color !== board.turn) return false

    board.unselectPiece()
    board.selectedPiece = this

    this.selected = true
    this.hintPossibleMoves()

    return true
  }

  hintPossibleMoves() {
    const {x, y} = this.square.getXY()
    const board = this.square.board
    const {isNotAlly, isEnemy} = this.MoveRules

    for (const sequence of this.moveSequences) {
      for (const {dx = 0, dy = 0, rules = []} of sequence) {
        const targetSquare = board.getSquare(x + dx, y + dy)
        if (
          targetSquare &&
          isNotAlly(targetSquare) &&
          rules.every((rule) => rule(targetSquare))
        ) {
          targetSquare.possibleMove = true
          if (isEnemy(targetSquare)) break
        } else break
      }
    }
  }

  move(index) {
    const board = this.square.board
    const targetSquare = board.squares[index]

    if (!targetSquare.possibleMove) {
      return false
    }

    this.square.removePiece()
    targetSquare.putPiece(this)

    board.unselectPiece()
    board.toggleTurn()

    return true
  }

  isWhite() {
    return this.color === Color.WHITE
  }
}

export class Pawn extends Piece {
  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whitePawnImage : blackPawnImage
    this.moved = false

    const dyForward = this.isWhite() ? -1 : 1
    const {isEmpty, isEnemy} = this.MoveRules
    this.moveSequences = [
      [
        {dy: dyForward, rules: [isEmpty]},
        {dy: 2 * dyForward, rules: [() => !this.moved, isEmpty]},
      ],
      [{dx: -1, dy: dyForward, rules: [isEnemy]}],
      [{dx: 1, dy: dyForward, rules: [isEnemy]}],
    ]
  }

  move(index) {
    if (super.move(index)) {
      this.moved = true
      this.upgrade()
      return true
    }
    return false
  }

  upgrade() {
    // TODO сделать меню выбора фигуры
    const upgradeY = this.isWhite() ? 0 : 7
    if (this.square.getXY().y === upgradeY) {
      this.square.putPiece(new Queen(this.color))
    }
  }
}

export class Rook extends Piece {
  static moveSequences = [
    Piece.MoveRange.map((i) => ({dx: -i})),
    Piece.MoveRange.map((i) => ({dx: i})),
    Piece.MoveRange.map((i) => ({dy: -i})),
    Piece.MoveRange.map((i) => ({dy: i})),
  ]

  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whiteRookImage : blackRookImage
    this.moveSequences = Rook.moveSequences
  }

  move(index) {
    const prevIndex = this.square.index
    if (super.move(index)) {
      const board = this.square.board

      if (this.isWhite()) {
        if (prevIndex === 56 || index === 56) {
          board.whiteCanLongCastle = false
        } else if (prevIndex === 63 || index === 63) {
          board.whiteCanShortCastle = false
        }
      } else {
        if (prevIndex === 0 || index === 0) {
          board.blackCanLongCastle = false
        } else if (prevIndex === 7 || index === 7) {
          board.blackCanShortCastle = false
        }
      }

      return true
    }
    return false
  }
}

export class Knight extends Piece {
  static moveSequences = [
    [{dx: -2, dy: -1}],
    [{dx: -2, dy: 1}],
    [{dx: -1, dy: -2}],
    [{dx: -1, dy: 2}],
    [{dx: 1, dy: -2}],
    [{dx: 1, dy: 2}],
    [{dx: 2, dy: -1}],
    [{dx: 2, dy: 1}],
  ]

  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whiteKnightImage : blackKnightImage
    this.moveSequences = Knight.moveSequences
  }
}

export class Bishop extends Piece {
  static moveSequences = [
    Piece.MoveRange.map((i) => ({dx: -i, dy: -i})),
    Piece.MoveRange.map((i) => ({dx: i, dy: -i})),
    Piece.MoveRange.map((i) => ({dx: -i, dy: i})),
    Piece.MoveRange.map((i) => ({dx: i, dy: i})),
  ]

  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whiteBishopImage : blackBishopImage
    this.moveSequences = Bishop.moveSequences
  }
}

export class Queen extends Piece {
  static moveSequences = [...Rook.moveSequences, ...Bishop.moveSequences]

  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whiteQueenImage : blackQueenImage
    this.moveSequences = Queen.moveSequences
  }
}

export class King extends Piece {
  MoveRules = {
    ...this.MoveRules,
    canLongCastle: (targetSquare) => {
      const board = this.square.board
      const {x, y} = this.square.getXY()

      if (
        ((this.isWhite() && board.whiteCanLongCastle) ||
          (!this.isWhite() && board.blackCanLongCastle)) &&
        x >= 4 &&
        board.getSquare(x - 1, y).isEmpty() &&
        board.getSquare(x - 2, y).isEmpty() &&
        board.getSquare(x - 3, y).isEmpty() &&
        board.getSquare(x - 4, y).piece instanceof Rook &&
        board.getSquare(x - 4, y).piece.color === this.color
      ) {
        return true
      }

      return false
    },
    canShortCastle: (targetSquare) => {
      const board = this.square.board
      const {x, y} = this.square.getXY()

      if (
        ((this.isWhite() && board.whiteCanShortCastle) ||
          (!this.isWhite() && board.blackCanShortCastle)) &&
        x <= 4 &&
        board.getSquare(x + 1, y).isEmpty() &&
        board.getSquare(x + 2, y).isEmpty() &&
        board.getSquare(x + 3, y).piece instanceof Rook &&
        board.getSquare(x + 3, y).piece.color === this.color
      ) {
        return true
      }

      return false
    },
  }

  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whiteKingImage : blackKingImage
    this.check = false

    const {canLongCastle, canShortCastle} = this.MoveRules
    this.moveSequences = [
      [{dx: -1, dy: -1}],
      [{dx: -1, dy: 0}],
      [{dx: -1, dy: 1}],
      [{dx: 0, dy: 1}],
      [{dx: 1, dy: 1}],
      [{dx: 1, dy: 0}],
      [{dx: 1, dy: -1}],
      [{dx: 0, dy: -1}],
      [{dx: -2, rules: [canLongCastle]}],
      [{dx: 2, rules: [canShortCastle]}],
    ]
  }

  move(index) {
    const prevX = this.square.getXY().x
    if (super.move(index)) {
      const board = this.square.board

      const deltaX = this.square.getXY().x - prevX

      if (this.isWhite()) {
        board.whiteCanLongCastle = false
        board.whiteCanShortCastle = false
      } else {
        board.blackCanLongCastle = false
        board.blackCanShortCastle = false
      }

      return true
    }
    return false
  }

  castle(deltaX) {
    const board = this.square.board
    const {x, y} = this.square.getXY()

    if (deltaX === -2) {
      var rook = board.getSquare(x - 2, y).piece
      var rookTargetSquare = board.getSquare(x + 1, y)
    } else if (deltaX === 2) {
      var rook = board.getSquare(x + 1, y).piece
      var rookTargetSquare = board.getSquare(x - 1, y)
    } else return

    rook.square.removePiece()
    rookTargetSquare.putPiece(rook)
  }
}