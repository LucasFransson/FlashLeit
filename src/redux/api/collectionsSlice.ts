import CardCollectionTypes from "../../types/CardCollectionTypes";
import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getAllCollections: builder.query<CardCollectionTypes[] | null, void>({
			query: () => "api/collections",
		}),
		getCollectionsByUserId: builder.query<CardCollectionTypes[] | null, number | null | undefined>({
			query: id => `api/collections/user/${id}`,
		}),
		getCollectionByIdAndUserId: builder.query<CardCollectionTypes[] | null, { collectionId: number; userId: number }>({
			query: args => {
				const { collectionId, userId } = args;
				return {
					url: `api/collections/${collectionId}/user/${userId}`,
				};
			},
			providesTags: (result, error, args) => [{ type: "Collection", id: args.collectionId }],
		}),
		addCollection: builder.mutation<void, CardCollectionTypes>({
			query: collection => {
				return {
					url: "api/collections",
					method: "POST",
					body: collection,
				};
			},
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
		}),
		deleteCollection: builder.mutation<void, { collectonId: number; userId: number }>({
			query: ({ collectonId, userId }) => {
				return {
					url: `api/collections/${collectonId}`,
					method: "DELETE",
					body: userId,
				};
			},
		}),
	}),
});

export const {
	useGetAllCollectionsQuery,
	useGetCollectionsByUserIdQuery,
	useGetCollectionByIdAndUserIdQuery,
	useAddCollectionMutation,
	useCloneCollectionMutation,
	useUpdateCollectionMutation,
	useUpdateCollectionCounterMutation,
	useDeleteCollectionMutation,
} = extendedApiSlice;
