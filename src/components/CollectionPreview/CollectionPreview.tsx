import React from 'react';
import CardTypes from '../../types/CardTypes';
import { getRandomColorClass } from '../../utils/getRandomColorClass';

interface CollectionPreviewTypes {
	id: number;
	userId: number;
	publicKey: number;
	title: string;
	flashcards: CardTypes[];
	amountOfCorrectAnswers: number;
	amountOfIncorrectAnswers: number;
	amountOfCompletedRuns: number;
	isPublic?: boolean;
	cardCount: number;
	colorClass: string | null;
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
	cardCount,
	colorClass,
}) => {
	return (
		<div className={`collection-preview  ${colorClass}`}>
			<h2 className="collection-preview__title">{title}</h2>
			<p>Cards: {cardCount} </p>
		</div>
	);
};

export default CollectionPreview;

// Generate random color classes for each card
// const cardColors = collections.map(() => getRandomColorClass());
// const cardColor = getRandomColorClass();
{
	/* <div className={`collection-preview  ${cardColor}`}> */
}
// TODO: Refactor this so the Color types get set at the Parent Page components instead
// and so that they don't render a new color on the filtration/searching
// <div className={`collection-preview  ${getRandomColorClass()}`}>
