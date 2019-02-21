// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_DO_DELETE,
} from './constants';

export function doDelete() {
  return {
    type: HOME_DO_DELETE,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_DO_DELETE:
    // let index = this.findSelectedInvoiceIndex();
    let index = state.selectedIndex;
    let invoices=state.invoices.filter((val,i) => i !== index);
    let selectedInvoice= null,
            invoice= null,
            displayDialog= false;
        // this.setState({
        //     invoices: this.state.invoices.filter((val,i) => i !== index),
        //     selectedInvoice: null,
        //     invoice: null,
        //     displayDialog: false});
      return {
        ...state,
        invoices,
        selectedInvoice,
        invoice,
        displayDialog,
      };

    default:
      return state;
  }
}
