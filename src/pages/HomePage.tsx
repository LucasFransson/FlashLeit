import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
	AuthenticatedTemplate,
	UnauthenticatedTemplate,
	useMsal,
} from '@azure/msal-react';

function HomePage() {
	// TODO: Refactor login/logout to login button component
	const { instance } = useMsal();
	//const [idToken, setIdToken] = useState('');

	const Login = async () => {
		try {
			await instance.loginRedirect();
			// let { idToken } = await instance.loginRedirect();
			//setIdToken(idToken);
		} catch (error) {
			console.error(error);
		}
	};
	const Logout = async () => {
		try {
			await instance.logoutPopup();
			//setIdToken('');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="home-page">
				<section className="home-page__section">Section</section>
				<main className="home-page__main">Main</main>
				<aside className="home-page__aside"></aside>
			</div>
		</>
	);
}

export default HomePage;
