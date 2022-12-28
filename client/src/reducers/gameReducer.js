import Board from "../models/Board"

const SELECT_PIECE = "SELECT_PIECE"
const UNSELECT_PIECE = "UNSELECT_PIECE"
const MOVE_PIECE = "MOVE_PIECE"
const UNSELECT = "UNSELECT"

const initialState = {
  board: new Board(),
}

export default function gameReducer(state = initialState, action) {
  const {index} = action.payload || {}
  const targetSquare = index != null && state.board.squares[index]
  console.log(state.board.toFen())
  switch (action.type) {
    case SELECT_PIECE:
      if (targetSquare.select()) return {...state}
      return state
    case UNSELECT_PIECE:
      state.board.unselectPiece()
      return {...state}
    case MOVE_PIECE:
      state.board.selectedPiece.move(index) ||
        (!targetSquare.isEmpty() &&
          !targetSquare.piece.selected &&
          targetSquare.select()) ||
        state.board.unselectPiece()
      return {...state}
    default:
      return state
  }
}

export const selectPiece = (index) => {
  return {type: SELECT_PIECE, payload: {index}}
}

export const unselectPiece = () => {
  return {type: UNSELECT_PIECE}
}

export const movePiece = (index) => {
  return {type: MOVE_PIECE, payload: {index}}
}

// export const initGame = (timeMode, authUser, accessToken) => async (dispatch) => {
//   console.log(timeMode);
//   console.log(authUser);
//   console.log(accessToken);
//   console.log(TIMER_VALUES[timeMode]);
//   const resp = await axios({
//     method: 'post',
//     url: `${API_URL}/game/init_game`,
//     headers: {
//       'content-type': 'application/json',
//       'Authorization': `token ${accessToken}`},
//     data: {
//       user: authUser,
//       white_player: 2,
//       black_player: 3,
//       timer: TIMER_VALUES[timeMode]
//     }
//   });
//   console.log(resp.data);
//   console.log(dispatch);