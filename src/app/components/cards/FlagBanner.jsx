/* eslint new-cap: "off" */
import './FlagBanner.scss';
import {
  List
} from 'immutable';

class FlagBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      flags
    } = this.props;

    const formatBanner = (flags) => {
      if (flags.size > 0) {
        return flags.map((flag) => {
          let ND = flag.nd_key;
          let ID = flag.submission_id;
          let ticket = flag.ticket_id || '';
          let message;
          let bannerClass;
          if (flag.state === 'cheated') {
            bannerClass = 'banner-warning';
            message = `Submission #${ID} in ${ND} was plagiarized`;
          } else if (flag.state === 'repented') {
            bannerClass = 'banner-warning-muted';
            message = `Submission #${ID} in ${ND} reconciled`;
          } else if (flag.state === 'suspect') {
            bannerClass = 'banner-watch';
            message = `Submission #${ID} in ${ND} under investigation`;
          } else {
            bannerClass = null;
          }

          if (bannerClass) {
            if (ticket === ''){
              return(<div className={bannerClass}>{message}</div>);
            } else {
              return(<div className={bannerClass}><a href={'https://udacity.zendesk.com/agent/tickets/'+ticket} target='_blank'>{message}</a></div>);
            }
          }
          
        });
      } else {
        return null;
      }
      
    };

    

    flags = flags || List();

    return (
      <div>
        {formatBanner(flags)}
      </div>
    );
  }
}

export default FlagBanner;
