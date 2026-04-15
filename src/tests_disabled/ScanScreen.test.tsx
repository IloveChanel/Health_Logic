import React from 'react';
import { render } from '@testing-library/react-native';
import ScanScreen from '../screens/ScanScreen';

describe('ScanScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<ScanScreen />);
    expect(toJSON()).toBeTruthy();
  });
});




