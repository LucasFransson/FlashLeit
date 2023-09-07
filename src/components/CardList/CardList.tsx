import CardCollectionTypes from '../../types/CardCollectionTypes';

interface CardListProps extends CardCollectionTypes {
	highlightedIndex: number;
	// answerStatus:string;
	markedCards: { [key: number]: 'correct' | 'wrong' };
}

const CardList: React.FC<CardListProps> = ({
	flashCards = [],
	title = 'Something Went Wrong',
	highlightedIndex,
	// answerStatus
	markedCards,
}) => {
	const cards = flashCards.map((card, index) => (
		<li
			key={index}
			className={`card-list__item ${
				highlightedIndex === index ? 'highlight' : ''
			} ${markedCards[index] ? `card-list__item--${markedCards[index]}` : ''}`}
		>
			{' '}
			{index + 1} : {card.question}
		</li>
	));
	return (
		<div className="card-list">
			<h2 className="card-list__title">{title}</h2>
			{cards}
		</div>
	);
};

export default CardList;

// <li
// 	key={index}
// 	className={`card-list__item ${
// 		highlightedIndex === index ? 'highlight' : ''
// 	} ${markedCards[index] || ''}`}
// >
// 	{index + 1} : {card.question}
// </li>

// key={index}
// className={`card-list__item ${
// 	highlightedIndex === index ? 'highlight' : ''
// } ${highlightedIndex === index && answerStatus ? answerStatus : ''}`}
