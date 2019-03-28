/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';

import * as C from '%/components';
import * as tr from '%/translations';

class ImageField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isImagePickerActive: false,
    };

    this.onSelectImage = this.onSelectImage.bind(this);
    this.onToggleImagePicker = this.onToggleImagePicker.bind(this);
  }

  onToggleImagePicker() {
    this.setState(state => ({
      isImagePickerActive: !state.isImagePickerActive,
    }));
  }

  onSelectImage(image) {
    this.props.input.onChange(image);
    this.onToggleImagePicker();
  }

  render() {
    const { input } = this.props;

    return ([
      this.state.isImagePickerActive && (
        <C.Modal key='image-popup' boxClasses='modal__box--image-picker' onClose={this.onToggleImagePicker}>
          <C.ImagePicker onSelectImage={this.onSelectImage} />
        </C.Modal>
      ),
      input.value
        ? (
          <div
            key='image'
            className='form__field form__field--image'
            style={{ backgroundImage: `url('/images/${input.value}')` }}
            onClick={this.onToggleImagePicker}
          />
        ) : (
          <div
            key='placeholder'
            className='form__field form__field--image placeholder'
            onClick={this.onToggleImagePicker}
          >
            <Translate id={tr.IMAGE_SELECT} />
          </div>
        )
    ]);
  }
}

ImageField.propTypes = {
  input: PropTypes.object,
};

export default ImageField;
