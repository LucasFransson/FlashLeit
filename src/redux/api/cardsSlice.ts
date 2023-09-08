import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getAllCards: builder.query({
			query: () => "api/cards/",
		}),
		getCardById: builder.query({
			query: id => `api/cards/${id}`,
		}),
		addCard: builder.mutation({
			query: card => {
				return {
					url: "api/cards",
					method: "POST",
					body: card,
				};
			},
		}),
		updateCard: builder.mutation({
			query: card => {
				return {
					url: `api/cards/${card.id}`,
					method: "PUT",
					body: card,
				};
			},
		}),
		deleteCard: builder.mutation({
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
