import CardTypes from "../../types/CardTypes";
import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getAllCards: builder.query<CardTypes[] | null, void>({
			query: () => "api/cards",
		}),
		getCardById: builder.query<CardTypes[] | null, number>({
			query: id => `api/cards/${id}`,
		}),
		addCard: builder.mutation<void, CardTypes>({
			query: card => {
				return {
					url: "api/cards",
					method: "POST",
					body: card,
				};
			},
		}),
		updateCard: builder.mutation<void, CardTypes>({
			query: card => {
				return {
					url: `api/cards/${card.id}`,
					method: "PUT",
					body: card,
				};
			},
		}),
		deleteCard: builder.mutation<void, number>({
			query: id => {
				return {
					url: `api/cards/${id}`,
					method: "DELETE",
				};
			},
		}),
	}),
});

export const { useGetAllCardsQuery, useGetCardByIdQuery, useAddCardMutation, useUpdateCardMutation, useDeleteCardMutation } = extendedApiSlice;
