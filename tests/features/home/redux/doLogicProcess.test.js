import {
  HOME_DO_LOGIC_PROCESS,
} from '../../../../src/features/home/redux/constants';

import {
  doLogicProcess,
  reducer,
} from '../../../../src/features/home/redux/doLogicProcess';

describe('home/redux/doLogicProcess', () => {
  it('returns correct action by doLogicProcess', () => {
    expect(doLogicProcess()).toHaveProperty('type', HOME_DO_LOGIC_PROCESS);
  });

  it('handles action type HOME_DO_LOGIC_PROCESS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_DO_LOGIC_PROCESS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
