import JSONCard from './JSONCard';

class AllGroupsCardSet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      membershipsList
    } = this.props;

    let membershipDisplayList = null;
    if(membershipsList.map) {
      membershipDisplayList = membershipsList.map((membership) => {
        return (
          <JSONCard
            json={membership.toJSON()}>
          </JSONCard>
        );
      });
    }

    return (
      <div>
        {membershipDisplayList}
      </div>
    );
  }
}

export default AllGroupsCardSet;
