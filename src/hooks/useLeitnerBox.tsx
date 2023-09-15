import { useState, useEffect } from 'react';

function useLeitnerBox(initialCards, leitnerIndex, reviewInterval) {
	const [box, setBox] = useState([]);

	useEffect(() => {
		const currentDate = new Date();
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
		playableCardCount: box.length,
	};
}
export default useLeitnerBox;