import CardTypes from "../types/CardTypes";
import { useUpdateLeitnerIndex } from "./cardUtility";

const moveCardUp = (cardId: number, cards: CardTypes[]): CardTypes[] => {
  return cards.map(card => {
    if (card.id === cardId && card.leitnerIndex < 3) {
      return { ...card, leitnerIndex: card.leitnerIndex + 1 };
    }
    return card;
  });
}



const resetCard = (cardId: number, cards: CardTypes[]): CardTypes[] => {
  return cards.map(card => {
    if (card.id === cardId) {
      return { ...card, leitnerIndex: 1 };
    }
    return card;
  });
}

const updateLeitnerIndex = useUpdateLeitnerIndex();