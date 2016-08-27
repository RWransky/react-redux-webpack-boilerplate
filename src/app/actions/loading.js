import * as types from './types';

export const setGlobal = (loading) => {
  return {
    type: types.SET_GLOBAL_LOADING,
    loading
  };
};
