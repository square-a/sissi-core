import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FieldArray } from 'redux-form';

import * as k from '%/constants/keywords';
import * as C from '%/components';
import * as selectors from '%/selectors';

const mapStateToProps = (state, { fieldName }) => ({
  field: selectors.getFieldWithName(fieldName)(state),
});

const FormFieldBuilder = ({ field, prefix }) => {
  let component;
  let type = '';
  let options = [];
  let fieldClassName = '';

  switch(field.type) {
    case k.LIST:
      return (
        <FieldArray
          component={C.FieldList}
          fieldNames={field.fields}
          name={field.name}
          props={{
            name: field.name,
          }}
        />
      );

    case k.CHOICE:
      component = C.Select;
      options = field.choices;
      break;

    case k.DATE:
      component = 'input';
      type = 'date';
      break;

    case k.IMAGE:
      component = C.ImageField;
      type = 'file';
      break;

    case k.MARKDOWN:
      component = C.MarkdownEditor;
      break;

    case k.STRING:
      component = 'input';
      type = 'text';
      break;

    case k.TEXT:
      component = 'textarea';
      fieldClassName = 'form__field--textarea';
      break;

    default:
      component = 'input';
      type = 'text';
  }

  return (
    <label className='form__element'>
      <span className='form__label'>{field.label}:</span>
      <Field
        className={`form__field ${fieldClassName}`}
        component={component}
        name={`${prefix ? prefix : ''}${field.name}`}
        options={options}
        placeholder={field.placeholder}
        type={type}
      />
    </label>
  );
}

FormFieldBuilder.propTypes = {
  field: PropTypes.object,
  prefix: PropTypes.string,
};

export default connect(mapStateToProps)(FormFieldBuilder);
