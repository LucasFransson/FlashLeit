import React, { useState } from 'react';
import Card from '../Card/Card';
import useFetch from '../../hooks/useFetch';
import { getRandomColorClass } from '../../utils/getRandomColorClass';
import CardProps from '../../types/CardTypes';

// interface Flashcard {
// 	id: number;
// 	question: string;
// 	answer: string;
// }

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
		<div>
			<h1>Flashcard App</h1>
			{cards.length > 0 && cardIndex < cards.length && (
				<Card
					Id={cards[cardIndex].Id}
					Question={cards[cardIndex].Question}
					CorrectAnswer={cards[cardIndex].CorrectAnswer}
					WrongAnswer1={null} // You can add values if needed
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
		</div>
	);
};

export default CardCollection;

// import React, { useState } from 'react';
// import Card from '../Card/Card';
// import useFetch from '../../hooks/useFetch';

// interface Flashcard {
// 	id: number;
// 	Question: string;
// 	CorrectAnswer: string;
// 	WrongAnswer1: string | null;
// 	WrongAnswer2: string | null;
// 	WrongAnswer3: string | null;
// 	CollectionId: number;
// }
// interface CardCollectionProps {
// 	cards: Flashcard[];
// }

// const CardCollection: React.FC<CardCollectionProps> = ({ cards }) => {
// 	const [cardIndex, setCardIndex] = useState(0);

// 	// const cardsData: Flashcard[] = useFetch<Flashcard[]>('/cardscollections', []);

// 	const handleNextCard = () => {
// 		if (cardIndex < cards.length - 1) {
// 			setCardIndex(cardIndex + 1);
// 		}
// 	};

// 	return (
// 		<div>
// 			<h1>Flashcard App</h1>
// 			{cards.length > 0 && cardIndex < cards.length && (
// 				<Card
// 					question={cards[cardIndex].Question}
// 					correctAnswer={cards[cardIndex].CorrectAnswer}
// 					wrongAnswer1={null} // You can add values if needed
// 					wrongAnswer2={null}
// 					wrongAnswer3={null}
// 					collectionId={cards[cardIndex].id}
// 				/>
// 			)}
// 			<button
// 				onClick={handleNextCard}
// 				disabled={cardIndex === cards.length - 1}
// 			>
// 				Next Card
// 			</button>
// 		</div>
// 	);
// };

// export default CardCollection;

// OLD

// import React, { useState } from 'react';
// import Card from '../Card/Card';

// interface Flashcard {
// 	id: number;
// 	question: string;
// 	answer: string;
// }

// interface CardCollectionProps {
// 	cards: Flashcard[];
// }

// // const CardCollection = ({ cards }) => {
// // 	const [cardIndex, setCardIndex] = useState(0);

// const CardCollection: React.FC<CardCollectionProps> = ({ cards }) => {
// 	const [cardIndex, setCardIndex] = useState(0);

// 	const handleNextCard = () => {
// 		if (cardIndex < cards.length - 1) {
// 			setCardIndex(cardIndex + 1);
// 		}
// 	};

// 	return (
// 		<div>
// 			<h1>Flashcard App</h1>
// 			{cards.length > 0 && cardIndex < cards.length && (
// 				<Card {...cards[cardIndex]} />
// 			)}
// 			<button
// 				onClick={handleNextCard}
// 				disabled={cardIndex === cards.length - 1}
// 			>
// 				Next Card
// 			</button>
// 		</div>
// 	);
// };

// export default CardCollection;
