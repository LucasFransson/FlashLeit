import React from 'react';
import useFetch from '../hooks/useFetch';
import CardCollection from '../components/CardCollection/CardCollection';
import CardCollectionTypes from '../types/CardCollectionTypes';
import LoadingIcon from '../components/LoadingIcon';
import { Link } from 'react-router-dom';

function CardSetPage() {
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
			{cardCollection && <CardCollection {...cardCollection} />}
		</div>
	);
}

export default CardSetPage;
