import './JSONCard.scss';
import JSONPretty from 'react-json-pretty';

class JSONCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      json
    } = this.props;

    return (
      <div className='card'>
        <JSONPretty json={json} />
      </div>
    );
  }
}

export default JSONCard;
