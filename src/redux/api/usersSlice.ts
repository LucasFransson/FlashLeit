import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getAllUsers: builder.query({
			query: () => "api/users",
			providesTags: ["Users"],
		}),
		getUserById: builder.query({
			query: id => `api/users/${id}`,
			providesTags: (result, error, id) => [{ type: "Users", id: id }],
		}),
		updateUser: builder.mutation({
			query: ({ id, ...user }) => ({
				url: `api/users/${id}`,
				method: "PATCH",
				body: user,
			}),
			invalidatesTags: (result, error, id) => [{ type: "Users", id: id }],
		}),
		deleteUser: builder.mutation({
			query: ({ id, objectId }) => ({
				url: `api/users/${id}/${objectId}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, id) => [{ type: "Users", id: id }],
		}),
	}),
});

export const { useGetUserByIdQuery, useGetAllUsersQuery, useUpdateUserMutation, useDeleteUserMutation } = extendedApiSlice;
