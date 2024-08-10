import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import reportWebVitals from './reportWebVitals.js';

const msalInstance = new PublicClientApplication(msalConfig);


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="512893617242-atclod2q3nji2a2v52sis17172f87pfr.apps.googleusercontent.com">
    <MsalProvider instance={msalInstance}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </MsalProvider>
  </GoogleOAuthProvider>
)


reportWebVitals();