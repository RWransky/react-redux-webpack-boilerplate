import * as types from 'actions/types';

export const _emitNotification = (notification, duration, sentiment) => {
  return {
    type: types.EMIT_NOTIFICATION,
    notification,
    duration,
    sentiment
  };
};

export const finishNotification = (notification) => {
  return {
    type: types.FINISH_NOTIFICATION,
    notification
  };
};

export const emitNotification = (notification, duration, sentiment) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(finishNotification(notification));
    }, duration);

    dispatch(_emitNotification(notification, duration, sentiment));
  };
};

