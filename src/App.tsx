//import React, { ComponentType, Suspense, useState, lazy } from 'react'; //TODO: Remove, only for testing loading state
import React, { Suspense, useState, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import RoutesConfig from './configs/RoutesConfig';
import LoadingIcon from './components/LoadingIcon/LoadingIcon';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

import './App.css';
import '../public/css/style.css';

function App({ instance }) {
	//function App() {
	return (
		<MsalProvider instance={instance}>
			<Router>
				<div className="app">
					<Header />
					<Navbar />
					<Suspense fallback={<LoadingIcon />}>
						<RoutesConfig />
						{/* //TODO: Remove, only for testing loading state */}
						{/* <LazyLoadedComponent /> */}
					</Suspense>
					<Footer />
				</div>
			</Router>
		</MsalProvider>
	);
}

// LAZY LOADED COMPONENT FOR TESTING
// const LazyLoadedComponent: ComponentType = lazy(
// 	//TODO: Remove, only for testing loading state
// 	() =>
// 		new Promise<any>((resolve) =>
// 			setTimeout(() => {
// 				import('./components/LazyLoadedComponent').then((module) =>
// 					resolve({ default: module.default })
// 				);
// 			}, 10000)
// 		)
// );

export default App;
