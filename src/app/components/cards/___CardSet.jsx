import ___Card from './___Card';

class ___CardSet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      membershipsList
    } = this.props;

    const ___DisplayList = membershipsList.map(() => {
      return (
        <___Card>
          {this.props.children}
        </___Card>
      );
    });

    return (
      <div>
        {___DisplayList}
      </div>
    );
  }
}

export default ___CardSet;
