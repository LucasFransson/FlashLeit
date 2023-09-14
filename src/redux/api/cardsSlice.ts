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
			invalidatesTags: (result, error, card) => [{ type: "Collection", id: card.collectionId }],
		}),
		updateCard: builder.mutation<void, CardTypes>({
			query: card => {
				return {
					url: `api/cards/${card.userId}`,
					method: "PUT",
					body: card,
				};
			},
			invalidatesTags: (result, error, card) => [{ type: "Collection", id: card.collectionId }],
		}),
		updateLastReviewedDate: builder.mutation<void, CardTypes>({
			query: card => {
				return {
					url: `api/cards/set-date/${card.id}`,
					method: "PUT",
					body: card,
				};
			},
			invalidatesTags: (result, error, card) => [{ type: "Collection", id: card.collectionId}]
		}),
		deleteCard: builder.mutation<void, CardTypes>({
			query: card => {
				return {
					url: `api/cards/`,
					method: "DELETE",
					body: card,
				};
			},
			invalidatesTags: (result, error, card) => [{ type: "Collection", id: card.collectionId }],
		}),
	}),
});

export const { useGetAllCardsQuery, useGetCardByIdQuery, useAddCardMutation, useUpdateCardMutation, useUpdateLastReviewedDateMutation, useDeleteCardMutation } = extendedApiSlice;
