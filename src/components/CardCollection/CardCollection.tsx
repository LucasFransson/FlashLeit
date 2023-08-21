import React, { useState } from 'react';
import Card from '../Card/Card';
import { getRandomColorClass } from '../../utils/getRandomColorClass';
import CardProps from '../../types/CardTypes';

interface CardCollectionProps {
	cards: CardProps[];
}

const CardCollection: React.FC<CardCollectionProps> = ({ cards }) => {
	// useState hook for managing current card index
	const [cardIndex, setCardIndex] = useState(0);

	// Generate random color classes for each card
	const cardColors = cards.map(() => getRandomColorClass());

	// Function for handling/switching to the next card
	const handleNextCard = () => {
		// Check if the current card is the last card
		if (cardIndex < cards.length - 1) {
			// Increment the card index to show the next card
			setCardIndex(cardIndex + 1);
		}
	};

	return (
		<>
			<h1>Flashcard App</h1>
			{/* Check if there are any cards AND that the current card index is within bounds */}
			{cards.length > 0 && cardIndex < cards.length && (
				// Render the Card at cardIndex from the cards array
				<Card
					key={cardIndex} // This Key Forces a re-mount of the Card Component, causing the useState hook to reset the components initial value, ensuring that the Card starts with the front side facing up
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
				disabled={cardIndex === cards.length - 1} // if the Current Card is the last one, Disable the button
			>
				Next Card
			</button>
		</>
	);
};

export default CardCollection;
