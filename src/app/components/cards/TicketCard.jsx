import './TicketCard.scss';
import './ZendeskAccountCard.scss';
import {
  dateHelper
} from 'utils/forumHelper';


let Ticket = React.createClass ({

  render() {
    const {
      subject,
      date,
      ticketID,
      description
    } = this.props;

    const link = 'https://udacity.zendesk.com/agent/tickets/' + ticketID;
    return (
      <li className='post-row'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h4>{subject}</h4>
            <h5>{`Last Updated: ${dateHelper(date)}`}</h5>
            <div>
              <a href={link} target='_blank'><button className='btn wrapper-btn btn-warning btn-space' type='button'>Open in Zendesk</button></a>
            </div>
          </div>
          <div className='panel-body'>
            <p>{description}</p>
          </div>
        </div>
      </li>
    );
  }
});

module.exports = Ticket;
