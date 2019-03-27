import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as actions from '%/actions';
import * as C from '%/components';
import * as k from '%/constants/keywords';
import * as selectors from '%/selectors';
import * as tr from '%/translations';

const mapStateToProps = (state) => {
  const { type, data } = selectors.getModalState(state);
  return {
    isTypePickerOpen: type === k.TYPE_PICKER,
    allowedTypes: (data && data.pageId)
      ? selectors.getAllowedSectionTypesForPageId(data.pageId)(state)
      : selectors.getAllowedPageTypes(state),
    pageId: data.pageId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCloseTypePicker: () => dispatch(actions.closeModal()),
  onSelectType: (pageId, type) => {
    if (pageId) {
      dispatch(actions.addSection(pageId, type));
    } else {
      dispatch(actions.addPage(type));
    }
    dispatch(actions.closeModal());
  },
});

const TypePicker = ({
  isTypePickerOpen,
  allowedTypes,
  pageId,
  onCloseTypePicker,
  onSelectType,
}) => isTypePickerOpen && (
  <C.Modal onClose={onCloseTypePicker} boxClasses='modal__box--type-picker'>
    <h2><Translate id={tr.TYPE_PICKER_TITLE} /></h2>
    {allowedTypes.map(type => (
      <C.Button key={type.name} classes='button--cta' onClick={() => onSelectType(pageId, type.name)}>
        <p>{type.label}</p>
      </C.Button>
    ))}
  </C.Modal>
);

TypePicker.propTypes = {
  isTypePickerOpen: PropTypes.bool,
  allowedTypes: PropTypes.array,
  pageId: PropTypes.string,
  onCloseTypePicker: PropTypes.func,
  onSelectType: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(TypePicker);
