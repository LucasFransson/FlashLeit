import React, { useState } from 'react';
import Card from '../Card/Card';
import { getRandomColorClass } from '../../utils/getRandomColorClass';
import CardProps from '../../types/CardTypes';

interface CardCollectionProps {
	cards: CardProps[];
}

const CardCollection: React.FC<CardCollectionProps> = ({ cards }) => {
	const [cardIndex, setCardIndex] = useState(0);

	// Generate random color classes for each card
	const cardColors = cards.map(() => getRandomColorClass());

	const handleNextCard = () => {
		if (cardIndex < cards.length - 1) {
			setCardIndex(cardIndex + 1);
		}
	};

	return (
		<>
			<h1>Flashcard App</h1>
			{cards.length > 0 && cardIndex < cards.length && (
				<Card
					Id={cards[cardIndex].Id}
					Question={cards[cardIndex].Question}
					CorrectAnswer={cards[cardIndex].CorrectAnswer}
					WrongAnswer1={null}
					WrongAnswer2={null}
					WrongAnswer3={null}
					CollectionId={cards[cardIndex].Id}
					ColorClass={cardColors[cardIndex]} // Pass the random color class as a prop
				/>
			)}
			<button
				onClick={handleNextCard}
				disabled={cardIndex === cards.length - 1}
			>
				Next Card
			</button>
		</>
	);
};

export default CardCollection;
