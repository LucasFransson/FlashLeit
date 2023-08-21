// types/Flashcard.ts
interface Flashcard {
	id: number;
	Question: string;
	CorrectAnswer: string;
	WrongAnswer1: string | null;
	WrongAnswer2: string | null;
	WrongAnswer3: string | null;
	CollectionId: number;
}
export default Flashcard;
