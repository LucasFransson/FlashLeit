import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Card from './components/Card/Card';
import './App.css';
import '../public/css/style.css';
import HomePage from './pages/HomePage';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<HomePage></HomePage>
			{/* <Card></Card> */}
		</>
	);
}

export default App;
