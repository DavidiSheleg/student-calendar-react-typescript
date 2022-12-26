import React from 'react';
import { render, screen } from '../utils/test-utils';
import { LoginPage } from '../pages/guest/LoginPage';
import '@testing-library/jest-dom';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Login Page', () => {
  test('Should be render', () => {
    render(<LoginPage />);
    const headerText = screen.getByText(/Sign in/i, { selector: 'h1' });
    const submitBtn = screen.getByText(/Sign in/i, { selector: 'button' });
    const dontHaveUserLink = screen.getByText("Don't have an account? Sign Up", { selector: 'a' });
    const inputs = screen.getByRole("textbox");
    expect(headerText).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(dontHaveUserLink).toBeInTheDocument();
    expect(inputs).toHaveValue('');
  });
});
