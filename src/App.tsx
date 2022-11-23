import './App.css';
import { RouterProvider } from 'react-router-dom';
import { useCustomRoutes } from './hooks/useCustomRoutes';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { updateUser } from './app/slices/authSlice';
import { closeSnackbar } from './app/slices/snackbarSlice';
import { Alert, Snackbar } from '@mui/material';
import { jwtIsExpired } from './utils/jwtIsExpired';

function App() {

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { snackbarIsOpen, snackbarMessage, snackbarType } = useAppSelector((state) => state.snackbar);
  const localStorageUser = localStorage.getItem('user');

  if(localStorageUser && !user.id) {
    const jsonUserFromLS = JSON.parse(localStorageUser);
    const { id, access_token } = jsonUserFromLS;
    if(!jwtIsExpired(access_token)) {
      dispatch(updateUser({
        user: {
          id,
          access_token
        }
      }));
    }
  }

  const isGuest = user.id ? false : true;

  const { router } = useCustomRoutes(isGuest);

  return (
    <ThemeProvider theme={theme}>
      <Snackbar open={snackbarIsOpen} autoHideDuration={3000} onClose={() => dispatch(closeSnackbar())}>
        <Alert onClose={() => dispatch(closeSnackbar())} severity={snackbarType} sx={{ width: '100%' }}>
          { snackbarMessage }
        </Alert>
      </Snackbar>
      <RouterProvider router={router} />
    </ThemeProvider>

  );
}

export default App;
