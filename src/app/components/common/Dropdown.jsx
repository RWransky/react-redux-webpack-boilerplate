import './Dropdown.scss';

class Dropdown extends React.Component {
  constructor(props) {
    super(props); 
  }

  render() {
    const {
      displayName
    } = this.props;

    return (
      <div className='selector-dropdown dropdown'>
        <div className='dropdown-toggle' data-toggle='dropdown'>
          {displayName}
        </div>
        <ul className='dropdown-menu pull-right'>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

export default Dropdown;
