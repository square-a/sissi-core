/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as selectors from '%/selectors';
import * as actions from '%/actions';
import * as c from '%/constants';
import * as tr from '%/translations';

const mapStateToProps = state => ({
  images: selectors.getAllImages(state),
});

const mapDispatchToProps = dispatch => ({
  // eslint-disable-next-line consistent-return
  onUploadImage: e => {
    const image = e.target.files[0];

    if (c.validImageTypes.indexOf(image.type) === -1) {
      return dispatch(actions.setAlert(c.ERROR, tr.ERROR_IMAGE_TYPE));
    } else if (image.size > c.maxImageSize) {
      return dispatch(actions.setAlert(c.ERROR, tr.ERROR_IMAGE_SIZE));
    }
    dispatch(actions.saveImage(image));
  },
});

class ImagePicker extends React.Component {
  constructor(props) {
    super(props);
    this.openFileBrowser = this.openFileBrowser.bind(this);
  }

  componentWillUnmount() {
    if (this.fileBrowser) {
      document.querySelector('body').removeChild(this.fileBrowser);
    }
  }

  openFileBrowser() {
    if (!this.fileBrowser) {
      this.fileBrowser = document.createElement('input');
      this.fileBrowser.type = 'file';
      this.fileBrowser.accept = 'image/*';
      this.fileBrowser.style.display = 'none';
      document.querySelector('body').append(this.fileBrowser);
      this.fileBrowser.addEventListener('change', this.props.onUploadImage);
    }
    this.fileBrowser.click();
  }

  render() {
    const {
      images = [],
      onSelectImage,
    } = this.props;

    return [
      images.map(image => (
        <div
          key={image}
          className='modal__image'
          style={{ backgroundImage: `url('/images/${image}')` }}
          onClick={() => onSelectImage(image)}
        />
      )),
      <div
        key='file-browser'
        className='modal__image placeholder'
        id='file-browser-button'
        onClick={this.openFileBrowser}
      >
        <Translate id={tr.IMAGE_UPLOAD} />
      </div>,
    ];
  }
}

ImagePicker.propTypes = {
  images: PropTypes.array,
  onSelectImage: PropTypes.func,
  onUploadImage: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImagePicker);
