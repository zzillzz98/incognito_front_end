import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '../../testUtils';
import Login from '../../login';

describe('Login', () => {
  it('renders login page', () => {
    render(<Login />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();

    expect(screen.getByText('Sign Up?')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  it('empty inputs should provide error messages', () => {
    render(<Login />);

    fireEvent.click(screen.getByText('Log In'));

    expect(
      screen.getByText('Please enter a valid email address')
    ).toBeInTheDocument();
    expect(screen.getByText('Please enter your password')).toBeInTheDocument();
  });

  it('correct inputs should allow login', () => {
    render(<Login />);
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    fireEvent.change(emailInput, { target: { value: 'new@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    fireEvent.click(screen.getByText('Log In'));

    expect(screen.queryByText('Please enter a valid email address')).toBeNull();
    expect(screen.queryByText('Please enter your password')).toBeNull();
  });
});