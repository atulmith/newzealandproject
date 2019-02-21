import {
  HOME_UPDATE_INVOICE,
} from '../../../../src/features/home/redux/constants';

import {
  updateInvoice,
  reducer,
} from '../../../../src/features/home/redux/updateInvoice';

describe('home/redux/updateInvoice', () => {
  it('returns correct action by updateInvoice', () => {
    expect(updateInvoice()).toHaveProperty('type', HOME_UPDATE_INVOICE);
  });

  it('handles action type HOME_UPDATE_INVOICE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_INVOICE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
