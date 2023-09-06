import React from 'react';
import CardTypes from '../../types/CardTypes';

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
	return (
		<div className="collection-preview">
			<h2 className="collection-preview__title">{title}</h2>
		</div>
	);
};

export default CollectionPreview;
