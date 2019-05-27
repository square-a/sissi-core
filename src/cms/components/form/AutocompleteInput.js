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
    items={autocompleteItems}
    renderItem={(item, isHighlighted) => (
      <div key={item}>{item}</div>
    )}
    shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) !== -1}
    value={input.value}
    onChange={(e, value) => input.onChange(value)}
    onSelect={(v, item) => input.onChange(item)}
  />
);

AutocompleteInput.propTypes = {
  autocompleteItems: PropTypes.array,
  input: PropTypes.object,
};

export default connect(mapStateToProps)(AutocompleteInput);
