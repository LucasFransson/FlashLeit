import { useAddCardMutation, useDeleteCardMutation, useUpdateCardMutation, useUpdateLastReviewedDateMutation, useUpdateLeitnerIndexMutation } from "../redux/api/cardsSlice";
import CardTypes from "../types/CardTypes";

export const useAddCard = () => {
  const [mutate] = useAddCardMutation();


  const addCard = (card: CardTypes) => {
    mutate(card);
  }

  return addCard;
}

export const useUpdateCard = () => {
  const [mutate] = useUpdateCardMutation();

  const updateCard = (card: CardTypes) => {
    mutate(card);
  }

  return updateCard;
}

export const useUpdateLastReviewedDate = () => {
  
  const [mutate] = useUpdateLastReviewedDateMutation();

  const updateLastReviewedDate = (card: CardTypes) => {
    mutate(card);
  }

  return updateLastReviewedDate;
}

export const useUpdateLeitnerIndex = () => {
  const [mutate] = useUpdateLeitnerIndexMutation();

  const updateLeitnerIndex = (card: CardTypes) => {
    mutate(card);
  }

  return updateLeitnerIndex;
}

export const useDeleteCard = () => {
  const [mutate] = useDeleteCardMutation();

  const deleteCard = (card: CardTypes) => {
    mutate(card);
  }

  return deleteCard;
}