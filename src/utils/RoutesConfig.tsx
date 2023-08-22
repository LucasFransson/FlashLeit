import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import About from '../pages/About';

function RoutesConfig() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/about" element={<About />} />
		</Routes>
	);
}

export default RoutesConfig;
