import React from 'react';
import { shallow } from 'enzyme';
import { ReceivablesPanel } from '../../../src/features/home/ReceivablesPanel';

describe('home/ReceivablesPanel', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ReceivablesPanel {...props} />
    );

    expect(
      renderedComponent.find('.home-receivables-panel').length
    ).toBe(1);
  });
});
