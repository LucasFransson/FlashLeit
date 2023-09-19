import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { getRandomColorClass } from '../../utils/getRandomColorClass';
import CardCollectionTypes from '../../types/CardCollectionTypes';
import LeitnerBoxesTypes from '../../types/LeitnerBoxesTypes';
import { determineBoxToStudy } from '../../utils/determineLeitnerBox';
import CardTypes from '../../types/CardTypes';
import { use } from 'chai';
import useLeitnerBox from '../../hooks/useLeitnerBox';

function LeitnerBoxes({ collection, selectBox }) {
	const oneDay = 24 * 60 * 60 * 1000;
	const threeDays = 72 * 60 * 60 * 1000;
	const sevenDays = 168 * 60 * 60 * 1000;

	const box1 = useLeitnerBox(collection.flashCards, 1, oneDay);
	const box2 = useLeitnerBox(collection.flashCards, 2, threeDays);
	const box3 = useLeitnerBox(collection.flashCards, 3, sevenDays);

	const selectLeitnerBox = (leitnerBox: CardTypes[], boxTitle: string) => {
		selectBox(leitnerBox, boxTitle);
	};

	return (
		<div className="leitnerbox__wrapper">
			<div className="leitnerbox__top">
				<h2>Leitner Boxes</h2>
			</div>
			<div
				className={`leitnerbox__1 ${
					!box1.playableCardCount ? 'leitnerbox__isDisabled' : ''
				}`}
				onClick={() => {
					selectLeitnerBox(box1.box, 'Box No.1');
				}}
			>
				<h2>Box 1</h2>
				<h3>Playable cards: {box1.playableCardCount}</h3>
				<h3>Total cards: {box1.totalCardCount}</h3>
			</div>
			<div
				className={`leitnerbox__2 ${
					!box2.playableCardCount ? 'leitnerbox__isDisabled' : ''
				}`}
				onClick={() => {
					selectLeitnerBox(box2.box, 'Box No.2');
				}}
			>
				<h2>Box 2</h2>
				<h3>Playable cards: {box2.playableCardCount}</h3>
				<h3>Total cards: {box2.totalCardCount}</h3>
			</div>
			<div
				className={`leitnerbox__3 ${
					!box3.playableCardCount ? 'leitnerbox__isDisabled' : ''
				}`}
				onClick={() => {
					selectLeitnerBox(box3.box, 'Box No.3');
				}}
			>
				<h2>Box 3</h2>
				<h3>Playable cards: {box3.playableCardCount}</h3>
				<h3>Total cards: {box3.totalCardCount}</h3>
			</div>
		</div>
	);
}

export default LeitnerBoxes;
