/* eslint new-cap: "off" */
import './StudentJSONAttrCard.scss';
import {
  Map
} from 'immutable';

class StudentJSONAttrCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      postAttr,
      deleteAttr
    } = this.props;

    let fields = this.props.fields;

    // Agnostic 'field'
    let fieldsDisplay;
    if(typeof fields === 'object') {
      if(!Map.isMap(fields)) {
        fields = Map(fields);
      }

      fieldsDisplay = fields.map((value, key) => {
        if(value) {
          return (
            <div className='field'>
              <div className='name'>
                <div
                  id=''
                  className='name-val'
                  type='text'>
                  {key}
                </div>
              </div>
              <div className='value'>
                <input
                  id=''
                  type='text'
                  defaultValue={value}
                  className='form-control'></input>
                <div
                  className='btn btn-primary'
                  onClick={() => {
                    postAttr(key, value);
                  }}>
                  Save
                </div>
                <div
                  className='btn btn-danger'
                  onClick={() => {
                    deleteAttr(key, value);
                  }}>
                  Delete
                </div>
              </div>
            </div>
          );
        } else {
          return null;
        }
      });
    }

    return (
      <div className='card'>
          <div className='title-section'>
            <h3>{title}</h3>
          </div>
        <div className='edit-student-attr-container'>
          <div className='new-field'>
            <input
              id='new-thing-name'
              type='text'
              placeholder='Name'
              className='form-control col-md-6'></input>
            <input
              id='new-thing-value'
              type='text'
              placeholder='Value'
              className='form-control col-md-6'></input>
            <div
              className='btn btn-primary'
              onClick={() => {
                postAttr($('#new-thing-name').val(), $('#new-thing-value').val());
                //addAttr($('#new-thing-name').val(), $('#new-thing-value').val());
                $('#new-thing-name').val('');
                $('#new-thing-value').val('');
              }}>Add</div>
          </div>
          {fieldsDisplay}
        </div>
      </div>
    );
  }
}

export default StudentJSONAttrCard;
