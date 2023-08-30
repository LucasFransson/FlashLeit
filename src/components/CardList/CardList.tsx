import CardCollectionTypes from '../../types/CardCollectionTypes';

interface CardListProps extends CardCollectionTypes {}
// function CardList() : React.FC<CardCollectionTypes> {
//     return
//     <></>
// }

const CardList: React.FC<CardListProps> = ({
	flashCards = [],
	name = 'Something Went Wrong',
}) => {
	const cards = flashCards.map((card, index) => (
		<li key={index} className="card-list__item">
			{index + 1} : {card.question}
		</li>
	));
	return (
		<div className="card-list">
			<h2 className="card-list__title">{name}</h2>
			{cards}
		</div>
	);
};

export default CardList;
