import {cloneDeep} from "lodash"
import Board from "../models/Board"
import GameService from "../services/GameService"

const INIT_GAME = "INIT_GAME"
const SELECT_PIECE = "SELECT_PIECE"
const UNSELECT_PIECE = "UNSELECT_PIECE"
const MOVE_PIECE = "MOVE_PIECE"
const SET_BOARD = "SET_BOARD"

const initialState = {
  gameId: null,
  board: new Board(),
}

export default function gameReducer(state = initialState, action) {
  const {gameId, index, board} = action.payload || {}
  const targetSquare = index != null && state.board.squares[index]
  switch (action.type) {
    case INIT_GAME:
      return {gameId, board}
    case SELECT_PIECE:
      if (targetSquare.select()) return {...state}
      return state
    case UNSELECT_PIECE:
      state.board.unselectPiece()
      return {...state}
    case MOVE_PIECE:
      state.board.selectedPiece.move(index)
      return {...state}
    case SET_BOARD:
      return {...state, board}
    default:
      return state
  }
}

export const initGame = (timeMode, user) => async (dispatch) => {
  const {pk, fen} = await GameService.initGame(timeMode, user)
  dispatch({type: INIT_GAME, payload: {gameId: pk, board: new Board(fen)}})
}

export const selectPiece = (index) => {
  return {type: SELECT_PIECE, payload: {index}}
}

export const unselectPiece = () => {
  return {type: UNSELECT_PIECE}
}

export const movePiece = (index) => async (dispatch, getState) => {
  const {gameId, board} = cloneDeep(getState().gameReducer)
  const rollbackBoard = cloneDeep(board)

  const moveUci = board.selectedPiece.move(index)

  if (!moveUci) {
    const targetSquare = board.squares[index]
    ;(!targetSquare.isEmpty() &&
      !targetSquare.piece.selected &&
      dispatch({type: SELECT_PIECE, payload: {index}})) ||
      dispatch({type: UNSELECT_PIECE})
    return
  }

  dispatch({type: SET_BOARD, payload: {board}})

  try {
    const responseData = await GameService.makeMove(gameId, moveUci)
    if (responseData === "Illegal move") throw new Error()
    dispatch({type: SET_BOARD, payload: {board: new Board(responseData.board_fen)}})
  } catch {
    dispatch({type: SET_BOARD, payload: {board: rollbackBoard}})
  }
}