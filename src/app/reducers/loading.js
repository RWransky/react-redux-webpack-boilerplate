/* eslint new-cap: "off" */
import {
  Map
} from 'immutable';

const loading = (state = Map({
  isLoading: false
}), action) => {
  switch(action.type) {
    default:
      return state;
  }
};

export default loading;
