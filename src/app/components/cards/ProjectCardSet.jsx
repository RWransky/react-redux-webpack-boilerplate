import './ProjectCardSet.scss';
import ProjectCard from './ProjectCard';


class ProjectCardSet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      projects,
      accountKey,
      currentUser
    } = this.props;
    let projectDisplayList;

    projects = projects || [];

    if(projects.size > 0) {
      projectDisplayList = projects.map((submissions, nd_key) => {
        let submissionDisplayList = submissions.map((collection, projectTitle) => {
          return (
            <ProjectCard
              accountKey={accountKey}
              currentUser={currentUser}
              submissions={collection}
              nd_key={nd_key}
              title={projectTitle} />
          );
        });
        return(
          <div>
            <div className='card nd-group'> {nd_key} </div>
            {submissionDisplayList}
          </div>
        );
      });
      
      return (
        <div>
          {projectDisplayList}
        </div>
      );
    } else {
      return (
        <div className='no-projects'>No Projects Submitted</div>
      );
    }

    
  }
}

export default ProjectCardSet;
