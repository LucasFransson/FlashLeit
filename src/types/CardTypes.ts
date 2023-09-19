// types/Flashcard.ts
interface CardTypes {
	id: number;
	collectionId: number;
	userId: number;
	question: string;
	answer: string;
	leitnerIndex: number;
	lastReviewedDate: Date | null;
	colorClass: string | null;
	animationOnRendering: 'draw' | 'fade-in';
}
export default CardTypes;
