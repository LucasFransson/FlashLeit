import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";

function HomePage() {
	// TODO: Refactor login/logout to login button component
	const { instance } = useMsal();
	const [idToken, setIdToken] = useState("");

	const Login = async () => {
		try {
			let { idToken } = await instance.loginPopup();
			setIdToken(idToken);
		} catch (error) {
			console.error(error);
		}
	};
	const Logout = async () => {
		try {
			await instance.logoutPopup();
			setIdToken("");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="home-page">
				<section className="home-page__section">Section</section>
				<main className="home-page__main">Main</main>
				<aside className="home-page__aside">
					Aside<Link to={"/about"}>About</Link>
					<Link to={"/cardset"}>Cards</Link>
					<Link to={"/edit"}>Edit</Link>
					<AuthenticatedTemplate>
						<p>You are authenticated</p>
						<button type="button" onClick={() => Logout()}>
							Logout
						</button>
					</AuthenticatedTemplate>
					<UnauthenticatedTemplate>
						<p>You are not authenticated!</p>
						<button type="button" onClick={() => Login()}>
							Login
						</button>
					</UnauthenticatedTemplate>
				</aside>
			</div>
		</>
	);
}

export default HomePage;
