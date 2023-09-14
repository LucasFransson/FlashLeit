// types/Flashcard.ts
interface CardTypes {
	id: number;
	collectionId: number;
	userId: number;
	question: string;
	answer: string;
	leitnerIndex: 1 | 2 | 3;
	lastReviewedDate: Date | null;
	colorClass: string | null;
}
export default CardTypes;
