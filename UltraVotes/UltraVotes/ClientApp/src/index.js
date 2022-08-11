import React from 'react';
import ReactDOM from 'react-dom/client';
import { UltraVotesApp } from './UltraVotesApp';

import './styles.css'
import { BrowserRouter } from 'react-router-dom';

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from './auth'

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <BrowserRouter>
                <UltraVotesApp />
            </BrowserRouter>
        </MsalProvider>
    // </React.StrictMode>
)
