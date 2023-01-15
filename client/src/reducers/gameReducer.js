import {INITIAL_PIECES} from '../consts/game';
import {TIMER_VALUES} from "../consts/game";
import axios from 'axios';


const INIT = "INIT";
const API_URL = 'http://localhost:8000';

export const NEW_GAME = {
  pieces: INITIAL_PIECES,
  castledBlack: false,
  castledWhite: false,
};

export const gameReducer = (state, action) => {

  switch(action.type) {
  case "INIT":
    console.log("HIT INIT");
    return {...NEW_GAME};
  case "ADD":
    return {
      ...state,
      pieces: {...state.pieces,
		[action.payload.to]: action.payload.piece}};
  case "MOVE":
    return {
      ...state,
      pieces: {...state.pieces,
	       [action.payload.from]: undefined,
	       [action.payload.to]: action.payload.piece}};
  default:
    return null;
  }
};

export const initGame = (timeMode, authUser, accessToken) => async (dispatch) => {
  const resp = await axios({
    method: 'post',
    url: `${API_URL}/game/init_game`,
    headers: {
      'content-type': 'application/json',
      'Authorization': `token ${accessToken}`},
    data: {
      user: authUser,
      white_player: 2,
      black_player: 3,
      timer: TIMER_VALUES[timeMode]
    }
  });
}