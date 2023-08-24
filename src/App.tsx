//import React, { ComponentType, Suspense, useState, lazy } from 'react'; //TODO: Remove, only for testing loading state
import React, { Suspense, useState, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesConfig from './utils/RoutesConfig';
import LoadingIcon from './components/LoadingIcon';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import './App.css';
import '../public/css/style.css';

function App() {
	return (
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
