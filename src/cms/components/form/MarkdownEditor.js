import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InscrybMDE from 'inscrybmde';

import * as actions from '%/actions';
import * as C from '%/components';
import * as tr from '%/translations';
import { SUCCESS } from '%/constants';

const mapDispatchToProps = (dispatch) => ({
  onSelectImage: (image) => {
    dispatch(actions.setAlert(SUCCESS, tr.IMAGE_PASTE_IN_EDITOR, { image }));
  },
});

let count = 0;

class MarkdownEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isImagePickerActive: false,
    };

    this.onSelectImage = this.onSelectImage.bind(this);
    this.onToggleImagePicker = this.onToggleImagePicker.bind(this);
  }

  componentDidMount() {
    count++;
    const nodeList = document.querySelectorAll('.markdown-editor');
    const mde = new InscrybMDE({
      blockStyles: {
        italic: '_',
      },
      element: nodeList.item(count - 1),
      minHeight: '220px',
      placeholder: this.props.placeholder,
      spellChecker: false,
      status: false,
      toolbar: [
        'heading',
        'italic',
        'unordered-list',
        'link',
        {
          name: 'image',
          className: 'fa fa-picture-o',
          title: 'Insert Image',
          action: function selectImage(editor) {
            this.onToggleImagePicker();
          }.bind(this),
        },
      ],
    });
    mde.codemirror.on('change', () => this.props.input.onChange(mde.value()));
  }

  componentWillUnmount() {
    count--;
  }

  onToggleImagePicker() {
    this.setState({
      isImagePickerActive: !this.state.isImagePickerActive,
    });
  }

  onSelectImage(image) {
    this.props.onSelectImage(image);
    this.onToggleImagePicker();
  }

  render() {
    const { input } = this.props;

    return ([
      this.state.isImagePickerActive &&
        <C.Modal
          key={`image-picker-${count}`}
          boxClasses='modal__box--image-picker'
          onClose={this.onToggleImagePicker}>
          <C.ImagePicker onSelectImage={this.onSelectImage} />
        </C.Modal>
      ,
      <textarea key='markdown-editor' className='markdown-editor' {...input} />
    ]);
  }
}

MarkdownEditor.propTypes = {
  input: PropTypes.object,
};

export default connect(null, mapDispatchToProps)(MarkdownEditor);
