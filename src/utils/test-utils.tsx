import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

// Import your store
import { store } from '../app/store';
import { ThemeProvider } from '@mui/material';
import { theme } from '../theme';

const Wrapper: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => (
    <Provider store={store}>
        { children }
    </Provider>
);

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };