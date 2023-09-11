import UserTypes from "../../types/UsersTypes";
import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getAllUsers: builder.query<UserTypes[], void>({
			query: () => "api/users",
			providesTags: ["Users"],
		}),
		getUserById: builder.query<UserTypes[], number | null | undefined>({
			query: id => `api/users/${id}`,
			providesTags: (result, error, id) => [{ type: "Users", id: Number(id) }],
		}),
		updateUser: builder.mutation<void, UserTypes>({
			query: user => ({
				url: `api/users/${user.id}`,
				method: "PATCH",
				body: user,
			}),
			invalidatesTags: (result, error, user) => [{ type: "Users", id: user.id }],
		}),
		deleteUser: builder.mutation<void, { id: number; objectId: string }>({
			query: ({ id, objectId }) => ({
				url: `api/users/${id}/${objectId}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, args) => [{ type: "Users", id: args.id }],
		}),
	}),
});

export const { useGetUserByIdQuery, useGetAllUsersQuery, useUpdateUserMutation, useDeleteUserMutation } = extendedApiSlice;
