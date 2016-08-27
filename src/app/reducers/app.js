/* eslint new-cap: "off" */
import {
  Map,
  List
} from 'immutable';
import * as types from '../actions/types';

const app = (state = Map({
  notifications: List(),
  loading: false
}), action) => {
  switch(action.type) {
    case types.EMIT_NOTIFICATION:
      state = state.set(
        'notifications',
        state.get('notifications').push({
          notification: action.notification,
          sentiment: action.sentiment
        })
      );

      return state;
    case types.FINISH_NOTIFICATION:
      state = state.set(
        'notifications',
        state.get('notifications').delete(
          state.get('notifications').findLastIndex((value) => {
            if(value) {
              if(value.notification === action.notification) {
                return true;
              }
            }

            return false;
          })
        )
      );

      return state;
    case types.SET_GLOBAL_LOADING:
      state = state.set('loading', action.loading);

      return state;
    default:
      return state;
  }
};

export default app;
