import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
import { useGetUserByIdQuery } from "../redux/api/usersSlice";
import { useGetAuthoredCollectionsQuery, useGetCollectionsByUserIdQuery } from "../redux/api/collectionsSlice";
import { useDeleteUser, useUpdateUser } from "../utils/userUtility";
import Avatar from "../components/Avatar/Avatar";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";
import AvatarModal from "../components/Modal/AvatarModal";
import ErrorMsg from "../components/ErrorMsg/ErrorMsg";
import UserTypes from "../types/UsersTypes";
import { useGetAchievementsByUserIdQuery, useGetAllAchievementsQuery } from "../redux/api/achievementsSlice";

function UserPage() {
	const [skip, setSkip] = useState(true);
	const [newDisplayName, setNewDisplayName] = useState("");
	const { userId } = useSelector((state: RootState) => state.userId);

	const { instance } = useMsal();

	const { data: authUser, isLoading: isLoadingUser, isError: isErrorUser, error: errorUser } = useGetUserByIdQuery(userId, { skip });
	const { data: collections, isLoading: isLoadingCollections, isError: isErrorCollections, error: errorCollections } = useGetCollectionsByUserIdQuery(userId, { skip });
	const { data: createdCollections, isLoading: isLoadingCreatedCollections, isError: isErrorCreatedCollections, error: errorCreatedCollections } = useGetAuthoredCollectionsQuery(userId, { skip });
	const {
		data: unlockedAchievements,
		isLoading: isLoadingUnlockedAchievements,
		isError: isErrorUnlockedAchievements,
		error: errorUnlockedAchievements,
	} = useGetAchievementsByUserIdQuery(userId, { skip });
	const { data: allAchievements, isLoading: isLoadingAllAchievements, isError: isErrorAllAchievements, error: errorAllAchievements } = useGetAllAchievementsQuery();

	const updateUser = useUpdateUser();
	const deleteUser = useDeleteUser();

	const [showingAvatarModal, setIsShowingAvatarModal] = useState(false);

	const showAvatarModal = () => {
		setIsShowingAvatarModal(true);
	};

	const closeAvatarModal = () => {
		setIsShowingAvatarModal(false);
	};

	useEffect(() => {
		if (userId != null) {
			setSkip(false);
		}
	}, [userId]);

	const closeAccount = () => {
		deleteUser();
		instance.logout();
	};

	const updateDisplayName = e => {
		if (authUser) {
			const updatedUser: UserTypes = {
				id: authUser[0].id,
				email: authUser[0].email,
				accountName: authUser[0].accountName,
				userName: newDisplayName,
				selectedAvatarUrl: authUser[0].selectedAvatarUrl,
			};

			updateUser(updatedUser);
		}
	};

	const updateAvatar = (url: string) => {
		if (authUser) {
			const updatedUser: UserTypes = {
				id: authUser[0].id,
				email: authUser[0].email,
				accountName: authUser[0].accountName,
				userName: authUser[0].userName,
				selectedAvatarUrl: url,
			};

			updateUser(updatedUser);

			closeAvatarModal();
		}
	};

	return (
		<>
			<AuthenticatedTemplate>
				{isLoadingUser || isLoadingCollections ? (
					<LoadingIcon />
				) : isErrorUser ? (
					<ErrorMsg error={errorUser} />
				) : isErrorCollections ? (
					<ErrorMsg error={errorCollections} />
				) : (
					authUser &&
					collections && (
						<div className="user-page">
							{showingAvatarModal && <AvatarModal updateUserAvatar={updateAvatar} userId={authUser[0].id} />}
							<Avatar url={authUser[0]?.selectedAvatarUrl} showModal={showAvatarModal} caller={"user-page"} />
							<div>
								<label htmlFor="displayName">Display name</label>
								<input type="text" id="displayName" defaultValue={authUser[0]?.userName} onChange={e => setNewDisplayName(e.target.value)} />
								<label htmlFor="accountName">Account name</label>
								<input type="text" id="accountName" value={authUser[0]?.accountName} disabled />
								<label htmlFor="email">Email</label>
								<input type="email" id="email" value={authUser[0]?.email} disabled />
								<button onClick={updateDisplayName}>Save changes</button>
								<button onClick={() => instance.loginRedirect({ authority: "https://flashleit.b2clogin.com/flashleit.onmicrosoft.com/B2C_1_PasswordReset", scopes: ["openid"] })}>
									Change Password
								</button>
								<button onClick={() => instance.logout()}>Log Out</button>
								<button onClick={closeAccount}>Close Account</button>
							</div>
						</div>
					)
				)}
			</AuthenticatedTemplate>
		</>
	);
}
export default UserPage;
