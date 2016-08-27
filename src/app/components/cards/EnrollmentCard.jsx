import './EnrollmentCard.scss';
import { connect } from 'react-redux';
import * as membershipDisplayHelper from 'utils/membershipDisplayHelper';
import Dropdown from 'components/common/Dropdown';
import DropdownOption from 'components/common/DropdownOption';

import {
  toggleGraduationModal,
  toggleUngraduateModal
} from 'actions/actions';
import {
  pauseSubscription,
  unpauseSubscription
} from 'actions/subscriptions';
import {
  getFlagState
} from 'utils/flagHelper';

class EnrollmentCard extends React.Component {
  constructor(props) {
    super(props);
    this.getWarning = this.getWarning.bind(this);
  }


  getWarning (flags, nd) {
    return getFlagState(flags, nd);
  }


  render() {
    const {
      dispatch,
      state,
      enrollments,
      student,
      allowedSections
    } = this.props;


    const enrollmentsList = enrollments.map((enrollment) => {
      const history = enrollment.get('state_history');

      const dates = (
        <div>
          {membershipDisplayHelper.allStateHistory(history)}
        </div>
      );
      const metadata = enrollment.get('metadata');
      let version;
      if (metadata) {
        version = metadata.get('content_version');
      } else {
        version = null;
      }


      const key = student.get('key');
      const subscriptions = student.get('subscriptions') || [];

      const groupName = enrollment.getIn(['group', 'name']);
      const groupKey = enrollment.get('group_key');

      return (
        <div className='enrollment'>
          <div className='enrollment-info'>
            <h4>
              {/* Preferably show the group name, but if registrar didn't know
                  the group name, just show the group key */}
              {groupName ? `${groupName} (${groupKey})` : `${groupKey}`}
            </h4>
            {dates}
            <div>
              {version ? `Version: ${version}`: null}
            </div>
          </div>
          <span className={this.getWarning(student.get('flags'), groupKey)}>
            OO
          </span>
          <div className='enrollment-actions'>
            
            <Dropdown
              displayName={
                <div>
                  Actions
                  <span className='caret'></span>
                </div>
              }>
              {
                (enrollment.get('state') !== 'GRADUATED' && enrollment.get('state') !== 'UNENROLLED') ?
                  <DropdownOption
                    action={() => {
                      dispatch(toggleGraduationModal(true,
                                                     enrollment.get('account_key'),
                                                     enrollment.getIn(['group', 'key'])));
                    }}>
                    Graduate (coming soon)
                  </DropdownOption> : null
              }
              {
                (enrollment.get('state') === 'GRADUATED') ?
                  <DropdownOption
                    action={() => {
                      dispatch(toggleUngraduateModal(true,
                                                     enrollment.get('account_key'),
                                                     enrollment.getIn(['group', 'key'])));
                    }}>
                    Ungraduate (coming soon)
                  </DropdownOption> : null
              }
              {
                (enrollment.get('state') === 'UNENROLLED') ?
                  <DropdownOption
                    action={() => {
                    }}>
                    No actions available
                  </DropdownOption> : null
              }
              {
                (enrollment.get('state') === 'ENROLLED' && allowedSections.includes('subscriptions')) ?
                <DropdownOption
                  action={() => {
                    this.props.dispatch(pauseSubscription(key, groupKey, subscriptions));
                  }}>
                  Pause Enrollment
                </DropdownOption> : null
              }
              {
                (enrollment.get('state') === 'PAUSED' && allowedSections.includes('subscriptions')) ?
                <DropdownOption
                  action={() => {
                    this.props.dispatch(unpauseSubscription(key, groupKey, subscriptions));
                  }}>
                  Resume Enrollment
                </DropdownOption> : null
              }

            </Dropdown>
          </div>
        </div>
      );
    });

    return (
      <div className='card enrollment-card'>
        <div className='title-section'>
          <h3>{state} ({enrollments.size})</h3>
        </div>
        {enrollmentsList}
      </div>
    );
  }
}

// We just do this so we don't have to pass
// dispatch and other functions around too much
export default connect(
  state => {
    state = state.default;
    return {
      allowedSections: state.explorer.get('allowedSections')
    };
  }
)(EnrollmentCard);
