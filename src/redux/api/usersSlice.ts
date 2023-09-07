import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getUserById: builder.query({
			query: id => `api/users/${id}`,
		}),
		getAllUsers: builder.query({
			query: () => "api/users",
		}),
	}),
});

export const { useGetUserByIdQuery, useGetAllUsersQuery } = extendedApiSlice;
