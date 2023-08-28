import CardTypes from './CardTypes';

type LeitnerBoxes = {
	Box1: CardTypes[]; // Consider making a CardModel instead!
	Box2: CardTypes[];
	Box3: CardTypes[];
};

export default LeitnerBoxes;
