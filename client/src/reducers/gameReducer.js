import {cloneDeep} from "lodash"
import Board from "../models/Board"
import GameService from "../services/GameService"

const INIT_GAME = "INIT_GAME"
const SELECT_PIECE = "SELECT_PIECE"
const UNSELECT_PIECE = "UNSELECT_PIECE"
const MOVE_PIECE = "MOVE_PIECE"
const SET_BOARD = "SET_BOARD"
const MOVE_ROLLBACK = "MOVE_ROLLBACK"

const initialState = {
  gameId: null,
  board: new Board(),
  rollbackBoard: null,
}

export default function gameReducer(state = initialState, action) {
  const {gameId, index, fen} = action.payload || {}
  const targetSquare = index != null && state.board.squares[index]
  switch (action.type) {
    case INIT_GAME:
      return {gameId, board: new Board(fen), rollbackBoard: null}
    case SELECT_PIECE:
      if (targetSquare.select()) return {...state}
      return state
    case UNSELECT_PIECE:
      state.board.unselectPiece()
      return {...state}
    case MOVE_PIECE:
      state.rollbackBoard = cloneDeep(state.board)
      state.board.selectedPiece.move(index) ||
        (!targetSquare.isEmpty() &&
          !targetSquare.piece.selected &&
          targetSquare.select()) ||
        state.board.unselectPiece()
      return {...state}
    case SET_BOARD:
      return {...state, board: new Board(fen), rollbackBoard: null}
    case MOVE_ROLLBACK:
      return {...state, board: state.rollbackBoard, rollbackBoard: null}
    default:
      return state
  }
}

export const initGame = (timeMode, user) => (dispatch) => {
  const {pk, fen} = GameService.initGame(timeMode, user)
  dispatch({type: INIT_GAME, payload: {gameId: pk, fen}})
}

export const selectPiece = (index) => {
  return {type: SELECT_PIECE, payload: {index}}
}

export const unselectPiece = () => {
  return {type: UNSELECT_PIECE}
}

export const movePiece = (index) => async (dispatch, getState) => {
  const {gameId, board} = getState()
  const moveUci = board.selectedPiece.getMoveUci(board.squares[index])

  dispatch({type: MOVE_PIECE, payload: {index}})

  try {
    const responseData = await GameService.makeMove(gameId, moveUci)
    if (responseData === "Illegal move") {
      dispatch({type: MOVE_ROLLBACK})
    }
    dispatch({type: SET_BOARD, payload: {fen: responseData.fen}})
  } catch {
    dispatch({type: MOVE_ROLLBACK})
  }
}