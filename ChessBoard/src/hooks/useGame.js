import {useReducer, useEffect} from 'react';
import {gameReducer, NEW_GAME} from '../store/gameReducer.js';

export const useGame = (initialState = NEW_GAME) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  // console.log(state.pieces);
  return [
    {...state},
    dispatch,
  ];
};
