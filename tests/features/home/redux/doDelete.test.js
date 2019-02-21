import {
  HOME_DO_DELETE,
} from '../../../../src/features/home/redux/constants';

import {
  doDelete,
  reducer,
} from '../../../../src/features/home/redux/doDelete';

describe('home/redux/doDelete', () => {
  it('returns correct action by doDelete', () => {
    expect(doDelete()).toHaveProperty('type', HOME_DO_DELETE);
  });

  it('handles action type HOME_DO_DELETE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_DO_DELETE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
