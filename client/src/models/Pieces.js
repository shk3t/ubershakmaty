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

  static fromAN(symbol) {
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
      for (const {dx = 0, dy = 0, rule = null} of sequence) {
        const targetSquare = board.getSquare(x + dx, y + dy)
        if (
          targetSquare &&
          isNotAlly(targetSquare) &&
          (!rule || rule(targetSquare))
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
      return null
    }

    const moveUci = this.square.getMoveUci(targetSquare)

    this.square.removePiece()
    targetSquare.putPiece(this)

    board.unselectPiece()
    board.endTurn()
    if (!targetSquare.isEmpty() && targetSquare.piece.color !== this.color) {
      board.halfmoveClock = -1
    }

    return moveUci
  }

  isWhite() {
    return this.color === Color.WHITE
  }

  getMoveLabel(prevIndex) {
    const {x: fromX, y: fromY} = this.square.board.squares[prevIndex].getXY()
    const {x, y} = this.square.getXY()
    const {dx, dy} = {dx: x - fromX || null, dy: y - fromY || null}
    const move = this.moveSequences.flat().find((move) => {
      return move.dx == dx && move.dy == dy // eslint-disable-line eqeqeq
    })
    return move && move.label
  }
}

export class Pawn extends Piece {
  MoveRules = {
    ...this.MoveRules,
    isFirstTurn: () => {
      const y = this.square.getXY().y
      return (y === 6 && this.isWhite()) || (y === 1 && !this.isWhite())
    },
    isEnPassant: (targetSquare) => targetSquare.isEnPassant(),
  }

  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whitePawnImage : blackPawnImage

    const dyForward = this.isWhite() ? -1 : 1
    const {isEmpty, isEnemy, isFirstTurn, isEnPassant} = this.MoveRules
    this.moveSequences = [
      [
        {dy: dyForward, rule: isEmpty},
        {
          dy: 2 * dyForward,
          rule: (square) => isFirstTurn() && isEmpty(square),
          label: "double",
        },
      ],
      [
        {
          dx: -1,
          dy: dyForward,
          rule: (square) => isEnemy(square) || isEnPassant(square),
        },
      ],
      [
        {
          dx: 1,
          dy: dyForward,
          rule: (square) => isEnemy(square) || isEnPassant(square),
        },
      ],
    ]
  }

  move(index) {
    const board = this.square.board
    const prevIndex = this.square.index
    const prevY = this.square.getXY().y
    const isEnPassant = board.squares[index].isEnPassant()

    let moveUci = super.move(index)
    if (moveUci) {
      const {x, y} = this.square.getXY()

      if (this.getMoveLabel(prevIndex) === "double") {
        board.enPassant = {x, y: (y + prevY) / 2}
      }

      if (isEnPassant) {
        board.getSquare(x, prevY).removePiece()
      }

      moveUci += this.tryUpgrade()
      board.halfmoveClock = 0
    }
    return moveUci
  }

  tryUpgrade() {
    // TODO сделать меню выбора фигуры
    const upgradeY = this.isWhite() ? 0 : 7
    if (this.square.getXY().y === upgradeY) {
      this.square.putPiece(new Queen(this.color))
      return this.isWhite() ? "Q" : "q"
    }
    return ""
  }

  toAN() {
    return this.isWhite() ? "P" : "p"
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

    let moveUci = super.move(index)
    if (moveUci) {
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
    }
    return moveUci
  }

  toAN() {
    return this.isWhite() ? "R" : "r"
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

  toAN() {
    return this.isWhite() ? "N" : "n"
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

  toAN() {
    return this.isWhite() ? "B" : "b"
  }
}

export class Queen extends Piece {
  static moveSequences = [...Rook.moveSequences, ...Bishop.moveSequences]

  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whiteQueenImage : blackQueenImage
    this.moveSequences = Queen.moveSequences
  }

  toAN() {
    return this.isWhite() ? "Q" : "q"
  }
}

export class King extends Piece {
  MoveRules = {
    ...this.MoveRules,
    canLongCastle: () => {
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
    canShortCastle: () => {
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
      [{dx: -2, rule: canLongCastle, label: "longCastle"}],
      [{dx: 2, rule: canShortCastle, label: "shortCastle"}],
    ]
  }

  move(index) {
    const prevIndex = this.square.index

    let moveUci = super.move(index)
    if (moveUci) {
      const board = this.square.board

      const moveLabel = this.getMoveLabel(prevIndex)
      this.tryCastle(moveLabel)

      if (this.isWhite()) {
        board.whiteCanLongCastle = false
        board.whiteCanShortCastle = false
      } else {
        board.blackCanLongCastle = false
        board.blackCanShortCastle = false
      }
    }
    return moveUci
  }

  tryCastle(moveLabel) {
    const board = this.square.board
    const {x, y} = this.square.getXY()
    let rook, rookTargetSquare

    if (moveLabel === "longCastle") {
      rook = board.getSquare(x - 2, y).piece
      rookTargetSquare = board.getSquare(x + 1, y)
    } else if (moveLabel === "shortCastle") {
      rook = board.getSquare(x + 1, y).piece
      rookTargetSquare = board.getSquare(x - 1, y)
    } else return

    rook.square.removePiece()
    rookTargetSquare.putPiece(rook)
  }

  toAN() {
    return this.isWhite() ? "K" : "k"
  }
}