import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '%/actions';
import * as C from '%/components';
import * as k from '%/constants/keywords';
import * as selectors from '%/selectors';

const mapStateToProps = state => ({
  isGuideOpen: selectors.getModalState(state).type === k.GUIDE,
});

const mapDispatchToProps = dispatch => ({
  onCloseGuide: () => dispatch(actions.closeModal()),
});

const Guide = ({ isGuideOpen, onCloseGuide }) => isGuideOpen && (
  <C.Modal boxClasses='modal__box modal__box--guide' onClose={onCloseGuide}>
    <C.SissiSvg className='guide__sissi' />
    <C.GuideContent />
  </C.Modal>
);

Guide.propTypes = {
  isGuideOpen: PropTypes.bool,
  onCloseGuide: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Guide);
