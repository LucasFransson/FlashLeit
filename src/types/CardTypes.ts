// types/Flashcard.ts
interface CardTypes {
	id: number;
	collectionId: number;
	userId: number;
	question: string;
	answer: string;
	leitnerIndex: number;
	lastReviewed: Date | null; // Check if Date is the correct type to use
	colorClass: string | null;
	animationOnRendering: 'draw' | 'fade-in';
}
export default CardTypes;
