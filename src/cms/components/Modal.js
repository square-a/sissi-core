/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import PropTypes from 'prop-types';

const WRAPPER_ID = 'image-popup';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.onClickWrapper = this.onClickWrapper.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onClickWrapper(e) {
    if (e.target.id === WRAPPER_ID) {
      this.props.onClose();
    }
  }

  onKeyDown(e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.id === WRAPPER_ID) {
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
        role='button'
        tabIndex={0}
        onClick={this.onClickWrapper}
        onKeyDown={this.onKeyDown}
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
