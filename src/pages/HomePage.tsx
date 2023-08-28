import { Link } from 'react-router-dom';
function HomePage() {
	return (
		<>
			<div className="home-page">
				<section className="home-page__section">Section</section>
				<main className="home-page__main">Main</main>
				<aside className="home-page__aside">
					Aside<Link to={'/about'}>About</Link>
					<Link to={'/cardset'}>Cards</Link>
					<Link to={'/edit'}>Edit</Link>
				</aside>
			</div>
		</>
	);
}

export default HomePage;
