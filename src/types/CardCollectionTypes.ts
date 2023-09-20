import CardProps from "./CardTypes";

interface CardCollectionTypes {
	id: number;
	title: string;
	userId: number;
	description: string;
	publicKey: number;
	flashCards: CardProps[] | null | undefined;
	isPublic: boolean;
	amountOfCorrectAnswers: number;
	amountOfIncorrectAnswers: number;
	amountOfCompletedRuns: number;
	cardCount: number;
}
export default CardCollectionTypes;
