// import React, { ComponentType, Suspense, useState, lazy } from 'react'; //TODO: Remove, only for testing loading state
import React, { Suspense, useState, lazy } from 'react';
import LoadingIcon from './components/LoadingIcon';

import './App.css';
import '../public/css/style.css';
import HomePage from './pages/HomePage';

// const LazyLoadedComponent: ComponentType = lazy(
// 	//TODO: Remove, only for testing loading state
// 	() =>
// 		new Promise<any>((resolve) =>
// 			setTimeout(() => {
// 				import('./components/LazyLoadedComponent').then((module) =>
// 					resolve({ default: module.default })
// 				);
// 			}, 3000)
// 		)
// );

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<Suspense fallback={<LoadingIcon />}>
				<HomePage></HomePage>
				{/* <Card></Card> */}
				{/* //TODO: Remove, only for testing loading state */}
				{/* <LazyLoadedComponent /> */}
			</Suspense>
		</div>
	);
}

export default App;
