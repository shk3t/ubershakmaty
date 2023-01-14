import Board from "../models/Board"

const SELECT_PIECE = "SELECT_PIECE"
const UNSELECT_PIECE = "UNSELECT_PIECE"
const MOVE_PIECE = "MOVE_PIECE"

const initialState = {
  board: new Board(),
}

export default function gameReducer(state = initialState, action) {
  const {index} = action.payload || {}
  switch (action.type) {
    case SELECT_PIECE:
      console.log("selected!")
      if (state.board.selectPiece(index)) return {...state}
      return state
    case UNSELECT_PIECE:
      state.board.unselectPiece()
      return {...state}
    case MOVE_PIECE:
      if (state.board.movePiece(index)) return {...state}
      if (state.board.selectPiece(index)) return {...state}
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