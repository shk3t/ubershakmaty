import {BLACK, EMPTY_PIECE, INITIAL_PIECES, WHITE} from "../consts/game"
import {nextTurn, setCharAt, turnIsCorrect} from "../utils"

const SELECT_PIECE = "SELECT_PIECE"
const MOVE_PIECE = "MOVE_PIECE"
const UNSELECT = "UNSELECT"

const initialState = {
  turn: WHITE,
  selected: {},
  pieces: INITIAL_PIECES,
}

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_PIECE:
      const {on} = action.payload
      if (!turnIsCorrect(state.turn, state.pieces[on])) return state
      state.selected = {index: on, piece: state.pieces[on]}
      return {...state}
    case MOVE_PIECE:
      const {to} = action.payload
      if (state.selected.index === to) return state
      state.pieces = setCharAt(state.pieces, state.selected.piece, to)
      state.pieces = setCharAt(state.pieces, EMPTY_PIECE, state.selected.index)
      state.turn = nextTurn(state.turn)
    case UNSELECT:
      state.selected = {}
      return {...state}
    default:
      return state
  }
}

export const selectPiece = (on) => {
  return {type: SELECT_PIECE, payload: {on}}
}

export const movePiece = (to) => {
  return {type: MOVE_PIECE, payload: {to}}
}

export const unselect = () => {
  return {type: UNSELECT}
}