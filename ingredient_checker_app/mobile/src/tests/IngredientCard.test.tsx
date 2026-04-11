import React from 'react';
import { render } from '@testing-library/react-native';
import IngredientCard from '../components/IngredientCard';

describe('IngredientCard', () => {
  it('renders ingredient and risk level', () => {
    const ingredient = { ingredient: 'Salt', risk_level: 'safe' };
    const { getByText } = render(<IngredientCard ingredient={ingredient} />);
    expect(getByText('Salt')).toBeTruthy();
    expect(getByText('safe')).toBeTruthy();
  });
});
