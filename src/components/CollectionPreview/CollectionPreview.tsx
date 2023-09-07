import React from 'react';
import CardTypes from '../../types/CardTypes';
import { useNavigate } from 'react-router-dom';

interface CollectionPreviewTypes {
	id: number;
	userId: number;
	publicKey: number;
	title: string;
	flashcards: CardTypes;
	amountOfCorrectAnswers: number;
	amountOfIncorrectAnswers: number;
	amountOfCompletedRuns: number;
	isPublic?: boolean;
}



const CollectionPreview: React.FC<CollectionPreviewTypes> = ({
	id,
	userId,
	publicKey,
	title,
	flashcards,
	amountOfCorrectAnswers,
	amountOfIncorrectAnswers,
	amountOfCompletedRuns,
	isPublic,
}) => {

const navigate = useNavigate();

const openCollection = (collectionId: number) => {
	navigate(`/collection/${collectionId}`)
}

	return (
		<div className="collection-preview" onClick={() => openCollection(id)} >
			<h2 className="collection-preview__title">{title}</h2>
		</div>
	);
};

export default CollectionPreview;
