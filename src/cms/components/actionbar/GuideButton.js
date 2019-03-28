import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '%/actions';
import * as C from '%/components';
import * as k from '%/constants/keywords';

const mapDispatchToProps = dispatch => ({
  onOpenGuide: () => dispatch(actions.openModal(k.GUIDE)),
});

const GuideButton = ({ onOpenGuide }) => (
  <button key='guide-button' className='actionbar__guide-button' type='button' onClick={onOpenGuide}>
    <C.SissiSvg />
  </button>
);

GuideButton.propTypes = {
  onOpenGuide: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(GuideButton);
