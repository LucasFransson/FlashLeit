import React, { useState } from 'react';
import Card from '../Card/Card';
import { getRandomColorClass } from '../../utils/getRandomColorClass';
import CardCollectionTypes from '../../types/CardCollectionTypes';

interface CardCollectionProps extends CardCollectionTypes {}

const CardCollection: React.FC<CardCollectionProps> = ({
	flashCards = [],
	name = 'Something Went Wrong',
}) => {
	// useState hook for managing current card index
	const [cardIndex, setCardIndex] = useState(0);

	// Generate random color classes for each card
	const cardColors = flashCards.map(() => getRandomColorClass());

	// Function for handling/switching to the next card
	const handleNextCard = () => {
		// Check if the current card is the last card
		if (cardIndex < flashCards.length - 1) {
			// Increment the card index to show the next card
			setCardIndex(cardIndex + 1);
		}
	};
	console.log('Card Index:', cardIndex, 'Cards Length:', flashCards.length);
	return (
		<div className="card-collection">
			<h1>{name}</h1>
			{/* Check if there are any cards AND that the current card index is within bounds */}
			{flashCards.length > 0 && cardIndex < flashCards.length && (
				// Render the Card at cardIndex from the cards array
				<Card
					key={cardIndex} // This Key Forces a re-mount of the Card Component, causing the useState hook to reset the components initial value, ensuring that the Card starts with the front side facing up
					id={flashCards[cardIndex].id}
					question={flashCards[cardIndex].question}
					correctAnswer={flashCards[cardIndex].correctAnswer}
					wrongAnswer1={null}
					wrongAnswer2={null}
					wrongAnswer3={null}
					collectionId={flashCards[cardIndex].id} // Not correct? This is the card id not the collection id
					colorClass={cardColors[cardIndex]} // Pass the random color class as a prop
					lastReviewed={null} // Remove null
				/>
			)}
			<p className="card-collection__counter">
				<span>{cardIndex + 1}</span>/<span>{flashCards.length}</span>
			</p>

			<div>
				{/* Div for Buttons */}
				<button
					className="button-next button-next--wrong"
					onClick={handleNextCard}
					disabled={cardIndex === flashCards.length - 1} // if the Current Card is the last one, Disable the button
					// 	disabled={isFlipped} !
				>
					Wrong
				</button>
				<button
					className="button-next button-next--correct"
					onClick={handleNextCard}
					disabled={cardIndex === flashCards.length - 1} // if the Current Card is the last one, Disable the button
				>
					Correct
				</button>
			</div>
		</div>
	);
};

export default CardCollection;

// import React, { useState } from 'react';
// import Card from '../Card/Card';
// import { getRandomColorClass } from '../../utils/getRandomColorClass';
// import CardCollectionTypes from '../../types/CardCollectionTypes';

// interface CardCollectionProps extends CardCollectionTypes {}

// const CardCollection: React.FC<CardCollectionProps> = ({
// 	flashCards = [],
// 	name = 'Something Went Wrong',
// }) => {
// 	// useState hook for managing current card index
// 	const [cardIndex, setCardIndex] = useState(0);

// 	// Generate random color classes for each card
// 	const cardColors = flashCards.map(() => getRandomColorClass());

// 	// Function for handling/switching to the next card
// 	const handleNextCard = () => {
// 		// Check if the current card is the last card
// 		if (cardIndex < flashCards.length - 1) {
// 			// Increment the card index to show the next card
// 			setCardIndex(cardIndex + 1);
// 		}
// 	};
// 	console.log('Card Index:', cardIndex, 'Cards Length:', flashCards.length);
// 	return (
// 		<div className="card-collection">
// 			<h1>{name}</h1>
// 			{/* Check if there are any cards AND that the current card index is within bounds */}
// 			{flashCards.length > 0 && cardIndex < flashCards.length && (
// 				// Render the Card at cardIndex from the cards array
// 				<Card
// 					key={cardIndex} // This Key Forces a re-mount of the Card Component, causing the useState hook to reset the components initial value, ensuring that the Card starts with the front side facing up
// 					id={flashCards[cardIndex].id}
// 					question={flashCards[cardIndex].question}
// 					correctAnswer={flashCards[cardIndex].correctAnswer}
// 					wrongAnswer1={null}
// 					wrongAnswer2={null}
// 					wrongAnswer3={null}
// 					collectionId={flashCards[cardIndex].id} // Not correct? This is the card id not the collection id
// 					colorClass={cardColors[cardIndex]} // Pass the random color class as a prop
// 					lastReviewed={null} // Remove null
// 				/>
// 			)}
// 			<p className="card-collection__counter">
// 				<span>{cardIndex + 1}</span>/<span>{flashCards.length}</span>
// 			</p>

// 			<div>
// 				{/* Div for Buttons */}
// 				<button
// 					className="button-next button-next--wrong"
// 					onClick={handleNextCard}
// 					disabled={cardIndex === flashCards.length - 1} // if the Current Card is the last one, Disable the button
// 					// 	disabled={isFlipped} !
// 				>
// 					Wrong
// 				</button>
// 				<button
// 					className="button-next button-next--correct"
// 					onClick={handleNextCard}
// 					disabled={cardIndex === flashCards.length - 1} // if the Current Card is the last one, Disable the button
// 				>
// 					Correct
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default CardCollection;
