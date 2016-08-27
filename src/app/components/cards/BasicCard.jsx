
export default class BasicCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      membership
    } = this.props;

    return (
      <div className='basic-card'>
        <div className='title-section'>
          <h3>{membership.getIn(['group', 'name'])}</h3>
        </div>
      </div>
    );
  }
}
