import CardProps from './CardTypes';

interface CardCollectionTypes {
	id: number;
	title: string;
	userId: number;
	publicKey: number;
	flashCards: CardProps[] | null;
	isPublic: boolean;
	amountOfCorrectAnswers: number;
	amountOfIncorrectAnswers: number;
	amountOfCompletedRuns: number;
	cardCount: number;
}
export default CardCollectionTypes;
