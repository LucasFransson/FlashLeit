import React from 'react';
import ReactDOM from 'react-dom/client';
import { PublicClientApplication } from '@azure/msal-browser';
import App from './App.tsx';
import { msalConfig } from './configs/msalConfig';
import { MsalProvider } from '@azure/msal-react';
import './index.css';

const msalInstance = new PublicClientApplication(msalConfig);

// if (window.location.hash !== '') {
// 	console.log('hash found' + window.location.hash);
// } else
{
	ReactDOM.createRoot(document.getElementById('root')!).render(
	
	
			<App instance={msalInstance} />
	);
}
