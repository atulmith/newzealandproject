import {
  HOME_DO_SAVE,
} from '../../../../src/features/home/redux/constants';

import {
  doSave,
  reducer,
} from '../../../../src/features/home/redux/doSave';

describe('home/redux/doSave', () => {
  it('returns correct action by doSave', () => {
    expect(doSave()).toHaveProperty('type', HOME_DO_SAVE);
  });

  it('handles action type HOME_DO_SAVE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_DO_SAVE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
