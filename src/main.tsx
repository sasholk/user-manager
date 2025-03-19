import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './app/App';
import { store } from './app/store';
import theme from './app/theme';

const router = createBrowserRouter([{ path: '/', element: <App /> }]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
