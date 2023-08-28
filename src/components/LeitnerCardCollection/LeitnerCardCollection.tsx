import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { getRandomColorClass } from '../../utils/getRandomColorClass';
import CardCollectionTypes from '../../types/CardCollectionTypes';
import LeitnerBoxesTypes from '../../types/LeitnerBoxesTypes';
import { determineBoxToStudy } from '../../utils/determineLeitnerBox';

// extend necessary props here
interface LeitnerCardProps extends CardCollectionTypes {}

function LeitnerCardCollection() {
	const [boxes, setBoxes] = useState<LeitnerBoxesTypes>({
		Box1: [],
		Box2: [],
		Box3: [],
	});

	return <>Leitner Card Collection</>;
}

export default LeitnerCardCollection;
