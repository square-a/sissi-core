import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as actions from '%/actions';
import * as C from '%/components';
import * as selectors from '%/selectors';
import * as tr from '%/translations';
import { ROUTE_INDEX } from '%/router';

const mapStateToProps = state => ({
  isIndex: selectors.getCurrentRoute(state) === ROUTE_INDEX,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(actions.resetSession());
    dispatch(actions.redirectToLogin());
  },
  onPublish: () => dispatch(actions.postContent(true)),
  onSave: () => dispatch(actions.postContent()),
});

const ActionBar = ({
  isIndex,
  onLogout,
  onPublish,
  onSave,
}) => (
  <aside className='actionbar'>
    <C.Button classes='button--cta' onClick={onPublish} >
      <Translate id={tr.PUBLISH} />
    </C.Button>

    <C.Button onClick={onSave} >
      <Translate id={tr.SAVE} />
    </C.Button>

    <C.Button onClick={onLogout}>
      <Translate id={tr.LOGOUT} />
    </C.Button>

    {isIndex && (
      <p className='actionbar__guide-teaser'>
        <span className='text-rotate'><Translate id={tr.GUIDE_TEASER} /></span>
      </p>
    )}
    <C.GuideButton />
  </aside>
);

ActionBar.propTypes = {
  isIndex: PropTypes.bool,
  onLogout: PropTypes.func,
  onPublish: PropTypes.func,
  onSave: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionBar);
