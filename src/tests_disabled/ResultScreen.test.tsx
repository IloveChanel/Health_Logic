import React from 'react';
import { render } from '@testing-library/react-native';
import ResultScreen from '../screens/ResultScreen';

describe('ResultScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<ResultScreen />);
    expect(toJSON()).toBeTruthy();
  });
});




