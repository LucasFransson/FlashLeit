import React from 'react';
import useFetch from '../hooks/useFetch';
import CardCollection from '../components/CardCollection/CardCollection';
import CardCollectionTypes from '../types/CardCollectionTypes';
import LoadingIcon from '../components/LoadingIcon/LoadingIcon';
import { Link } from 'react-router-dom';
import CardList from '../components/CardList/CardList';

function CollectionPage() {
	//Try to Fetch Card Collection from the server
	// const { data, loading, error } = useFetch<CardCollectionTypes[]>(
	// 	'http://localhost:7000/CardCollections',
	// 	[
	// );

	const { data, loading, error } = useFetch<CardCollectionTypes[]>(
		// 'https://flashleit.azure-api.net/api/collections/1',
		`https://flashleit.azure-api.net/api/collections/64/user/2`,
		[]
	);

	let cardCollection: CardCollectionTypes | null = null;

	if (!loading && data) {
		cardCollection = data[0];
	}
	if (loading) {
		//TODO move loading down to ordinary return
		return (
			<div className="cardset-page">
				<LoadingIcon />;
			</div>
		);
	}
	if (error) {
		return <div>Error: {error.message}</div>;
	}
	return (
		<div className="cardset-page">
			{/* {cardCollection && <CardCollection {...cardCollection} />} */}
			<CardCollection flashCards={data.flashCards} name={data.title} />
			<CardList flashCards={data.flashCards} name={data.title} />
		</div>
	);
}

export default CollectionPage;
