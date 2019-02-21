// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_FIND_SELECTED_INVOICE_INDEX,
} from './constants';

export function findSelectedInvoiceIndex() {
  return {
    type: HOME_FIND_SELECTED_INVOICE_INDEX,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_FIND_SELECTED_INVOICE_INDEX:
    let selectedIndex=state.invoices.indexOf(state.selectedInvoice);
      return {
        ...state,
        selectedIndex,
      };

    default:
      return state;
  }
}
