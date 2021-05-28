import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Listurls from './Listurls';

describe('<Listurls />', () => {
  test('it should mount', () => {
    render(<Listurls />);
    
    const listurls = screen.getByTestId('Listurls');

    expect(listurls).toBeInTheDocument();
  });
});