import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { getRandomColorClass } from '../../utils/getRandomColorClass';
import CardCollectionTypes from '../../types/CardCollectionTypes';
import LeitnerBoxesTypes from '../../types/LeitnerBoxesTypes';
import { determineBoxToStudy } from '../../utils/determineLeitnerBox';
import CardTypes from '../../types/CardTypes';
import { use } from 'chai';
import useLeitnerBox from '../../hooks/useLeitnerBox';

// extend necessary props here
// interface LeitnerBoxes extends CardCollectionTypes {}

function LeitnerBoxes({ collection, selectBox }) {
	const oneDay = 24 * 60 * 60 * 1000;
	const threeDays = 72 * 60 * 60 * 1000;
	const sevenDays = 168 * 60 * 60 * 1000;

	const box1 = useLeitnerBox(collection.flashCards, 1, oneDay);
	const box2 = useLeitnerBox(collection.flashCards, 2, threeDays);
	const box3 = useLeitnerBox(collection.flashCards, 3, sevenDays);

	const selectLeitnerBox = (leitnerBox) => {
		selectBox(leitnerBox);
	};

	// const [leitnerBox1, setLeitnerBox1] = useState<CardTypes[]>([]);
	// const [leitnerBox2, setLeitnerBox2] = useState<CardTypes[]>([]);
	// const [leitnerBox3, setLeitnerBox3] = useState<CardTypes[]>([]);

	// const [amountOfCardsToPlayBox1, setAmountOfCardsToPlayBox1] = useState(0);
	// const [amountOfCardsToPlayBox2, setAmountOfCardsToPlayBox2] = useState(0);
	// const [amountOfCardsToPlayBox3, setAmountOfCardsToPlayBox3] = useState(0);

	// const [isLeitnerBox1Empty, setIsLeitnerBox1Empty] = useState(true);
	// const [isLeitnerBox2Empty, setIsLeitnerBox2Empty] = useState(true);
	// const [isLeitnerBox3Empty, setIsLeitnerBox3Empty] = useState(true);

	// Date variables:

	// const currentDate = new Date();

	// useEffect(() => {
	// 	const box1Cards = collection.flashCards.filter(
	// 		(card) =>
	// 			card.leitnerIndex === 1 &&
	// 			currentDate.getTime() - card.lastReviewedDate.getTime() >= oneDay
	// 	);
	// 	const box2Cards = collection.flashCards.filter(
	// 		(card) =>
	// 			card.leitnerIndex === 2 &&
	// 			currentDate.getTime() - card.lastReviewedDate.getTime() >= threeDays
	// 	);
	// 	const box3Cards = collection.flashCards.filter(
	// 		(card) =>
	// 			card.leitnerIndex === 3 &&
	// 			currentDate.getTime() - card.lastReviewedDate.getTime() >= sevenDays
	// 	);

	// 	// setLeitnerBox1(box1Cards);
	// 	// setLeitnerBox2(box2Cards);
	// 	// setLeitnerBox3(box3Cards);

	// 	// setAmountOfCardsToPlayBox1(box1Cards.length);
	// 	// setAmountOfCardsToPlayBox2(box2Cards.length);
	// 	// setAmountOfCardsToPlayBox3(box3Cards.length);

	// }, [collection]);

	// const selectLeitnerBox = (leitnerBox: CardTypes[]) => {
	// 	selectBox(leitnerBox);
	// };

	return (
		<div className="leitnerbox__wrapper">
			<div className="leitnerbox__top">
				<h2>Leitner Boxes</h2>
			</div>
			<div
				className="leitnerbox__1"
				onClick={() => {
					selectLeitnerBox(box1.box);
				}}
			>
				<h2>Box 1</h2>
				<h3>Cards: {box1.playableCardCount}</h3>
			</div>
			<div
				className="leitnerbox__2"
				onClick={() => {
					selectLeitnerBox(box2.box);
				}}
			>
				<h2>Box 2</h2>
				<h3>Cards: {box2.playableCardCount}</h3>
			</div>
			<div
				className="leitnerbox__3"
				onClick={() => {
					selectLeitnerBox(box3.box);
				}}
			>
				<h2>Box 3</h2>
				<h3>Cards: {box3.playableCardCount}</h3>
			</div>
		</div>
	);
}

export default LeitnerBoxes;
