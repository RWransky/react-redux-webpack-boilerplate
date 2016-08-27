import './ZendeskAccountCard.scss';
import Ticket from './TicketCard';
import {filterOpenPendingTickets} from 'utils/zendeskHelper';
import _ from 'lodash';

const MAX_TICKETS = 5;

class ZendeskAccountCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      data,
      tickets
    } = this.props;

    data = data || {
      'photo': null,
      'name': 'Loading...',
      'id': 'Loading...',
      'role': 'Loading...'
    };


    tickets = tickets || [];

    const newTicket = (
        <div className='btn btn-regular btn-primary'> 
          <a 
            href = {`https://udacity.zendesk.com/agent/tickets/new/1?requester_id=${data.id}`}
            target = '_blank'>
            Create New Ticket
          </a>
        </div>
      );
    
    let ticketList = [];
    
    
    let filteredTickets = filterOpenPendingTickets(tickets);
    if (filteredTickets.length > 0) {
      ticketList = filteredTickets.slice(0, MAX_TICKETS).map(ticket => {
        return (
          <Ticket 
            subject={ticket.subject}
            date={ticket.updated_at}
            description={ticket.description}
            ticketID={ticket.id} />
        );
      });
    } else {
      ticketList = (
        <li>
          <div className='panel panel-default panel-heading'>
            No Open or Pending Tickets
          </div>
        </li>
      );
    }

    let avatar;
    if (data.photo === null){
      avatar = '';
    } else {
      avatar = data.photo.content_url;
    }

    return (
      <div>
        <div className='card zendesk-card'>
          <div className='title-section'>
            <h3>Student Zendesk Account</h3>
          </div>
          <div className='account'>
            
            <section className='user col-md-6'>
              {_.startsWith(avatar, 'http') ? 
                <img className='avatar col-md-6' src={avatar} alt='Avatar image' /> :
                <div className='avatar unknown' />
              }
              <div>Name: {data.name}</div>
              <br />
              <div>ID: {data.id}</div>
              <br />
              <div>Role: {data.role[0].toUpperCase() + data.role.slice(1)}</div>
              <br />

            </section>
            <span className='new-ticket col-md-6'>
              {newTicket}
            </span>
          </div>
        </div>
        <div className='card zendesk-card'>
          <div className='title-section'>
            <h3>Open and Pending Tickets</h3>
          </div>
            <ul className='list-group'>
              {ticketList}
            </ul>
            <div className='text-center'>
              <a href={`https://udacity.zendesk.com/agent/users/${data.id}/assigned_tickets`} target='_blank'>
                <button className='btn wrapper-btn btn-primary' type='button'>
                  {tickets.length>MAX_TICKETS ? 'See More Tickets' : 'View Full Profile'}
                </button>
              </a>
            </div>
        </div>
      </div>
    );
  }
}

export default ZendeskAccountCard;
