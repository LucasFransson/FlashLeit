import CardTypes from '../types/CardTypes';
import LeitnerBoxesTypes from '../types/LeitnerBoxesTypes';

// type LeitnerCards = {
// 	Box1: CardTypes[];  // Consider making a CardModel instead!
// 	Box2: CardTypes[];
// 	Box3: CardTypes[];
// };

// const determineBoxToStudy = (cards: LeitnerCards) => {
// 	const currentDate = new Date();

// 	const box1LatestDate =
// 		cards.Box1.length > 0
// 			? new Date(
// 					Math.max(
// 						...cards.Box1.map((card) => new Date(card.lastReviewed).getTime())
// 					)
// 			  )
// 			: null;
// };

// type LeitnerBoxes = {
// 	Box1: CardTypes[]; // Consider making a CardModel instead!
// 	Box2: CardTypes[];
// 	Box3: CardTypes[];
// };

const determineBoxToStudy = (boxes: LeitnerBoxesTypes) => {
	const currentDate = new Date();

	const getLatestReviewDate = (box: CardTypes[]) => {
		if (box.length === 0) {
			return null;
		}

		return new Date(
			Math.max(
				...box
					.filter((card) => card.lastReviewed !== null) // filter out cards with null review dates
					.map((card) => (card.lastReviewed as Date).getTime()) // assert that lastReviewed is a Date now
			)
		);
		// return new Date(
		// 	Math.max(...box.map((card) => new Date(card.lastReviewed).getTime()))
		// );
	};
	const box1LatestDate = getLatestReviewDate(boxes.Box1);
	const box2LatestDate = getLatestReviewDate(boxes.Box2);
	const box3LatestDate = getLatestReviewDate(boxes.Box3);


    // Check if box1 should be studied ( if there is no cards in box1 with latest review date or last card reviewed was > 24 hour ago)
	if (
		!box1LatestDate ||
		currentDate.getTime() - box1LatestDate.getTime() > 24 * 60 * 60 * 1000
	) {
		return 1;
	}
    // -||-
	    // Check if box1 should be studied ( if there is no cards in box1 with latest review date or last card reviewed was > 24 hour ago)
	if (
		!box2LatestDate ||
		currentDate.getTime() - box2LatestDate.getTime() > 3 * 24 * 60 * 60 * 1000
	) {
		return 2;
	}
    // -||-
	if (
		!box3LatestDate ||
		currentDate.getTime() - box3LatestDate.getTime() > 7 * 24 * 60 * 60 * 1000
	) {
		return 3;
	}

	return 1;
};
