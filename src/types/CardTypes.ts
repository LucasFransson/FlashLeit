// types/Flashcard.ts
interface CardTypes {
	id: number;
	question: string;
	correctAnswer: string;
	wrongAnswer1: string | null;
	wrongAnswer2: string | null;
	wrongAnswer3: string | null;
	collectionId: number;
	colorClass: string | null;
	lastReviewed: Date | null; // Check if Date is the correct type to use
}
export default CardTypes;
