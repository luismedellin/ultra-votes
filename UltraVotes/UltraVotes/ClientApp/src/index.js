import React from 'react';
import ReactDOM from 'react-dom/client';
import { UltraVotesApp } from './UltraVotesApp';

import './styles.css'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <UltraVotesApp />
        </BrowserRouter>
    </React.StrictMode>
)
