import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getAllUsers: builder.query({
			query: () => "api/users",
		}),
		getUserById: builder.query({
			query: id => `api/users/${id}`,
		}),
		updateUser: builder.mutation({
			query: ({ id, ...user }) => ({
				url: `api/users/${id}`,
				method: "PATCH",
				body: user,
			}),
		}),
		deleteUser: builder.mutation({
			query: ({ id, objectId }) => ({
				url: `api/users/${id}/${objectId}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const { useGetUserByIdQuery, useGetAllUsersQuery, useUpdateUserMutation, useDeleteUserMutation } = extendedApiSlice;
