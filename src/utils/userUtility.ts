import { useDeleteUserMutation, useUpdateUserMutation } from "../redux/api/usersSlice";
import UserTypes from "../types/UsersTypes";

export const useUpdateUser = () => {
	const [mutate] = useUpdateUserMutation();

	const updateUser = (user: UserTypes) => {
		mutate(user);
	};

	return updateUser;
};

export const useDeleteUser = () => {
	const [mutate] = useDeleteUserMutation();

	const deleteUser = (id: number, objectId: string) => {
		mutate({ id, objectId });
	};

	return deleteUser;
};
