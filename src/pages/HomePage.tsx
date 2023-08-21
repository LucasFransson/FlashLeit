import React from 'react';
import useFetch from '../hooks/useFetch';
import CardCollection from '../components/CardCollection/CardCollection';
import CardProps from '../types/CardTypes';
import CardCollectionTypes from '../types/CardCollectionTypes';

const HomePage = () => {
	const cardCollections: CardCollectionTypes[] = useFetch<
		CardCollectionTypes[]
	>('http://localhost:7000/CardCollections', []);

	const cards: CardProps[] =
		cardCollections.length > 0 ? cardCollections[0].Cards : [];

	return (
		<div>
			HomePage Top
			<CardCollection cards={cards} />
			HomePage Bottom
		</div>
	);
};

export default HomePage;
