import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "https://flashleit.azure-api.net/" }),
	tagTypes: ["Test"],
	endpoints: builder => ({}),
});

// export const usersApi = createApi({
// 	reducerPath: "usersApi",
// 	baseQuery: fetchBaseQuery({ baseUrl: "https://flashleit.azure-api.net/" }),
// 	endpoints: builder => ({
// 		getUserById: builder.query({
// 			query: id => `api/users/${id}`,
// 		}),
// 		getAllUsers: builder.query({
// 			query: () => "api/users",
// 		}),
// 	}),
// });

// export const collectionsApi = createApi({
// 	reducerPath: "collectionsApi",
// 	baseQuery: fetchBaseQuery({ baseUrl: "https://flashleit.azure-api.net/" }),
// 	endpoints: builder => ({
// 		getCollectionsByUserId: builder.query({
// 			query: id => `api/collections/${id}`,
// 		}),
// 		getCollectionByIdAndUserId: builder.query({
// 			query: args => {
// 				const { collectionId, userId } = args;
// 				return {
// 					url: `api/collections/${collectionId}/user/${userId}`,
// 				};
// 			},
// 		}),
// 	}),
// });

// export const { useGetUserByIdQuery, useGetAllUsersQuery } = usersApi;

// export const { useGetCollectionsByUserIdQuery, useGetCollectionByIdAndUserIdQuery } = collectionsApi;
