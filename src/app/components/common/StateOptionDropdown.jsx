import './StateOptionDropdown.scss';
import DropdownOption from './DropdownOption';
import Dropdown from './Dropdown';

class StateOptionDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      groupTypes,
      updateMembershipState,
      accountKey,
      groupKey
    } = this.props;

    let stateOpts;

    if(groupTypes && groupTypes[groupKey]) {
      stateOpts = groupTypes[groupKey].map((s) => {
        return (
          <DropdownOption
            action={() => {
              updateMembershipState(accountKey, groupKey, s);
            }}>
            {s}
          </DropdownOption>
        );
      });
    }

    return (
      <Dropdown
        displayName='State'
      >
        {stateOpts}
      </Dropdown>
    );
  }
}

export default StateOptionDropdown;
