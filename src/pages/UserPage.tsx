import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
	AuthenticatedTemplate,
	UnauthenticatedTemplate,
	useMsal,
} from "@azure/msal-react";
import { useGetUserByIdQuery } from "../redux/api/usersSlice";
import {
	useGetAuthoredCollectionsQuery,
	useGetCollectionsByUserIdQuery,
} from "../redux/api/collectionsSlice";
import { useDeleteUser, useUpdateUser } from "../utils/userUtility";
import Avatar from "../components/Avatar/Avatar";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";
import AvatarModal from "../components/Modal/AvatarModal";
import ErrorMsg from "../components/ErrorMsg/ErrorMsg";
import UserTypes from "../types/UsersTypes";

import { useGetAchievementsByUserIdQuery, useGetAllAchievementsQuery } from "../redux/api/achievementsSlice";
import { getTotalCompleteRuns, getTotalCorrectAnswers, getTotalIncorrectAnswers, getUserAchievementPoints } from "../utils/statsUtility";


function UserPage() {
	const [skip, setSkip] = useState(true);
	const [newDisplayName, setNewDisplayName] = useState("");
	const { userId } = useSelector((state: RootState) => state.userId);

	const { instance } = useMsal();

	const {
		data: authUser,
		isLoading: isLoadingUser,
		isError: isErrorUser,
		error: errorUser,
	} = useGetUserByIdQuery(userId, { skip });
	const {
		data: collections,
		isLoading: isLoadingCollections,
		isError: isErrorCollections,
		error: errorCollections,
	} = useGetCollectionsByUserIdQuery(userId, { skip });

	// const {
	// 	data: createdCollections,
	// 	isLoading: isLoadingCreatedCollections,
	// 	isError: isErrorCreatedCollections,
	// 	error: errorCreatedCollections,
	// } = useGetAuthoredCollectionsQuery(userId, { skip });
	// const {
	// 	data: unlockedAchievements,
	// 	isLoading: isLoadingUnlockedAchievements,
	// 	isError: isErrorUnlockedAchievements,
	// 	error: errorUnlockedAchievements,
	// } = useGetAchievementsByUserIdQuery(userId, { skip });
	// const {
	// 	data: allAchievements,
	// 	isLoading: isLoadingAllAchievements,
	// 	isError: isErrorAllAchievements,
	// 	error: errorAllAchievements,
	// } = useGetAllAchievementsQuery();

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

	const updateDisplayName = (e) => {
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
				{isLoadingUser || isLoadingCollections || isLoadingCreatedCollections ? (
					<LoadingIcon />
				) : isErrorUser ? (
					<ErrorMsg error={errorUser} />
				) : isErrorCollections ? (
					<ErrorMsg error={errorCollections} />
				) : (
					authUser &&
					collections && (

						<div className="user-dashboard">
							<div className="user-dashboard__col">
								<div className=" user-dashboard__card--flat user-dashboard__card--flat">
									<h1 className="user-dashboard__title">
										{authUser[0].userName}
									</h1>
									{/* <p className="user-dashboard__description">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Consectetur, adipisci.
									</p>
									<small className="user-dashboard__note">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Illo molestias earum magni numquam quo ut voluptatibus
										expedita a qui cupiditate!
									</small> */}
								</div>
								<div className="user-dashboard__card user-dashboard__card--xl user-card">
									<h4 className="user-dashboard__subtitle">Profile Card</h4>
									{showingAvatarModal && (
										<AvatarModal
											updateUserAvatar={updateAvatar}
											userId={authUser[0].id}
										/>
									)}
									<Avatar
										url={authUser[0]?.selectedAvatarUrl}
										showModal={showAvatarModal}
										caller={"user-page"}
									/>

									<label
										className="user-card__label user-card__label--display-name"
										htmlFor="displayName"
									>
										Display name
									</label>
									<input
										type="text"
										id="displayName"
										className="user-card__input user-card__input--display-name"
										defaultValue={authUser[0]?.userName}
										onChange={(e) => setNewDisplayName(e.target.value)}
									/>
									<label
										htmlFor="accountName"
										className="user-card__label user-card__label--account-name"
									>
										Account name
									</label>
									<input
										type="text"
										id="accountName"
										className="user-card__input user-card__input--account-name"
										value={authUser[0]?.accountName}
										disabled
									/>
									<label
										htmlFor="email"
										className="user-card__label user-card__label--email"
									>
										Email
									</label>
									<input
										type="email"
										id="email"
										className="user-card__input user-card__input--email"
										value={authUser[0]?.email}
										disabled
									/>
									<div className="user-card__buttons">
										<button
											onClick={updateDisplayName}
											className="user-card__button--save"
										>
											Save changes
										</button>
										<button
											className="user-card__button--change-pw"
											onClick={() =>
												instance.loginRedirect({
													authority:
														"https://flashleit.b2clogin.com/flashleit.onmicrosoft.com/B2C_1_PasswordReset",
													scopes: ["openid"],
												})
											}
										>
											Change Password
										</button>
										<button
											onClick={closeAccount}
											className="user-card__button--close-acount"
										>
											Close Account
										</button>
										{/* <button
											onClick={() => instance.logout()}
											className="user-card__button--logout"
										>
											Log Out
										</button> */}
									</div>
								</div>
							</div>
							<div className="user-dashboard__col">
								<div className="user-dashboard__card user-dashboard__card--small">
									<h4 className="user-dashboard__subtitle">
										Interesting Text And Info
									</h4>
								</div>
								<div className="user-dashboard__card user-dashboard__card--large">
									<h4 className="user-dashboard__subtitle">
										User & Collection Stats And Data
									</h4>
								</div>
								<div className="user-dashboard__card">
									<h4 className="user-dashboard__subtitle">
										Upwards Expanding Div / Pick Collection For Specific Data
										Maybe?
									</h4>
								</div>
							</div>
							<div className="user-dashboard__col">
								<div className="user-dashboard__card user-dashboard__card--small">
									<h4 className="user-dashboard__subtitle">
										User Collections{" "}
									</h4>
								</div>
								<div className="user-dashboard__card">
									<h4 className="user-dashboard__subtitle">small</h4>
								</div>
								<div className="user-dashboard__card user-dashboard__card--large">
									<h4 className="user-dashboard__subtitle">
										View Achievements & Information
									</h4>
								</div>

							</div>
						</div>
					)
				)}

			</AuthenticatedTemplate>
			<UnauthenticatedTemplate></UnauthenticatedTemplate>
		</>
	);
}
export default UserPage;
