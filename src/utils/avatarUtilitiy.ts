import { useAddUserAvatarRelationshipMutation } from "../redux/api/avatarsSlice";

export const useAddUserAvatarRelationship = () => {
	const [mutate] = useAddUserAvatarRelationshipMutation();

	const addRelationship = (userId: number, avatarId: number) => {
		mutate({ userId, avatarId });
	};

	return addRelationship;
};
