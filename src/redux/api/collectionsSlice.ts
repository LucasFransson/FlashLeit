import CardCollectionTypes from "../../types/CardCollectionTypes";
import CardTypes from "../../types/CardTypes";
import { getRandomColorClass } from "../../utils/getRandomColorClass";
import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getAllCollections: builder.query<CardCollectionTypes[] | null, void>({
			query: () => "api/collections",
		}),
		getCollectionsByUserId: builder.query<CardCollectionTypes[] | null, number | null | undefined>({
			query: id => `api/collections/user/${id}`,
			providesTags: () => [{ type: "UserCollections" }],
		}),
		getCollectionByIdAndUserId: builder.query<CardCollectionTypes, { collectionId: number; userId: number }>({
			query: args => {
				const { collectionId, userId } = args;
				return {
					url: `api/collections/${collectionId}/user/${userId}`,
				};
			},
			providesTags: (result, error, args) => [{ type: "Collection", id: args.collectionId }],
			transformResponse: (response: CardCollectionTypes) => {
				const modifiedFlashCards = response.flashCards.map((item: CardTypes) => ({
					...item,
					colorClass: getRandomColorClass(),
				}));

				return { ...response, flashCards: modifiedFlashCards };
			},
		}),
		getAuthoredCollections: builder.query<CardCollectionTypes[] | null, { userId: number }>({
			query: userId => `api/collections/author/${userId}`,
			providesTags: () => [{ type: "UserCollections" }],
		}),
		addCollection: builder.mutation<void, CardCollectionTypes>({
			query: collection => {
				return {
					url: "api/collections",
					method: "POST",
					body: collection,
				};
			},
			invalidatesTags: () => [{ type: "UserCollections" }],
		}),
		CloneCollection: builder.mutation<void, { userId: number; collection: CardCollectionTypes }>({
			query: ({ userId, collection }) => {
				return {
					url: `api/collections/${userId}`,
					method: "POST",
					body: collection,
				};
			},
		}),
		updateCollection: builder.mutation<void, { userId: number; collection: CardCollectionTypes }>({
			query: ({ userId, collection }) => {
				return {
					url: `api/collections/${userId}/`,
					method: "PUT",
					body: collection,
				};
			},
		}),
		updateCollectionCounter: builder.mutation<void, { id: number; category: string }>({
			query: ({ id, category }) => {
				return {
					url: `api/collections/update-counter/${id}/${category}`,
					method: "PUT",
				};
			},
			invalidatesTags: () => [{ type: "UserCollections" }],
		}),
		deleteCollection: builder.mutation<void, { collectionId: number; userId: number }>({
			query: ({ collectionId, userId }) => {
				return {
					url: `api/collections/${collectionId}/?userId=${userId}`,
					method: "DELETE",
					body: JSON.stringify({ userId: userId }),
				};
			},
			invalidatesTags: () => [{ type: "UserCollections" }],
		}),
	}),
});

export const {
	useGetAllCollectionsQuery,
	useGetCollectionsByUserIdQuery,
	useGetCollectionByIdAndUserIdQuery,
	useGetAuthoredCollectionsQuery,
	useAddCollectionMutation,
	useCloneCollectionMutation,
	useUpdateCollectionMutation,
	useUpdateCollectionCounterMutation,
	useDeleteCollectionMutation,
} = extendedApiSlice;
