import { connect } from 'react-redux';
import './Home.scss';

class Home extends React.Component {

  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let routing = state.routing;
  state = state.default;
  return {
    currentPath: routing.path
  };
};

export default connect(mapStateToProps)(Home);
