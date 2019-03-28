import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as actions from '%/actions';
import * as C from '%/components';
import * as selectors from '%/selectors';
import * as tr from '%/translations';

const mapStateToProps = state => ({
  ...selectors.getPropsForAlert(state),
});

const mapDispatchToProps = dispatch => ({
  onConfirm: () => dispatch(actions.clearAlerts(true)),
  onCancel: () => dispatch(actions.clearAlerts(false)),
});

const Alert = ({
  allowCancel,
  allowConfirm,
  message,
  title,
  trData,
  type,
  onCancel,
  onConfirm,
}) => !!type && (
  <aside className='modal modal--alert'>
    <article className={`modal__box modal__box--alert ${type}`}>
      <h2 className='modal__title'><Translate id={title} /></h2>
      <p className='modal__message'><Translate data={trData} id={message} /></p>
      <div className='modal__button-row'>
        {allowConfirm && (
          <C.Button
            classes={`${allowCancel ? '' : 'button--cta'} ${type}`}
            onClick={onConfirm}
          >
            <Translate id={tr.OK} />
          </C.Button>
        )}
        {allowCancel && (
          <C.Button
            classes={`button--cta ${type}`}
            onClick={onCancel}
          >
            <Translate id={tr.CANCEL} />
          </C.Button>
        )}
      </div>
    </article>
  </aside>
);

Alert.propTypes = {
  allowCancel: PropTypes.bool,
  allowConfirm: PropTypes.bool,
  message: PropTypes.string,
  title: PropTypes.string,
  trData: PropTypes.object,
  type: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
