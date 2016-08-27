import './ForumPostCard.scss';
import {
  dateHelper
} from 'utils/forumHelper';
import {
  shortenString
} from 'utils/strings';

class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      date,
      slug,
      topicId
    } = this.props;
    const link = 'https://discussions.udacity.com/t/' + slug + '/' + topicId;
    return (
      <tr className='post-row'>
        <td>{shortenString(title,50)}</td>
        <td>{dateHelper(date)}</td>
        <td><a href={link} target='_blank'>Go To Post</a></td>
      </tr>
    );
  }
}

export default Post;
