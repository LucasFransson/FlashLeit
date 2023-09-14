import { Link } from "react-router-dom";
import { useEffect } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { useDispatch } from "react-redux";
import { setUserIdFromToken } from "../../redux/userIdSlice";
import { setIdToken } from "../../redux/idTokenSlice";

function Navbar() {
	const { instance } = useMsal();
	const dispatch = useDispatch();

	const IdTokenHandler = async () => {
		const account = instance.getAllAccounts()[0];

		if (account == null) return;

		if (account.idToken == undefined) {
			const silentRequest = {
				scopes: ["openid"],
				account: account,
			};

			await instance.initialize();
			await instance
				.acquireTokenSilent(silentRequest)
				.then(res => {
					dispatch(setUserIdFromToken(res.idToken));
					dispatch(setIdToken(res.idToken));
				})
				.catch(error => console.log(error));
			return;
		}

		dispatch(setUserIdFromToken(account.idToken));
		dispatch(setIdToken(account.idToken));
	};

	useEffect(() => {
		IdTokenHandler();
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
						<span className="header-logo-text--main text-with-stroke">FLASH</span>
						<span className="header-logo-text--sub text-with-stroke">LEIT</span>
					</p>
				</Link>
			</div>
			{/* Logged in */}
			<AuthenticatedTemplate>
				<div className="navbar__item navbar__item--1 text-with-stroke">
					<Link to={"/discover"} className=" navbar__item-link">
						Discover
					</Link>
				</div>
				<div className="navbar__item navbar__item--2 text-with-stroke">
					<Link to={"/edit"} className=" navbar__item-link">
						Create Cards
					</Link>
				</div>
				<div className="navbar__item navbar__item--3 text-with-stroke">
					<Link to={"/collections"} className=" navbar__item-link">
						Collections
					</Link>
				</div>
				<div className="navbar__item navbar__item--4 text-with-stroke">
					<Link to={"/userpage"} className="navbar__item-link">
						User page
					</Link>
				</div>
				<div className="navbar__item navbar__item--5 text-with-stroke">
					<button type="button" onClick={() => Logout()} className="navbar__item-link btn-login text-with-stroke">
						Logout
					</button>
				</div>
			</AuthenticatedTemplate>
			{/* Not Logged in */}
			<UnauthenticatedTemplate>
				<div className="navbar__item navbar__item--5">
					<button type="button" onClick={() => Login()} className="navbar__item-link btn-login">
						Login
					</button>
				</div>
			</UnauthenticatedTemplate>
		</div>
	);
}

export default Navbar;
