import {cloneDeep} from "lodash"
import Board from "../models/Board"
import TimeMode from "../models/TimeMode"
import GameService from "../services/GameService"
import {hmsToSeconds} from "../utils"

const INIT_GAME = "INIT_GAME"
const SELECT_PIECE = "SELECT_PIECE"
const UNSELECT_PIECE = "UNSELECT_PIECE"
const MOVE_PIECE = "MOVE_PIECE"
const SET_GAME_DATA = "SET_GAME_DATA"

const initialState = {
  timeMode: new TimeMode(3, 2),
  gameId: null,
  board: new Board(),
  whiteTimer: null,
  blackTimer: null,
  endMessage: null,
}

export default function gameReducer(state = initialState, action) {
  const {gameId, board, timeMode, whiteTimer, blackTimer, endMessage, index} =
    action.payload || {}
  switch (action.type) {
    case INIT_GAME:
      return {...state, gameId, board, whiteTimer, blackTimer, endMessage: null}
    case SELECT_PIECE:
      if (state.endMessage) return state
      state.board.squares[index].select()
      return {...state}
    case UNSELECT_PIECE:
      state.board.unselectPiece()
      return {...state}
    case MOVE_PIECE:
      state.board.selectedPiece.move(index)
      return {...state}
    case SET_GAME_DATA:
      if (timeMode) state["timeMode"] = timeMode
      if (board) state["board"] = board
      if (whiteTimer) state["whiteTimer"] = whiteTimer
      if (blackTimer) state["blackTimer"] = blackTimer
      if (endMessage) state["endMessage"] = endMessage
      return {...state}
    default:
      return state
  }
}

export const setTimeMode = (timeMode) => {
  return {type: SET_GAME_DATA, payload: {timeMode}}
}

export const initGame = (user) => async (dispatch, getState) => {
  const gameSocket = new WebSocket("ws://localhost:8000/ws/update_board/");

  //gameSocket.onopen = () => gameSocket.send(JSON.stringify({
  //  'fen': "suck my dick",
  //}));

  gameSocket.onmessage = function (e) {
  const data = JSON.parse(e.data);
  console.log(data);
  }
  const timeMode = getState().gameReducer.timeMode;
  const {pk, fen} = await GameService.initGame(timeMode, user)
  dispatch({
    type: INIT_GAME,
    payload: {
      gameId: pk,
      board: new Board(fen),
      whiteTimer: timeMode.timer * 60,
      blackTimer: timeMode.timer * 60,
    },
  })
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

  dispatch({type: SET_GAME_DATA, payload: {board}})

  try {
    const responseData = await GameService.makeMove(gameId, moveUci)

    if (typeof responseData === "string") {
      if (responseData === "Illegal move") throw new Error()

      dispatch({type: SET_GAME_DATA, payload: {endMessage: responseData}})

      if (responseData.includes("time is up")) {
        rollbackBoard.unselectPiece()
        throw new Error()
      }
    }

    if (responseData.board_fen) {
      dispatch({
        type: SET_GAME_DATA,
        payload: {
          board: new Board(responseData.board_fen),
          whiteTimer: hmsToSeconds(responseData.white_timer),
          blackTimer: hmsToSeconds(responseData.black_timer),
        },
      })
    }
  } catch {
    dispatch({type: SET_GAME_DATA, payload: {board: rollbackBoard}})
  }
}