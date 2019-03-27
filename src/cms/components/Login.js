import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Field,
  reduxForm,
} from 'redux-form';
import { Translate } from 'react-localize-redux';

import * as actions from '%/actions';
import * as C from '%/components';
import * as tr from '%/translations';

const mapDispatchToProps = (dispatch) => ({
  onLogin: (e) => {
    e.preventDefault();
    dispatch(actions.login());
  },
});

const Login = ({ loginFields, onLogin }) => (
  <div className='login'>
    <C.SissiSvg className='login__sissi' />
    <h1><Translate id={tr.WELCOME} /></h1>
    <form className='form' onSubmit={onLogin}>
      <label className='form__element'>
        <span className='form__label'>
          <Translate id={tr.USERNAME} />:
        </span>
        <Field
          className='form__field'
          component='input'
          name='username'
          type='text'
        />
      </label>
      <label className='form__element'>
        <span className='form__label'>
          <Translate id={tr.PASSWORD} />:
        </span>
        <Field
          className='form__field'
          component='input'
          name='password'
          type='password'
        />
      </label>
      <div className='form__buttons'>
        <button type='submit' className='button button--cta'>
          <Translate id={tr.LOGIN} />
        </button>
      </div>
    </form>
  </div>
);

Login.propTypes = {
  loginFields: PropTypes.array,
  onLogin: PropTypes.func,
};

export default compose(
  connect(null, mapDispatchToProps),
  reduxForm({
    form: 'login',
  })
)(Login);
