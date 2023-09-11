import { useState, useEffect } from 'react';
import SearchBar from '../components/Searchbar/Searchbar';
import CardGrid from '../components/CardGrid/CardGrid';
import useFetch from '../hooks/useFetch';
import CardCollection from '../components/CardCollection/CardCollection';
import CollectionPreview from '../components/CollectionPreview/CollectionPreview';
import { getRandomColorClass } from '../utils/getRandomColorClass';

function DiscoverPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [coloredCollections, setColoredCollections] = useState<any[]>([]);

	const {
		data: collections,
		loading,
		error,
	} = useFetch(
		'https://flashleit.azure-api.net/api/collections',
		[] as Array<any>
	);

	console.log(collections);

	useEffect(() => {
		if (collections && collections.length > 0) {
			// Assign a random color class to each collection
			const processedData = collections.map((item: any) => ({
				...item,
				colorClass: getRandomColorClass(),
			}));
			setColoredCollections(processedData);
		}
	}, [collections]);

	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error: {error.message}</div>;
	}

	// const filteredCollections = Array.isArray(collections)
	// 	? collections.filter((c) =>
	// 			c.title.toLowerCase().includes(searchTerm.toLowerCase())
	// 	  )
	// 	: [];
	const filteredCollections = Array.isArray(coloredCollections)
		? coloredCollections.filter((c) =>
				c.title.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: [];

	return (
		<div className="discover-page">
			<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			{/* <CardGrid items={filteredCollections} Component={CollectionPreview} /> */}
			<CardGrid
				items={filteredCollections}
				Component={CollectionPreview}
				linkPrefix="collection"
			/>
		</div>
	);
}

export default DiscoverPage;

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
