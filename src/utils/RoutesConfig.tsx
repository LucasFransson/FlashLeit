import { Routes, Route } from 'react-router-dom';
import CardSetPage from '../pages/CardSetPage';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import EditCardPage from '../pages/EditCardPage';

function RoutesConfig() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/about" element={<AboutPage />} />
			<Route path="/cardset" element={<CardSetPage />} />
			<Route path="/edit" element={<EditCardPage />} />
		</Routes>
	);
}

export default RoutesConfig;
