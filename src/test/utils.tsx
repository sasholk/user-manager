// Jest configuration file
// This file is used to configure Jest before running tests
// It is used to set up the testing environment, such as setting up the DOM, setting up the testing framework, and configuring Jest.
// Jest configuration file is a JSON or JavaScript file that is used to configure Jest before running tests.
import { store } from '@/app/store';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

interface Options {
  route?: string;
  withRouter?: boolean;
  useMemoryRouter?: boolean;
}

export function customRender(
  ui: ReactNode,
  { route = '/', withRouter = true, useMemoryRouter = true }: Options = {},
) {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const Router = useMemoryRouter ? MemoryRouter : BrowserRouter;

    return (
      <Provider store={store}>
        {withRouter ? (
          <Router initialEntries={[route]}>{children}</Router>
        ) : (
          children
        )}
      </Provider>
    );
  };

  return render(ui, { wrapper: Wrapper });
}
