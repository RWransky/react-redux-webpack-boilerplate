/* https://github.com/rackt/react-router */
import {
  browserHistory,
  Router,
  Route,
  Redirect
} from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import store from 'stores/store';

import App from 'containers/App';
import Home from 'containers/Home';

const history = syncHistoryWithStore(browserHistory, store);

export default (
  <Provider store={store}>
    <Router 
      history={history}>
      <Redirect from='/' to='/home'/>

      <Route
        path='/'
        component={App}>

        <Route
          path='home'
          component={Home}
        />

      </Route>
    </Router>
  </Provider>
);
