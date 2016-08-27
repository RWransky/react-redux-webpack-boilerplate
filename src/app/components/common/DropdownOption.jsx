import './DropdownOption.scss';

class DropdownOption extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li
        className='dropdown-option'
        onClick={this.props.action}>
        {this.props.children}
      </li>
    );
  }
}

export default DropdownOption;
