import './EnrollmentCardSet.scss';
import { connect } from 'react-redux';
import EnrollmentCard from './EnrollmentCard';

class EnrollmentCardSet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      membershipsList,
      groupEnrollmentsByProp,
      student
    } = this.props;

    const enrollmentList = membershipsList;
    let enrollmentGroupedList;
    if(enrollmentList && groupEnrollmentsByProp) {
      enrollmentGroupedList = enrollmentList.groupBy((enrollment) => {
        return enrollment.get(groupEnrollmentsByProp);
      });
    }

    let enrollmentDisplayList;
    if(enrollmentGroupedList) {
      enrollmentDisplayList = enrollmentGroupedList.map((enrollmentGroup, state) => {
        return (
          <EnrollmentCard
            state={state}
            enrollments={enrollmentGroup}
            student={student}
          />
        );
      });
    }

    return (
      <div>
        {enrollmentDisplayList}
      </div>
    );
  }
}

export default connect()(EnrollmentCardSet);
