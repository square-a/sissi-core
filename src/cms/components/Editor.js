import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as C from '%/components';
import * as selectors from '%/selectors';

const mapStateToProps = state => ({
  ...selectors.getPropsForEditor(state),
});

const Editor = ({
  canDelete,
  fieldNames,
  formName,
  initialValues,
  viewLevel,
  onDelete,
}) => (
  <section className={`editor editor--level-${viewLevel}`}>
    {/* Do not remove the form key! */}
    <C.Form
      key={formName}
      canDelete={canDelete}
      fieldNames={fieldNames}
      form={formName}
      initialValues={initialValues}
    />
  </section>
);

Editor.propTypes = {
  canDelete: PropTypes.bool,
  fieldNames: PropTypes.array,
  formName: PropTypes.string,
  initialValues: PropTypes.object,
  level: PropTypes.number,
  onDelete: PropTypes.func,
};

Editor.defaultProps = {
  canDelete: false,
  fieldNames: [],
  formName: '',
  initialValues: {},
  level: 1,
  onDelete: () => null,
};

export default connect(mapStateToProps)(Editor);
