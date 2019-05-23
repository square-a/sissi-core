import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactTags from 'react-tag-autocomplete';

import * as selectors from '%/selectors';
import {
  stringsToTags,
  tagsToStrings,
} from '%/helpers/formatTags';

const mapStateToProps = (state, { autocompleteSource }) => ({
  autocompleteItems: autocompleteSource ? selectors.getAutocompleteItems(autocompleteSource)(state) : [],
});

const Tags = ({
  autocompleteItems,
  input = {},
}) => {
  const [tags, setTags] = useState(stringsToTags(input.value));

  const addTag = tag => {
    const updatedTags = [
      ...tags,
      { id: tag.name, name: tag.name },
    ];

    setTags(updatedTags);
    input.onChange(tagsToStrings(updatedTags));
  };

  const removeTag = tagIndex => {
    const updatedTags = tags.filter((t, index) => index !== tagIndex);

    setTags(updatedTags);
    input.onChange(tagsToStrings(updatedTags));
  };

  return (
    <ReactTags
      allowNew
      /* eslint-disable react/jsx-no-bind */
      handleAddition={addTag}
      handleDelete={removeTag}
      /* eslint-enable react/jsx-no-bind */
      minQueryLength={1}
      suggestions={stringsToTags(autocompleteItems)}
      tags={tags}
    />
  );
};

Tags.propTypes = {
  autocompleteItems: PropTypes.array,
  input: PropTypes.object,
};

export default connect(mapStateToProps)(Tags);
