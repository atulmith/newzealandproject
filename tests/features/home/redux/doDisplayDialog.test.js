import {
  HOME_DO_DISPLAY_DIALOG,
} from '../../../../src/features/home/redux/constants';

import {
  doDisplayDialog,
  reducer,
} from '../../../../src/features/home/redux/doDisplayDialog';

describe('home/redux/doDisplayDialog', () => {
  it('returns correct action by doDisplayDialog', () => {
    expect(doDisplayDialog()).toHaveProperty('type', HOME_DO_DISPLAY_DIALOG);
  });

  it('handles action type HOME_DO_DISPLAY_DIALOG correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_DO_DISPLAY_DIALOG }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
