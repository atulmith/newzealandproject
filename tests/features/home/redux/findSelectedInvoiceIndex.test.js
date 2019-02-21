import {
  HOME_FIND_SELECTED_INVOICE_INDEX,
} from '../../../../src/features/home/redux/constants';

import {
  findSelectedInvoiceIndex,
  reducer,
} from '../../../../src/features/home/redux/findSelectedInvoiceIndex';

describe('home/redux/findSelectedInvoiceIndex', () => {
  it('returns correct action by findSelectedInvoiceIndex', () => {
    expect(findSelectedInvoiceIndex()).toHaveProperty('type', HOME_FIND_SELECTED_INVOICE_INDEX);
  });

  it('handles action type HOME_FIND_SELECTED_INVOICE_INDEX correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_FIND_SELECTED_INVOICE_INDEX }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
