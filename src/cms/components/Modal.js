/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
        className='modal'
        id={WRAPPER_ID}
        onClick={this.onClickWrapper}
      >
        <article className={`modal__box ${boxClasses}`}>
          {children}
        </article>
      </aside>
    );
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
