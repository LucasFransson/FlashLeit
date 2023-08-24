import { Link } from 'react-router-dom';
function HomePage() {
	return (
		<>
			<div className="home-page">
				<h1>HomePage</h1>
				<Link to={'/about'}>About</Link>
				<Link to={'/cardset'}>Cards</Link>
				<Link to={'/edit'}>Edit</Link>
			</div>
		</>
	);
}

export default HomePage;
