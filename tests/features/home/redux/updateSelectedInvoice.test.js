import {
  HOME_UPDATE_SELECTED_INVOICE,
} from '../../../../src/features/home/redux/constants';

import {
  updateSelectedInvoice,
  reducer,
} from '../../../../src/features/home/redux/updateSelectedInvoice';

describe('home/redux/updateSelectedInvoice', () => {
  it('returns correct action by updateSelectedInvoice', () => {
    expect(updateSelectedInvoice()).toHaveProperty('type', HOME_UPDATE_SELECTED_INVOICE);
  });

  it('handles action type HOME_UPDATE_SELECTED_INVOICE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_SELECTED_INVOICE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
