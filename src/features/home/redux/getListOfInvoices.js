import { delay, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  HOME_GET_LIST_OF_INVOICES_BEGIN,
  HOME_GET_LIST_OF_INVOICES_SUCCESS,
  HOME_GET_LIST_OF_INVOICES_FAILURE,
  HOME_GET_LIST_OF_INVOICES_DISMISS_ERROR,
} from './constants';
import jsondata from '../thedata.json';

export function getListOfInvoices() {
  // If need to pass args to saga, pass it with the begin action.
  return {
    type: HOME_GET_LIST_OF_INVOICES_BEGIN,
  };
}

export function dismissGetListOfInvoicesError() {
  return {
    type: HOME_GET_LIST_OF_INVOICES_DISMISS_ERROR,
  };
}

// worker Saga: will be fired on HOME_GET_LIST_OF_INVOICES_BEGIN actions
export function* doGetListOfInvoices() {
  // If necessary, use argument to receive the begin action with parameters.
  let res;
  try {
    // Do Ajax call or other async request here. delay(20) is just a placeholder.
    res=jsondata;
    // var mydata=[{vin:'1', year: '2019', brand: 'Cadbury', color: 'red'},{vin:'2', year: '2018', brand: 'Honda', color: 'blue'}];
    // res=mydata;
  } catch (err) {
    yield put({
      type: HOME_GET_LIST_OF_INVOICES_FAILURE,
      data: { error: err },
    });
    return;
  }
  // Dispatch success action out of try/catch so that render errors are not catched.
  yield put({
    type: HOME_GET_LIST_OF_INVOICES_SUCCESS,
    data: res,
  });
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchGetListOfInvoices() {
  yield takeLatest(HOME_GET_LIST_OF_INVOICES_BEGIN, doGetListOfInvoices);
}

// Redux reducer
export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_LIST_OF_INVOICES_BEGIN:
      return {
        ...state,
        getListOfInvoicesPending: true,
        getListOfInvoicesError: null,
      };

    case HOME_GET_LIST_OF_INVOICES_SUCCESS:
      return {
        ...state,
        getListOfInvoicesPending: false,
        getListOfInvoicesError: null,
        invoices:action.data,
      };

    case HOME_GET_LIST_OF_INVOICES_FAILURE:
      return {
        ...state,
        getListOfInvoicesPending: false,
        getListOfInvoicesError: action.data.error,
      };

    case HOME_GET_LIST_OF_INVOICES_DISMISS_ERROR:
      return {
        ...state,
        getListOfInvoicesError: null,
      };

    default:
      return state;
  }
}
