

import { SET_JWT_TOKEN, CLEAR_JWT_TOKEN } from './actionTypes';

export const setJwtToken = (jwtToken) => ({
  type: SET_JWT_TOKEN,
  payload: jwtToken,
});

export const clearJwtToken = () => ({
  type: CLEAR_JWT_TOKEN,
});
