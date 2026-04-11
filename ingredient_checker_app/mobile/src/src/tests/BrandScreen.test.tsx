import React from 'react';
import { render } from '@testing-library/react-native';
import BrandScreen from '../screens/BrandScreen';

describe('BrandScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<BrandScreen />);
    expect(toJSON()).toBeTruthy();
  });
});
