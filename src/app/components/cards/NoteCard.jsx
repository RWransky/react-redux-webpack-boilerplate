import './NoteCard.scss';
import moment from 'moment';

class NoteCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      annotations,
      accountKey,
      authorKey,
      authorName,
      addAnnotation
    } = this.props;

    let notes;
    if(annotations) {
      notes = annotations.map(annotation => {
        const {
          text,
          date,
          author
        } = {
          text: annotation.text,
          date: moment(annotation.updated_at).format('l, LT'),
          author: annotation.author_name
        };

        return (
          <div className='note'>
            <div className='header'>
              <div className='author'>{author}</div>
              <div className='date'>{date}</div>
            </div>
            <div className='text'>
              {text}
            </div>
          </div>
        );
      });
    }

    return (
      <div className='card note-card'>
        <div className='title-section'>
          <h3>Student Account Notes</h3>
        </div>
        <div className='note-card-container'>
          <div className='new-note'>
            <textarea
              placeholder='Add a new note here'
              id='new-annotation-input'></textarea>
            <div className='btn-container'>
              <div className='post btn btn-primary'
                onClick={() => {
                  addAnnotation({
                    text: $('#new-annotation-input').val(),
                    accountKey,
                    authorKey,
                    authorName
                  });

                  $('#new-annotation-input').val('');
                }}>
                POST
              </div>
            </div>
          </div>
          <div className='notes'>
            {notes}
          </div>
        </div>
      </div>
    );
  }
}

export default NoteCard;
