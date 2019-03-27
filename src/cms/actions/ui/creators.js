import * as t from '%/actions/types';
import * as k from '%/constants';
import * as tr from '%/translations';

export const clearAlerts = (isConfirmed = false) => ({
  type: t.CLEAR_ALERTS,
  payload: { isConfirmed },
});

export const setAlert = (type, message, trData, allowCancel) => {
  const title = {
    [k.ERROR]: tr.ERROR,
    [k.SUCCESS]: tr.SUCCESS,
    [k.NEUTRAL]: tr.NEUTRAL,
  }[type] || tr.SUCCESS;

  return {
    type: t.SET_ALERT,
    payload: {
      message,
      title,
      type,
      trData,
      allowCancel,
    },
  };
};

export const activateLoading = () => ({
  type: t.SET_LOADING,
  payload: { diff: 1 },
});

export const deactivateLoading = () => ({
  type: t.SET_LOADING,
  payload: { diff: -1 },
});

export const openModal = (type, data = {}) => ({
  type: t.SET_MODAL,
  payload: { type, data },
});

export const closeModal = () => ({
  type: t.SET_MODAL,
  payload: { type: null, data: {}},
});
