import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserByIdQuery } from '../redux/api/usersSlice';
import { RootState } from '../redux/store';
import {
	AuthenticatedTemplate,
	UnauthenticatedTemplate,
} from '@azure/msal-react';

function HomePage() {
	// This prevents calling the api with userId = null on page render. Sets to "false" when userId gets the value from ID-Token.
	const [skip, setSkip] = useState(true);
	// Gets the userId from the store (global state)
	const { userId } = useSelector((state: RootState) => state.userId);
	// Makes an api for the user if its not already in the cache
	const { data: authUser } = useGetUserByIdQuery(userId, { skip });

	useEffect(() => {
		if (userId != null) {
			setSkip(false);
		}
	}, [userId]);

	return (
		<>
			<div className="home-page">
				{/* <section className="home-page__section">Section</section> */}
				<main className="home-page__main">
					<div className="home-page__title">
						<h1 className="home-page__title--head">FLASHLEIT</h1>
						<h3 className="home-page__title--sub">
							Master your studies, one{' '}
							<span className="home-page__title--sub__span">Flash </span>at a
							time
						</h3>{' '}
						<button className="btn-cta">GET STARTED</button>
					</div>
				</main>
				{/* <aside className="home-page__aside"></aside> */}
			</div>
		</>
	);
}

export default HomePage;

{/* <AuthenticatedTemplate>
{
	Welcome,{' '}
						{authUser ? (
							<p>User from Store: {authUser[0].userName}</p>
						) : (
							<p>User data is not available.</p>
						)}
					</AuthenticatedTemplate>
					<UnauthenticatedTemplate>Woop</UnauthenticatedTemplate>
} */}
