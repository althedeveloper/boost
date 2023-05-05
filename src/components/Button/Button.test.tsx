import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Button from './Button';

describe('Button component', () => {
  it('renders the correct text', () => {
    render(
      <Button text="Click me!" clickFunction={() => {}} />
      );
    expect(
      screen.getByText('Click me!')).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const handleClick = jest.fn();
    render(
      <Button text="Click me!" clickFunction={handleClick} />
    );
    fireEvent.click(screen.getByText('Click me!'));
    expect(handleClick).toHaveBeenCalled();
  });
});