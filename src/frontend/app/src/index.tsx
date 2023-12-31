import React from 'react';
import ReactDOM from 'react-dom/client';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { studioTheme } from "./ui-components";

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={studioTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
