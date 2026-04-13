import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders app title', () => {
    const { getByText } = render(<App />);
    expect(getByText('Ingredient Checker App')).toBeTruthy();
  });
});
