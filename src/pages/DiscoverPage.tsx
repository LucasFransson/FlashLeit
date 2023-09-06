import { useState } from 'react';
import SearchBar from '../components/Searchbar/Searchbar';
import CardGrid from '../components/CardGrid/CardGrid';
import useFetch from '../hooks/useFetch';
import CardCollection from '../components/CardCollection/CardCollection';

function DiscoverPage() {
	const [searchTerm, setSearchTerm] = useState('');
	// const collections =
	// 	useFetch(
	// 		'https://flashleit.azure-api.net/api/collections',
	// 		[] as Array<any>
	// 	) || [];

	const {
		data: collections,
		loading,
		error,
	} = useFetch(
		'https://flashleit.azure-api.net/api/collections',
		[] as Array<any>
	);

	console.log(collections);

	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error: {error.message}</div>;
	}
	// const filteredCollections = collections.filter((c) =>
	// 	c.name.toLowerCase().includes(searchTerm.toLowerCase())
	// );

	const filteredCollections = Array.isArray(collections)
		? collections.filter((c) =>
				c.name.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: [];
	return (
		<>
			<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<CardGrid items={filteredCollections} Component={CardCollection} />
		</>
	);
}

export default DiscoverPage;

// const burgers = useFetch('http://localhost:7000/burgers', []);
// 	const filteredBurgers = burgers.filter((burger) =>
// 		burger.name.toLowerCase().includes(searchTerm.toLowerCase())
// 	);

// 	return (
// 		<>
// 			<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
// 			<CardGrid
// 				items={filteredBurgers}
// 				Component={MenuItemCard}
// 				linkPrefix="menu"
// 			/>
// 		</>
// 	);
