import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_GET_LIST_OF_INVOICES_BEGIN,
  HOME_GET_LIST_OF_INVOICES_SUCCESS,
  HOME_GET_LIST_OF_INVOICES_FAILURE,
  HOME_GET_LIST_OF_INVOICES_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  getListOfInvoices,
  dismissGetListOfInvoicesError,
  doGetListOfInvoices,
  reducer,
} from 'src/features/home/redux/getListOfInvoices';

describe('home/redux/getListOfInvoices', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // redux action tests
  it('correct action by getListOfInvoices', () => {
    expect(getListOfInvoices()).to.have.property('type', HOME_GET_LIST_OF_INVOICES_BEGIN);
  });

  it('returns correct action by dismissGetListOfInvoicesError', () => {
    expect(dismissGetListOfInvoicesError()).to.have.property('type', HOME_GET_LIST_OF_INVOICES_DISMISS_ERROR);
  });

  // saga tests
  const generator = doGetListOfInvoices();

  it('calls delay when receives a begin action', () => {
    // Delay is just a sample, this should be replaced by real sync request.
    expect(generator.next().value).to.deep.equal(call(delay, 20));
  });

  it('dispatches HOME_GET_LIST_OF_INVOICES_SUCCESS action when succeeded', () => {
    expect(generator.next('something').value).to.deep.equal(put({
      type: HOME_GET_LIST_OF_INVOICES_SUCCESS,
      data: 'something',
    }));
  });

  it('dispatches HOME_GET_LIST_OF_INVOICES_FAILURE action when failed', () => {
    const generatorForError = doGetListOfInvoices();
    generatorForError.next(); // call delay(20)
    const err = new Error('errored');
    expect(generatorForError.throw(err).value).to.deep.equal(put({
      type: HOME_GET_LIST_OF_INVOICES_FAILURE,
      data: { error: err },
    }));
  });

  it('returns done when finished', () => {
    expect(generator.next()).to.deep.equal({ done: true, value: undefined });
  });

  // reducer tests
  it('handles action type HOME_GET_LIST_OF_INVOICES_BEGIN correctly', () => {
    const prevState = { getListOfInvoicesPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_LIST_OF_INVOICES_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getListOfInvoicesPending).to.be.true;
  });

  it('handles action type HOME_GET_LIST_OF_INVOICES_SUCCESS correctly', () => {
    const prevState = { getListOfInvoicesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_LIST_OF_INVOICES_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getListOfInvoicesPending).to.be.false;
  });

  it('handles action type HOME_GET_LIST_OF_INVOICES_FAILURE correctly', () => {
    const prevState = { getListOfInvoicesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_LIST_OF_INVOICES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getListOfInvoicesPending).to.be.false;
    expect(state.getListOfInvoicesError).to.exist;
  });

  it('handles action type HOME_GET_LIST_OF_INVOICES_DISMISS_ERROR correctly', () => {
    const prevState = { getListOfInvoicesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_LIST_OF_INVOICES_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getListOfInvoicesError).to.be.null;
  });
});