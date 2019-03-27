import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';

import * as C from '%/components';
import * as tr from '%/translations';

const FieldListItem = ({
  canDelete,
  field,
  fieldNames,
  index,
  isFirstItem = index === 0,
  isLastItem,
  onDelete,
  onMove,
}) => (
  <article className='form__list-item'>
    {fieldNames.map(fieldName =>
      <C.FormFieldBuilder
        key={fieldName}
        fieldName={fieldName}
        prefix={`${field}.`}
      />
    )}
    {(canDelete || !isFirstItem || !isLastItem) && (
      <div className='form__list-buttons'>
        {canDelete && (
          <C.Button onClick={() => onDelete(index)}>
            <Translate id={tr.DELETE} />
          </C.Button>
        )}
        {!isFirstItem && (
          <C.Button onClick={() => onMove(index, index - 1)}>
            <Translate id={tr.MOVE_UP} />
          </C.Button>
        )}
        {!isLastItem && (
          <C.Button onClick={() => onMove(index, index + 1)}>
            <Translate id={tr.MOVE_DOWN} />
          </C.Button>
        )}
      </div>
    )}
  </article>
);

FieldListItem.propTypes = {
  canDelete: PropTypes.bool,
  field: PropTypes.string,
  fieldNames: PropTypes.array,
  index: PropTypes.number,
  isLastItem: PropTypes.bool,
  onDelete: PropTypes.func,
  onMove: PropTypes.func,
};

export default FieldListItem;
