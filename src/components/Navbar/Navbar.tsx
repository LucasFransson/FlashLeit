import { Link } from "react-router-dom";
import { useEffect } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { useDispatch } from "react-redux";
import { setUserIdFromToken } from "../../redux/userIdSlice";

function Navbar() {
	const { instance } = useMsal();
	const dispatch = useDispatch();

	useEffect(() => {
		const account = instance.getAllAccounts()[0];

		if (account != null) {
			dispatch(setUserIdFromToken(account.idToken));
		}
	});

	const Login = async () => {
		try {
			await instance.loginRedirect();
		} catch (error) {
			console.error(error);
		}
	};
	const Logout = async () => {
		try {
			await instance.logoutRedirect();
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

					<Link to={'/discover'} className=" navbar__item-link">

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
					<Link to={"/userpage"} className="navbar__item-link">
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
