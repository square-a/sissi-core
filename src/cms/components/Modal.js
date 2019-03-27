import React from 'react';
import PropTypes from 'prop-types';

const WRAPPER_ID = 'image-popup';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.onClickWrapper = this.onClickWrapper.bind(this);
  }

  onClickWrapper(e) {
    if (e.target.id === WRAPPER_ID) {
      this.props.onClose();
    }
  }

  render() {
    const {
      boxClasses,
      children,
    } = this.props;

    return (
      <aside
        id={WRAPPER_ID}
        className='modal'
        onClick={this.onClickWrapper}
      >
        <article className={`modal__box ${boxClasses}`}>
          {children}
        </article>
      </aside>
    )
  }
}

Modal.propTypes = {
  boxClasses: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  boxClasses: '',
  children: null,
  onClose: () => null,
};

export default Modal;
