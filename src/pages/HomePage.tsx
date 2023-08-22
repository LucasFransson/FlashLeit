import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import CardCollection from '../components/CardCollection/CardCollection';
import CardProps from '../types/CardTypes';
import CardCollectionTypes from '../types/CardCollectionTypes';

const HomePage = () => {
	// Fetch Card Collection from the server
	const cardCollections: CardCollectionTypes[] = useFetch<
		CardCollectionTypes[]
	>('http://localhost:7000/CardCollections', []);

	const name = cardCollections.length > 0 ? cardCollections[0].Name : '';
	// Extract and return the Cards from the first Card Collection (if cardCollections has any items), else return an empty array
	const cards: CardProps[] =
		cardCollections.length > 0 ? cardCollections[0].Cards : [];

	return (
		<div>
			<CardCollection cards={cards} name={name} />
		</div>
	);
};

export default HomePage;
