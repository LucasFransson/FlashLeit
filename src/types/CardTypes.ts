// types/Flashcard.ts
interface CardProps {
	Id: number;
	Question: string;
	CorrectAnswer: string;
	WrongAnswer1: string | null;
	WrongAnswer2: string | null;
	WrongAnswer3: string | null;
	CollectionId: number;
	ColorClass: string;
}
export default CardProps;
