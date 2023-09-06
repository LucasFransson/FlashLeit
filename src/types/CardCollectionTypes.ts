import CardProps from './CardTypes';

interface CardCollectionTypes {
	id: number;
	title: string;
	publicKey: number;
	flashCards: CardProps[];
	amountOfCorrectAnswers: number;
	amountOfIncorrectAnswers: number;
	amountOfCompletedRuns: number;
}
export default CardCollectionTypes;
