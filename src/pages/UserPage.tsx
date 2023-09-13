import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useMsal } from "@azure/msal-react";
import { useGetUserByIdQuery } from "../redux/api/usersSlice";
import { useGetCollectionsByUserIdQuery } from "../redux/api/collectionsSlice";
import { useUpdateUser } from "../utils/userUtility";
import Avatar from "../components/Avatar/Avatar";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";
import AvatarModal from "../components/Modal/AvatarModal";
import ErrorMsg from "../components/ErrorMsg/ErrorMsg";
import UserTypes from "../types/UsersTypes";

function UserPage() {
	const [skip, setSkip] = useState(true);
	const [newDisplayName, setNewDisplayName] = useState("");
	const { userId } = useSelector((state: RootState) => state.userId);

	const { instance } = useMsal();

	const { data: authUser, isLoading: isLoadingUser, isError: isErrorUser, error: errorUser } = useGetUserByIdQuery(userId, { skip });
	const { data: collections, isLoading: isLoadingCollections, isError: isErrorCollections, error: errorCollections } = useGetCollectionsByUserIdQuery(userId, { skip });
	const updateUser = useUpdateUser();

	const [showingAvatarModal, setIsShowingAvatarModal] = useState(false);

	const showAvatarModal = () => {
		setIsShowingAvatarModal(true);
	};

	useEffect(() => {
		if (userId != null) {
			setSkip(false);
		}
	}, [userId]);

	const closeAccount = () => {
		if (authUser) {
			// TODO: Rewrite getUserIdFromIdToken so that also can return objectId (oid)
			//useDeleteUser()
		}
	};

	const changeDisplayName = e => {
		if (authUser) {
			const updatedUser: UserTypes = {
				id: authUser[0].id,
				email: authUser[0].email,
				accountName: authUser[0].accountName,
				userName: newDisplayName,
				avatarUrl: authUser[0].avatarUrl,
			};

			updateUser(updatedUser);
		}
	};

	return (
		<>
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
						{showingAvatarModal && <AvatarModal />}
						<Avatar url={authUser[0].avatarUrl} showModal={showAvatarModal} caller={"user-page"} />
						<div>
							<label htmlFor="displayName">Display name</label>
							<input type="text" id="displayName" defaultValue={authUser[0].userName} onChange={e => setNewDisplayName(e.target.value)} />
							<label htmlFor="accountName">Account name</label>
							<input type="text" id="accountName" value={authUser[0].accountName} disabled />
							<label htmlFor="email">Email</label>
							<input type="email" id="email" value={authUser[0].email} disabled />
							<button onClick={changeDisplayName}>Save changes</button>
							<button onClick={() => instance.loginRedirect({ authority: "https://flashleit.b2clogin.com/flashleit.onmicrosoft.com/B2C_1_PasswordReset", scopes: ["openid"] })}>Change Password</button>
							<button onClick={() => instance.logout()}>Log Out</button>
							<button onClick={closeAccount}>Close Account</button>
						</div>
					</div>
				)
			)}
		</>
	);
}
export default UserPage;
