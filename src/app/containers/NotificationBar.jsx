import './NotificationBar.scss';
import { connect } from 'react-redux';

class NotificationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      notifications
    } = this.props;

    let sentiment;
    let notification;

    if(notifications.last()) {
      sentiment = notifications.last().sentiment;
      notification = notifications.last().notification;
    }

    // Green bar by default
    if(!sentiment) {
      sentiment = 'success';
    }


    const display = ((notifications.size !== 0) ?
      <div id='notificationBar' className={`notification-bar container ${sentiment}`}>
        {notification}
      </div> :
      <div id='notificationBar'></div>
    );

    return display;
  }
}

export default connect(
  state => {
    state = state.default;
    return {
      notifications: state.app.get('notifications')
    };
  }
)(NotificationBar);
