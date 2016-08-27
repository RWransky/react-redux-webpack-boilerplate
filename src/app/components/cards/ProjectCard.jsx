import { connect } from 'react-redux';
import './ProjectCard.scss';
import Dropdown from 'components/common/Dropdown';
import DropdownOption from 'components/common/DropdownOption';
import {
  getTurnaroundTime,
  readResult,
  readProcessingState
} from 'utils/projectHelper';
import {
  updateProjects,
  addFlag,
  deleteFlag,
  updateFlag
} from 'actions/projects';
import {
  zenerateFirstTimePlagiarismTicket
} from 'actions/zendesk';


class ProjectCard extends React.Component {
  constructor(props) {
    super(props);

    this.renderFlags = this.renderFlags.bind(this);
    this.stopLight = this.stopLight.bind(this);
  }

  renderFlags(submission, index){
    if(submission.flag === 'blank'){
      const {accountKey} = this.props;
      return (
        <div>
          <Dropdown
            displayName={
              <div>
                Actions
                <span className='caret'></span>
              </div>
            }>
            <DropdownOption
              action={() => {
                zenerateFirstTimePlagiarismTicket(accountKey, submission).then(ticket => {
                  this.props.dispatch(addFlag(submission.id, this.props.currentUser, submission.project_id, submission.nd_key, this.props.accountKey, 'suspect', ticket.id));
                  this.props.dispatch(updateProjects(index,this.props.accountKey,'suspect',this.props.title,this.props.nd_key, ticket.id));
                });
                
              }}>
              Flag and Send Plagiarism Notice
            </DropdownOption>
            <DropdownOption
              action={() => {
                this.props.dispatch(addFlag(submission.id, this.props.currentUser, submission.project_id, submission.nd_key, this.props.accountKey, 'suspect'));
                this.props.dispatch(updateProjects(index,this.props.accountKey,'suspect',this.props.title,this.props.nd_key));
              }}>
              Flag Without Plagiarism Notice
            </DropdownOption>
          </Dropdown>
        </div>
      );
    } else if (submission.flag === 'suspect'){
      return (
        <div>
          <Dropdown
            displayName={
              <div>
                Actions
                <span className='caret'></span>
              </div>
            }>
            <DropdownOption
              action={() => {
                this.props.dispatch(updateFlag(submission.id, this.props.currentUser, 'clear', this.props.accountKey));
                this.props.dispatch(updateProjects(index,this.props.accountKey,'clear',this.props.title,this.props.nd_key));
              }}>
              Flag as Innocent
            </DropdownOption>
            <DropdownOption
              action={() => {
                this.props.dispatch(updateFlag(submission.id, this.props.currentUser, 'cheated', this.props.accountKey));
                this.props.dispatch(updateProjects(index,this.props.accountKey,'cheated',this.props.title,this.props.nd_key));
              }}>
              Confirm Plagiarism
            </DropdownOption>
            <DropdownOption
              action={() => {
                this.props.dispatch(updateFlag(submission.id, this.props.currentUser, 'repented', this.props.accountKey));
                this.props.dispatch(updateProjects(index,this.props.accountKey,'repented', this.props.title, this.props.nd_key));
              }}>
              Flag as Reconciled
            </DropdownOption>
            <DropdownOption
              action={() => {
                this.props.dispatch(deleteFlag(submission.id, this.props.accountKey));
                this.props.dispatch(updateProjects(index, this.props.accountKey, 'blank', this.props.title, this.props.nd_key));
              }}>
              Delete Flag
            </DropdownOption>
          </Dropdown>
        </div>
      );
    } else if (submission.flag === 'clear'){
      return (
        <div>
          <Dropdown
            displayName={
              <div>
                Actions
                <span className='caret'></span>
              </div>
            }>
            <DropdownOption
              action={() => {
                this.props.dispatch(deleteFlag(submission.id, this.props.accountKey));
                this.props.dispatch(updateProjects(index,this.props.accountKey,'blank',this.props.title,this.props.nd_key));
              }}>
              Delete Flag
            </DropdownOption>
          </Dropdown>
        </div>
      );
    } else {
      return (
        <div>
          <Dropdown
            displayName={
              <div>
                Actions
                <span className='caret'></span>
              </div>
            }>
            <DropdownOption
              action={() => {
                this.props.dispatch(updateFlag(submission.id, this.props.currentUser, 'clear', this.props.accountKey));
                this.props.dispatch(updateProjects(index,this.props.accountKey,'clear',this.props.title,this.props.nd_key));
              }}>
              Flag as Innocent
            </DropdownOption>
            <DropdownOption
              action={() => {
                this.props.dispatch(updateFlag(submission.id, this.props.currentUser, 'repented', this.props.accountKey));
                this.props.dispatch(updateProjects(index, this.props.accountKey, 'repented', this.props.title, this.props.nd_key));
              }}>
              Flag as Reconciled
            </DropdownOption>
            <DropdownOption
              action={() => {
                this.props.dispatch(deleteFlag(submission.id, this.props.accountKey));
                this.props.dispatch(updateProjects(index,this.props.accountKey,'blank',this.props.title,this.props.nd_key));
              }}>
              Delete Flag
            </DropdownOption>
          </Dropdown>
        </div>
      );
    }
  }


  stopLight(submission){
    let flagClass;

    if(submission.flag === 'cheated'){
      flagClass = 'red';
    } else if(submission.flag === 'repented'){
      flagClass = 'muted';
    } else if(submission.flag === 'suspect'){
      flagClass = 'yellow';
    } else{
      flagClass = 'green';
    }

    return (
      <div className='bump'>
        <div className={flagClass}>OO</div>
      </div>
    );
  }


  render() {
    const {
      title,
      submissions
    } = this.props;

    let submissionDisplayList = null;
    if(submissions.map) {
      submissionDisplayList = submissions.map((submission, index) => {
        submission = submission.toJS();
        return (
          <div className='submission'>
           <div>{this.stopLight(submission)}</div>
           <div className='submit-info'>
            <div><a href={'https://review.udacity.com/#!/reviews/'+submission.id} target='_blank'>Submission #{submission.id}</a></div>
            <div>Date Submitted: {new Date(submission.created_at)
                .toLocaleString('en-US')}</div>
            <div>Processing state: {readProcessingState(submission)}</div>
            <div>
              <a href={'https://review-api.udacity.com/admin/submission/'+submission.id} target='_blank'>Admin Link</a>|
              {submission.ticket_id === '' ? null : <a href={'https://udacity.zendesk.com/agent/tickets/'+submission.ticket_id} target='_blank'>Zendesk Link</a>}
            </div>
           </div>
            {submission.status === 'completed' ?
              <div className='grader-info'>
                <div>Result: {readResult(submission)}</div>
                <div>Grader: {submission.grader.name}</div>
                <div>Turn-Around Time: {getTurnaroundTime(submission.created_at,
                                        submission.completed_at)}</div>
              </div> :
              null
            }
            <div>
              {this.renderFlags(submission, index)}
            </div>
          </div>
        );
      });
    }

    return (
      <div className='card project-card'>
        <div className='title-section'>
          <h3>{title}</h3>
        </div>
        <div className='submissions'>
          {submissionDisplayList}
        </div>
      </div>
    );
  }
}


export default connect()(ProjectCard);
