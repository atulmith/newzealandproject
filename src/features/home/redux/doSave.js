// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_DO_SAVE,
} from './constants';

export function doSave(paraminvoice,paramnewInvoice) {
  return {
    type: HOME_DO_SAVE,
    paraminvoice:paraminvoice,
    paramnewInvoice:paramnewInvoice,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_DO_SAVE:
        let locinvoice=action.paraminvoice;
        let locnewInvoice=action.paramnewInvoice;

        let invoices = [...state.invoices];
        if(locnewInvoice)
            invoices.push(locinvoice);
        else
            invoices[state.selectedIndex] = locinvoice;

        // this.setState({invoices:invoices, selectedInvoice:null, invoice: null, displayDialog:false});
        var selectedInvoice=null;
        var invoice=null;
        var displayDialog=null;
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
