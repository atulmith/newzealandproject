import initialState from './initialState';
import { reducer as getListOfInvoicesReducer } from './getListOfInvoices';
import { reducer as doLogicProcessReducer } from './doLogicProcess';
import { reducer as doSaveReducer } from './doSave';
import { reducer as findSelectedInvoiceIndexReducer } from './findSelectedInvoiceIndex';
import { reducer as updateSelectedInvoiceReducer } from './updateSelectedInvoice';
import { reducer as doDeleteReducer } from './doDelete';
import { reducer as updateInvoiceReducer } from './updateInvoice';
import { reducer as doDisplayDialogReducer } from './doDisplayDialog';

const reducers = [
  getListOfInvoicesReducer,
  doLogicProcessReducer,
  doSaveReducer,
  findSelectedInvoiceIndexReducer,
  updateSelectedInvoiceReducer,
  doDeleteReducer,
  updateInvoiceReducer,
  doDisplayDialogReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
