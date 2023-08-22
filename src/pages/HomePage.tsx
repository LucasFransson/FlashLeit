import useFetch from '../hooks/useFetch';
import CardCollection from '../components/CardCollection/CardCollection';
import CardCollectionTypes from '../types/CardCollectionTypes';
import LoadingIcon from '../components/LoadingIcon';
function HomePage() {
	// Try to Fetch Card Collection from the server
	const { data, loading, error } = useFetch<CardCollectionTypes[]>(
		'http://localhost:7000/CardCollections',
		[]
	);

	let cardCollection: CardCollectionTypes | null = null;

	if (!loading && data) {
		cardCollection = data[0];
	}
	if (loading) {
		return <LoadingIcon />;
	}
	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return <>{cardCollection && <CardCollection {...cardCollection} />}</>;
}

// const HomePage = () => {
// 	// Fetch Card Collection from the server
// 	const cardCollections: CardCollectionTypes[] = useFetch<
// 		CardCollectionTypes[]
// 	>('http://localhost:7000/CardCollections', []);
// 	// console.log('Fetched Card Collections:', cardCollections);

// 	const cardCollection = cardCollections[0];

// 	return <>{cardCollection && <CardCollection {...cardCollection} />}</>;
// };

export default HomePage;
