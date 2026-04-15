import React from 'react';
import { render } from '@testing-library/react-native';
import ConfidenceMeter from '../components/ConfidenceMeter';

describe('ConfidenceMeter', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<ConfidenceMeter />);
    expect(toJSON()).toBeTruthy();
  });
});




