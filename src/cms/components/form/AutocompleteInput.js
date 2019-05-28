/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Autocomplete from 'react-autocomplete';

import * as selectors from '%/selectors';

const mapStateToProps = (state, { autocompleteSource }) => ({
  autocompleteItems: autocompleteSource ? selectors.getAutocompleteItems(autocompleteSource)(state) : [],
});

const AutocompleteInput = ({
  autocompleteItems,
  input,
}) => (
  <Autocomplete
    getItemValue={item => item}
    inputProps={{
      className: 'form__field',
      id: input.name,
    }}
    items={autocompleteItems}
    renderItem={(item, isHighlighted) => (
      <div
        key={item}
        className={`form__autocomplete-item${isHighlighted ? ' form__autocomplete-item--highlight' : ''}`}
      >
        {item}
      </div>
    )}
    shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) !== -1}
    value={input.value}
    wrapperProps={{ className: 'form__autocomplete' }}
    onChange={(e, value) => input.onChange(value)}
    onSelect={(v, item) => input.onChange(item)}
    {...input}
  />
);

AutocompleteInput.propTypes = {
  autocompleteItems: PropTypes.array,
  input: PropTypes.object,
};

export default connect(mapStateToProps)(AutocompleteInput);
