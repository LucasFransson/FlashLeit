// import React from 'react';
// import Card from '../components/Card/Card';
// import useFetch from '../hooks/useFetch';
// import CardCollection from '../components/CardCollection/CardCollection';

// const HomePage = () => {
// 	const cards: Card[] = useFetch<Card[]>('/api/cards', []);
// 	return (
// 		<div>
// 			HomePage Top
// 			<CardCollection cards={cards} />
// 			{/* const cardsData: Flashcard[] = useFetch<Flashcard[]>('/cardscollections', []); */}
// 			{/* <Card></Card> */}
// 			HomePage Bottom
// 		</div>
// 	);
// };

// export default HomePage;

// import React from 'react';
// import CardComponent from '../components/Card/Card'; // Renamed to CardComponent
// import useFetch from '../hooks/useFetch';
// import CardCollection from '../components/CardCollection/CardCollection';

// const HomePage = () => {
//   const cards: CardComponent[] = useFetch<CardComponent[]>('/api/cards', []);
//   return (
//     <div>
//       HomePage Top
//       <CardCollection cards={cards} />
//       {/* const cardsData: Flashcard[] = useFetch<Flashcard[]>('/cardscollections', []); */}
//       {/* <Card></Card> */}
//       HomePage Bottom
//     </div>
//   );
// };

// export default HomePage;

import React from 'react';
import Card from '../components/Card/Card';
import useFetch from '../hooks/useFetch';
import CardCollection from '../components/CardCollection/CardCollection';
import Flashcard from '../types/Flashcard';
import CardCollectionTypes from '../types/CardCollection';

// const HomePage = () => {
// 	const cards: Flashcard[] = useFetch<Flashcard[]>('/cardcollections', []);
// 	return (
// 		<div>
// 			HomePage Top
// 			<CardCollection cards={cards} />
// 			HomePage Bottom
// 		</div>
// 	);
// };

const HomePage = () => {
	const cardCollections: CardCollectionTypes[] = useFetch<
		CardCollectionTypes[]
	>('http://localhost:7000/CardCollections', []);

	// Assuming that each card collection has an array of cards
	const cards: Flashcard[] =
		cardCollections.length > 0 ? cardCollections[0].Cards : [];

	return (
		<div>
			HomePage Top
			<CardCollection cards={cards} />
			HomePage Bottom
		</div>
	);
};

export default HomePage;
