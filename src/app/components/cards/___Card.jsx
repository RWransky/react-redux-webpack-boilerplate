class ___Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='card'>
        {this.props.children}
      </div>
    );
  }
}

export default ___Card;
