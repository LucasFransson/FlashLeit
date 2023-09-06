import { Routes, Route } from 'react-router-dom';
import CardSetPage from '../pages/CollectionPage';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import EditCardPage from '../pages/EditCardPage';
import UserCollectionsPage from '../pages/UserCollectionsPage';
import UserPage from '../pages/UserPage';

function RoutesConfig() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/about" element={<AboutPage />} />
			<Route path="/collection" element={<CardSetPage />} />
			<Route path="/edit" element={<EditCardPage />} />
			<Route path="/collections" element={<UserCollectionsPage />} />
			<Route path="/userpage" element={<UserPage />} />
		</Routes>
	);
}

export default RoutesConfig;
