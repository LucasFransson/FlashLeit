import { useState, useEffect } from 'react';

function useLeitnerBox(initialCards, leitnerIndex, reviewInterval) {
	const [box, setBox] = useState([]);
	const [totalCardCount, setTotalCardCount] = useState(0);

	useEffect(() => {
		const currentDate = new Date();

		const totalCards = initialCards.filter(
			(card) => card.leitnerIndex === leitnerIndex).length;

		setTotalCardCount(totalCards);

		const dueCards = initialCards.filter(
			(card) =>
				card.leitnerIndex === leitnerIndex &&
				currentDate.getTime() - new Date (card.lastReviewedDate).getTime() >=
					reviewInterval
		);
		setBox(dueCards);
	}, [initialCards, leitnerIndex, reviewInterval]);

	return {
		box,
		totalCardCount, 
		playableCardCount: box.length,
	};
}
export default useLeitnerBox;