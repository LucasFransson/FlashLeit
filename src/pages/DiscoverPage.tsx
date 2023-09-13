import { useState, useEffect } from "react";
import SearchBar from "../components/Searchbar/Searchbar";
import CardGrid from "../components/CardGrid/CardGrid";
import useFetch from "../hooks/useFetch";
import CardCollection from "../components/CardCollection/CardCollection";
import CollectionPreview from "../components/CollectionPreview/CollectionPreview";
import { getRandomColorClass } from "../utils/getRandomColorClass";
import ColorClassContext from "../context/ColorClassContext";
import { useGetAllCollectionsQuery } from "../redux/api/collectionsSlice";

function DiscoverPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [coloredCollections, setColoredCollections] = useState<any[]>([]);


	const { data: collections, isLoading, isError, error } = useGetAllCollectionsQuery();

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

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	const filteredCollections = Array.isArray(coloredCollections) ? coloredCollections.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase())) : [];
	const colorClass = getRandomColorClass();

	return (
		<div className="discover-page">
			<div className="discover-page__top">
				<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			</div>
			<div className="discover-page__bottom">
				<CardGrid items={filteredCollections} Component={CollectionPreview} linkPrefix="collection" />
			</div>
		</div>
	);
}

export default DiscoverPage;

// const filteredCollections = Array.isArray(collections)
// 	? collections.filter((c) =>
// 			c.title.toLowerCase().includes(searchTerm.toLowerCase())
// 	  )
// 	: [];

// import { useState, useEffect } from 'react';
// import SearchBar from '../components/Searchbar/Searchbar';
// import CardGrid from '../components/CardGrid/CardGrid';
// import useFetch from '../hooks/useFetch';
// import CardCollection from '../components/CardCollection/CardCollection';
// import CollectionPreview from '../components/CollectionPreview/CollectionPreview';
// import { getRandomColorClass } from '../utils/getRandomColorClass';
// import ColorClassContext from '../context/ColorClassContext';

// function DiscoverPage() {
// 	const [searchTerm, setSearchTerm] = useState('');
// 	// const [coloredCollections, setColoredCollections] = useState<any[]>([]);

// 	const {
// 		data: collections,
// 		loading,
// 		error,
// 	} = useFetch(
// 		'https://flashleit.azure-api.net/api/collections',
// 		[] as Array<any>
// 	);

// 	console.log(collections);

// 	// useEffect(() => {
// 	// 	if (collections && collections.length > 0) {
// 	// 		// Assign a random color class to each collection
// 	// 		const processedData = collections.map((item: any) => ({
// 	// 			...item,
// 	// 			colorClass: getRandomColorClass(),
// 	// 		}));
// 	// 		setColoredCollections(processedData);
// 	// 	}
// 	// }, [collections]);

// 	if (loading) {
// 		return <div>Loading...</div>;
// 	}
// 	if (error) {
// 		return <div>Error: {error.message}</div>;
// 	}

// 	const filteredCollections = Array.isArray(collections)
// 		? collections.filter((c) =>
// 				c.title.toLowerCase().includes(searchTerm.toLowerCase())
// 		  )
// 		: [];

// 	// const filteredCollections = Array.isArray(coloredCollections)
// 	// 	? coloredCollections.filter((c) =>
// 	// 			c.title.toLowerCase().includes(searchTerm.toLowerCase())
// 	// 	  )
// 	// 	: [];
// 	const colorClass = getRandomColorClass();

// 	return (
// 		<div className="discover-page">
// 			<ColorClassContext.Provider value={colorClass}>
// 				<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
// 				{/* <CardGrid items={filteredCollections} Component={CollectionPreview} /> */}
// 				<CardGrid
// 					items={filteredCollections}
// 					Component={CollectionPreview}
// 					linkPrefix="collection"
// 				/>
// 			</ColorClassContext.Provider>
// 		</div>
// 	);
// }

// export default DiscoverPage;
