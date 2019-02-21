import { delay, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  EXAMPLES_FIRSTHIT_BEGIN,
  EXAMPLES_FIRSTHIT_SUCCESS,
  EXAMPLES_FIRSTHIT_FAILURE,
  EXAMPLES_FIRSTHIT_DISMISS_ERROR,
} from './constants';

export function firsthit() {
  // If need to pass args to saga, pass it with the begin action.
  return {
    type: EXAMPLES_FIRSTHIT_BEGIN,
  };
}

export function dismissFirsthitError() {
  return {
    type: EXAMPLES_FIRSTHIT_DISMISS_ERROR,
  };
}

// worker Saga: will be fired on EXAMPLES_FIRSTHIT_BEGIN actions
export function* doFirsthit() {
  // If necessary, use argument to receive the begin action with parameters.
  let res;
  try {
    // Do Ajax call or other async request here. delay(20) is just a placeholder.
    res = yield call(delay, 20);
  } catch (err) {
    yield put({
      type: EXAMPLES_FIRSTHIT_FAILURE,
      data: { error: err },
    });
    return;
  }
  // Dispatch success action out of try/catch so that render errors are not catched.
  yield put({
    type: EXAMPLES_FIRSTHIT_SUCCESS,
    data: res,
  });
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchFirsthit() {
  yield takeLatest(EXAMPLES_FIRSTHIT_BEGIN, doFirsthit);
}

// Redux reducer
export function reducer(state, action) {
  switch (action.type) {
    case EXAMPLES_FIRSTHIT_BEGIN:
      return {
        ...state,
        firsthitPending: true,
        firsthitError: null,
      };

    case EXAMPLES_FIRSTHIT_SUCCESS:
      return {
        ...state,
        firsthitPending: false,
        firsthitError: null,
      };

    case EXAMPLES_FIRSTHIT_FAILURE:
      return {
        ...state,
        firsthitPending: false,
        firsthitError: action.data.error,
      };

    case EXAMPLES_FIRSTHIT_DISMISS_ERROR:
      return {
        ...state,
        firsthitError: null,
      };

    default:
      return state;
  }
}
