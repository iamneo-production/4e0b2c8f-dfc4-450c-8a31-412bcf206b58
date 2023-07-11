import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MantineProvider } from '@mantine/core';
import store from "./store";
import { Provider } from 'react-redux';
import {Notifications} from "@mantine/notifications";
import { StoreProvider } from 'easy-peasy';
import DebtStore from './components/debt/DebtStore';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
      <StoreProvider store={DebtStore}>

          <MantineProvider withGlobalStyles withNormalizeCSS
          >
              <Notifications />
              <App />
          </MantineProvider>
          </StoreProvider>
      </Provider>
  </React.StrictMode>
);
