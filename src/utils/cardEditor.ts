import { useAddCardMutation, useUpdateCardMutation } from "../redux/api/cardsSlice";
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