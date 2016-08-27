import { connect } from 'react-redux';
import NotificationBar from './NotificationBar';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const loading = this.props.loading;

    return (
      <div className='root'>
        <div className='banner'>
          {/* Put temporary site-wide announcements here */}
        </div>
        { (loading) ?
          <div className='loading-container'>
            <div className='page-loading'>
            </div>
          </div>
          : null
        }

        <div className='content-container'>
          {this.props.children}
        </div>

        <div className='container'>
          <NotificationBar />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let routing = state.routing;
  state = state.default;
  return {
    loading: state.app.get('loading'),
    currentPath: routing.path
  };
};

export default connect(mapStateToProps)(App);
