import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import * as reducers from 'reducers/reducers';
import { routerReducer, routerMiddleware } from 'react-router-redux';

const middleware = routerMiddleware(browserHistory);

let reducer,
  state,
  store;

reducer = combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}));


state = reducer(state, {
  name: 'CONSTRUCT'
});

store = createStore(
  reducer,
  state,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
