import React from 'react';
import { render } from '@testing-library/react-native';
import RiskBadge from '../components/RiskBadge';

describe('RiskBadge', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<RiskBadge />);
    expect(toJSON()).toBeTruthy();
  });
});
