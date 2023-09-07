import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import useFetch from '../hooks/useFetch';
import CardCollection from '../components/CardCollection/CardCollection';
import CardCollectionTypes from '../types/CardCollectionTypes';
import LoadingIcon from '../components/LoadingIcon/LoadingIcon';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CardList from '../components/CardList/CardList';

interface RouteParams {
	id: number;
}

function CollectionPage() {
	// User Related Parameters
	const { id } = useParams<RouteParams>();
	const { userId } = useSelector((state: RootState) => state.userId);
	// Initializing the CardIndex var for passing to child components
	const [currentCardIndex, setCurrentCardIndex] = useState(0);

	// Fetching CardCollection with the passed CollectionID & UserID
	const { data, loading, error } = useFetch<CardCollectionTypes[]>(
		`https://flashleit.azure-api.net/api/collections/${id}/user/${userId}`,

		[]
	);

	let cardCollection: CardCollectionTypes | null = null;

	// Loading & Error Handling
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

	// TSX Component
	return (
		<div className="cardset-page">
			{/* {cardCollection && <CardCollection {...cardCollection} />} */}
			{data && (
				<>
					<CardCollection
						flashCards={data.flashCards}
						name={data.title}
						cardIndex={currentCardIndex}
						setCardIndex={setCurrentCardIndex}
						id={data.id}
					/>
					<CardList
						flashCards={data.flashCards}
						name={data.title}
						highlightedIndex={currentCardIndex}
					/>
				</>
			)}
		</div>
	);
}

export default CollectionPage;
