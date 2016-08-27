import './ForumAccountCard.scss';
import Post from './ForumPostCard';
import './ForumPostCard.scss';
import _ from 'lodash';
import { chartHelper } from 'utils/forumHelper';

const MAX_POSTS = 20;

class ForumAccountCard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let {
      posts
    } = this.props;
    posts = posts || [];

    chartHelper(posts, this.refs.chart);
  }

  render() {
    let {
      data,
      posts
    } = this.props;

    data = data || {};
    posts = posts || [];

    const {
      profileName,
      avatar,
      title,
      postsRead,
      postsMade,
      totalTime
    } = {
      profileName: data.profile_name,
      avatar: data.avatar,
      moderator: data.moderator,
      title: data.title,
      postsRead: data.posts_read,
      postsMade: data.posts_made,
      totalTime: data.total_time
    };

    const goodAvatar = _.startsWith(avatar, 'http');

    let maxNum;
    let postList = [];
    let addedPost;
    if (posts.length > 0) {
      if (posts.length > MAX_POSTS) {
        maxNum = MAX_POSTS;
      } else {
        maxNum = posts.length;
      }
      for (var entry = 0; entry < maxNum; entry++) {
        let post = posts[entry];
        addedPost = (
          <Post
            title={post.title}
            date={post.created_at}
            slug={post.slug}
            topicId={post.topic_id} />
        );
        postList.push(addedPost);
      }
    } else { postList = <tr></tr>; }

    return (
      <div>
        <div className='card forum-card'>
          <div className='title-section'>
            <h3>Student Forum Account</h3>
          </div>
          <div className='account'>
            {goodAvatar ? 
              <img className='avatar' src={avatar} alt='Avatar image' /> :
              <div className='avatar unknown' />
            }
            <section className='user'>
              <div>Username: {profileName}</div>
              <div>Title: {title}</div>
              <br />
              <div>Posts Read: {postsRead}</div>
              <div>Posts Made: {postsMade}</div>
              <div>Time on Forums: {totalTime}</div>
            </section>
          </div>
        </div>
        <div className='card forum-card'>
          <div className='title-section'>
            <h3>Post Frequency</h3>
          </div>
          <div ref='chart' className='svg-container'>
          </div>
        </div>
        <div className='card forum-card'>
          <div className='title-section'>
            <h3>Recent Posts</h3>
          </div>
          <table className='col-md-12'>
            <thead className='post-row'>
              <tr>
                <td>Post Title</td>
                <td>Date</td>
                <td>Post Link</td>
              </tr>
            </thead>
            <tbody id='table'>
              {postList}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ForumAccountCard;
