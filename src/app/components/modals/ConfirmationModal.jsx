import './ConfirmationModal.scss';
import {
  Modal
} from 'react-bootstrap';

class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      show,
      confirmText,
      onConfirm,
      onHide
    } = this.props;

    return (
      <Modal
        show={show}
        onHide={onHide}>
        <div
          className='icon icon-close'
          onClick={onHide}>
        </div>
        <div className='modal-content-container'>
          <Modal.Title>Are You Sure?</Modal.Title>
          <Modal.Body>
            <p className='modal-p'>{this.props.children}</p>
            <div
              className='btn btn-regular btn-default'
              onClick={onConfirm}
              style={{marginRight: 10 + 'px'}}>
              {confirmText}
            </div>
            <div
              className='btn btn-regular btn-primary'
              onClick={onHide}>
              Cancel
            </div>
          </Modal.Body>
        </div>
      </Modal>
    );
  }
}

export default ConfirmationModal;
