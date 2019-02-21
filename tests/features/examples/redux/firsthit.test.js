import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
  EXAMPLES_FIRSTHIT_BEGIN,
  EXAMPLES_FIRSTHIT_SUCCESS,
  EXAMPLES_FIRSTHIT_FAILURE,
  EXAMPLES_FIRSTHIT_DISMISS_ERROR,
} from 'src/features/examples/redux/constants';

import {
  firsthit,
  dismissFirsthitError,
  doFirsthit,
  reducer,
} from 'src/features/examples/redux/firsthit';

describe('examples/redux/firsthit', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // redux action tests
  it('correct action by firsthit', () => {
    expect(firsthit()).to.have.property('type', EXAMPLES_FIRSTHIT_BEGIN);
  });

  it('returns correct action by dismissFirsthitError', () => {
    expect(dismissFirsthitError()).to.have.property('type', EXAMPLES_FIRSTHIT_DISMISS_ERROR);
  });

  // saga tests
  const generator = doFirsthit();

  it('calls delay when receives a begin action', () => {
    // Delay is just a sample, this should be replaced by real sync request.
    expect(generator.next().value).to.deep.equal(call(delay, 20));
  });

  it('dispatches EXAMPLES_FIRSTHIT_SUCCESS action when succeeded', () => {
    expect(generator.next('something').value).to.deep.equal(put({
      type: EXAMPLES_FIRSTHIT_SUCCESS,
      data: 'something',
    }));
  });

  it('dispatches EXAMPLES_FIRSTHIT_FAILURE action when failed', () => {
    const generatorForError = doFirsthit();
    generatorForError.next(); // call delay(20)
    const err = new Error('errored');
    expect(generatorForError.throw(err).value).to.deep.equal(put({
      type: EXAMPLES_FIRSTHIT_FAILURE,
      data: { error: err },
    }));
  });

  it('returns done when finished', () => {
    expect(generator.next()).to.deep.equal({ done: true, value: undefined });
  });

  // reducer tests
  it('handles action type EXAMPLES_FIRSTHIT_BEGIN correctly', () => {
    const prevState = { firsthitPending: false };
    const state = reducer(
      prevState,
      { type: EXAMPLES_FIRSTHIT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.firsthitPending).to.be.true;
  });

  it('handles action type EXAMPLES_FIRSTHIT_SUCCESS correctly', () => {
    const prevState = { firsthitPending: true };
    const state = reducer(
      prevState,
      { type: EXAMPLES_FIRSTHIT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.firsthitPending).to.be.false;
  });

  it('handles action type EXAMPLES_FIRSTHIT_FAILURE correctly', () => {
    const prevState = { firsthitPending: true };
    const state = reducer(
      prevState,
      { type: EXAMPLES_FIRSTHIT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.firsthitPending).to.be.false;
    expect(state.firsthitError).to.exist;
  });

  it('handles action type EXAMPLES_FIRSTHIT_DISMISS_ERROR correctly', () => {
    const prevState = { firsthitError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: EXAMPLES_FIRSTHIT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.firsthitError).to.be.null;
  });
});