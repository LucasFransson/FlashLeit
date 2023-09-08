import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getCollectionsByUserId: builder.query<CardCollectionTypes[] | null, number>({
			query: id => `api/collections/user/${id}`,
		}),
		getCollectionByIdAndUserId: builder.query({
			query: args => {
				const { collectionId, userId } = args;
				return {
					url: `api/collections/${collectionId}/user/${userId}`,
				};
			},
		}),
		updateCollectionCounter: builder.mutation({
			query: ({ id, category }) => {
				return {
					url: `api/collections/update-counter/${id}/${category}`,
					method: "PUT",
				};
			},
		}),
	}),
});

export const { useGetCollectionsByUserIdQuery, useGetCollectionByIdAndUserIdQuery, useUpdateCollectionCounterMutation } = extendedApiSlice;
