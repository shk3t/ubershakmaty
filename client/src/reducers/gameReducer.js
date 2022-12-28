import {INITIAL_PIECES} from "../consts/game"

const ADD_PIECE = "ADD_PIECE"
const MOVE_PIECE = "MOVE_PIECE"

const initialState = {
  pieces: INITIAL_PIECES,
  castledBlack: false,
  castledWhite: false,
}

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PIECE:
      return {
        ...state,
        pieces: {...state.pieces, [action.payload.to]: action.payload.piece},
      }
    case MOVE_PIECE:
      return {
        ...state,
        pieces: {
          ...state.pieces,
          [action.payload.from]: undefined,
          [action.payload.to]: action.payload.piece,
        },
      }
    default:
      return state
  }
}

export const movePiece = (clickedSquare, selectedPiece, e) => {
  return {
    type: "MOVE_PIECE",
    payload: {
      from: clickedSquare.current,
      to: e.target.id,
      piece: selectedPiece.current,
    },
  }
}