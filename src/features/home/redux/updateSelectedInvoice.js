// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_UPDATE_SELECTED_INVOICE,
} from './constants';

export function updateSelectedInvoice(paramselectedinvoice) {
  return {
    type: HOME_UPDATE_SELECTED_INVOICE,
    paramselectedinvoice:paramselectedinvoice
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_UPDATE_SELECTED_INVOICE:
      var selectedInvoice=action.paramselectedinvoice;
      return {
        ...state,
        selectedInvoice,
      };

    default:
      return state;
  }
}
