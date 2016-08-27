import 'bootstrap-webpack';
import 'assets/_bootstrap-custom.scss';
import 'assets/_global.scss';
import 'assets/icons.scss';
import './app.scss';

import routes from 'routes';

import ReactDOM from 'react-dom';


ReactDOM.render(routes, document.getElementById('app'));
