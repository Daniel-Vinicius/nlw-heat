import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { AuthProvider } from './contexts/auth';

import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
