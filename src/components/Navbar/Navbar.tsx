import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";

function Navbar() {
	// TODO: Refactor login/logout to login button component
	const { instance } = useMsal();
	const [idToken, setIdToken] = useState("");

	const Login = async () => {
		try {
			let { idToken } = await instance.loginRedirect();
			setIdToken(idToken);
		} catch (error) {
			console.error(error);
		}
	};
	const Logout = async () => {
		try {
			await instance.logoutRedirect();
			setIdToken('');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="navbar">
			<div className="navbar__item navbar__item--0">
				<Link to={"/"}>
					<p className="navbar__item-link">
						<span className="header-logo-text--main">FLASH</span>
						<span className="header-logo-text--sub">LEIT</span>
					</p>
				</Link>
			</div>
			{/* Logged in */}
			<AuthenticatedTemplate>
				<div className="navbar__item navbar__item--1 ">
					<Link to={"/collection"} className=" navbar__item-link">
						Discover
					</Link>
				</div>
				<div className="navbar__item navbar__item--2">
					<Link to={"/edit"} className=" navbar__item-link">
						Create Cards
					</Link>
				</div>
				<div className="navbar__item navbar__item--3">
					<Link to={"/collections"} className=" navbar__item-link">
						Collections
					</Link>
				</div>
				<div className="navbar__item navbar__item--5">
					<Link to={'/userpage'} className="navbar__item-link">
						User page
					</Link>
				</div>
				<div className="navbar__item navbar__item--5">
					<button type="button" onClick={() => Logout()} className="btn-login">
						Logout
					</button>
				</div>
			</AuthenticatedTemplate>
			{/* Not Logged in */}
			<UnauthenticatedTemplate>
				<div className="navbar__item navbar__item--5">
					<button type="button" onClick={() => Login()} className="btn-login">
						Login
					</button>
				</div>
			</UnauthenticatedTemplate>
		</div>
	);
}

export default Navbar;
