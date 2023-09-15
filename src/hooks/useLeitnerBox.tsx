import { useState, useEffect } from 'react';

function useLeitnerBox(initialCards, leitnerIndex, reviewInterval) {
	const [box, setBox] = useState([]);

	useEffect(() => {
		const currentDate = new Date();
		const dueCards = initialCards.filter(
			(card) =>
				card.leitnerIndex === leitnerIndex &&
				currentDate.getTime() - card.lastReviewedDate.getTime() >=
					reviewInterval
		);
		setBox(dueCards);
	}, [initialCards, leitnerIndex, reviewInterval]);

	return {
		box,
		playableCardCount: box.length,
	};
}
export default useLeitnerBox;

// function useLeitnerBox(initialCards, leitnerIndex, reviewInterval) {
// 	const currentDate = new Date();

// 	const dueCards = initialCards.filter(
// 		(card) =>
// 			card.leitnerIndex === leitnerIndex &&
// 			currentDate.getTime() - card.lastReviewedDate.getTime() >= reviewInterval
// 	);

// 	const [box, setBox] = useState(dueCards);

// 	return {
// 		box,
// 		playableCardCount: box.length,
// 	};
// }
