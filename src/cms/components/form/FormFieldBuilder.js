import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';
import {
  Field,
  FieldArray,
} from 'redux-form';

import { INDEX_HINT } from '%/translations/editor';
import * as k from '%/constants/keywords';
import * as C from '%/components';
import * as selectors from '%/selectors';

const mapStateToProps = (state, { fieldName }) => ({
  field: selectors.getFieldWithName(fieldName)(state),
  isIndexPathField: selectors.getIsIndexPathField(fieldName)(state),
});

const FormFieldBuilder = ({
  field,
  isIndexPathField,
  prefix,
}) => {
  let component;
  let type = '';
  let options = [];
  let fieldClassName = '';

  switch (field.type) {
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
      options = field.options;
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
      if (field.autocompleteSource) {
        component = C.AutocompleteInput;
      } else {
        component = 'input';
        type = 'text';
      }
      break;

    case k.TAGS:
      component = C.Tags;
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
    /* eslint-disable react/jsx-one-expression-per-line */
    <div className='form__element'>
      <label className='form__label' htmlFor={`${prefix || ''}${field.name}`}>{field.label}:</label>
      <Field
        {...field}
        className={`form__field ${fieldClassName}`}
        component={component}
        disabled={isIndexPathField}
        id={field.name}
        name={`${prefix || ''}${field.name}`}
        options={options}
        placeholder={isIndexPathField ? '' : field.placeholder}
        type={type}
      />
      {isIndexPathField && <p className='form__hint'><Translate id={INDEX_HINT} /></p>}
    </div>
  );
};

FormFieldBuilder.propTypes = {
  field: PropTypes.object,
  isIndexPathField: PropTypes.bool,
  prefix: PropTypes.string,
};

export default connect(mapStateToProps)(FormFieldBuilder);
