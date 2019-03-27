import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as actions from '%/actions';
import * as C from '%/components';
import * as tr from '%/translations';

const mapDispatchToProps = dispatch => ({
  onDelete: () => dispatch(actions.deleteItem()),
  onSave: () => dispatch(actions.postContent()),
});

const Form = ({
  canDelete,
  fieldNames = [],
  onDelete,
  onSave,
}) => (
  <form className='form'>
    {fieldNames.map(fieldName => (
      <C.FormFieldBuilder key={fieldName} fieldName={fieldName} />
    ))}
    <div className='form__element form__element--buttons'>
      <C.Button onClick={onSave} classes='button--cta'>
        <Translate id={tr.SAVE} />
      </C.Button>
      {canDelete && (
        <C.Button onClick={onDelete}>
          <Translate id={tr.DELETE} />
        </C.Button>
      )}
    </div>
  </form>
);

Form.propTypes = {
  canDelete: PropTypes.bool,
  fields: PropTypes.array,
  onDelete: PropTypes.func,
  onSave: PropTypes.func,
};

export default compose(
  connect(null, mapDispatchToProps),
  reduxForm({
    destroyOnUnmount: true,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })
)(Form);
