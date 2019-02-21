// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_DO_LOGIC_PROCESS,
} from './constants';

export function doLogicProcess() {
  return {
    type: HOME_DO_LOGIC_PROCESS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_DO_LOGIC_PROCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
}
