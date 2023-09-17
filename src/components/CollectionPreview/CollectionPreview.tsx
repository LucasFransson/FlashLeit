import React, { useContext } from 'react';
import CardTypes from '../../types/CardTypes';
import ColorClassContext from '../../context/ColorClassContext';
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

	if (colorClass == null) {
		colorClass = useContext(ColorClassContext);
	}

	return (
		<>
			<div className={'collection-preview'}>
				<div className="collection-preview__card-box">
					<p
						className={`collection-preview__card-box-count  ${colorClass}-foreground`}
					>
						{cardCount}{' '}
					</p>
					<p
						className={`collection-preview__card-box-text  ${colorClass}-foreground`}
					>
						Cards
					</p>
				</div>
				<div className={`collection-preview__content ${colorClass}`}></div>
				<h2 className="collection-preview__title">{title}</h2>
				<p className="collection-preview__description">
					Description: Lorem ipsum dolor sit amet consectetur.
				</p>
			</div>
		</>
	);
};

export default CollectionPreview;

// if (colorClass == null) {
// 	colorClass = useContext(ColorClassContext);
// }

// Generate random color classes for each card
// const cardColors = collections.map(() => getRandomColorClass());
// const cardColor = getRandomColorClass();
{
	/* <div className={`collection-preview  ${cardColor}`}> */
}
// TODO: Refactor this so the Color types get set at the Parent Page components instead
// and so that they don't render a new color on the filtration/searching
// <div className={`collection-preview  ${getRandomColorClass()}`}>
