import CardCollectionTypes from '../../types/CardCollectionTypes';

interface CardListProps extends CardCollectionTypes {
	highlightedIndex: number;
}

const CardList: React.FC<CardListProps> = ({
	flashCards = [],
	title = 'Something Went Wrong',
	highlightedIndex,
}) => {
	const cards = flashCards.map((card, index) => (
		<li
			key={index}
			className={`card-list__item ${
				highlightedIndex === index ? 'highlight' : ''
			}`}
		>
			{index + 1} : {card.question}
		</li>
		// <li key={index} className="card-list__item">
		// 	{index + 1} : {card.question}
		// </li>
	));
	return (
		<div className="card-list">
			<h2 className="card-list__title">{title}</h2>
			{cards}
		</div>
	);
};

export default CardList;
