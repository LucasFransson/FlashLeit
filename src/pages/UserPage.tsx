import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AuthenticatedTemplate, useMsal } from '@azure/msal-react';
import { useGetUserByIdQuery } from '../redux/api/usersSlice';
import { useGetCollectionsByUserIdQuery } from '../redux/api/collectionsSlice';
import { useDeleteUser, useUpdateUser } from '../utils/userUtility';
import Avatar from '../components/Avatar/Avatar';
import LoadingIcon from '../components/LoadingIcon/LoadingIcon';
import AvatarModal from '../components/Modal/AvatarModal';
import ErrorMsg from '../components/ErrorMsg/ErrorMsg';
import UserTypes from '../types/UsersTypes';
import HeartButton from '../components/HeartButton';
import Thumbnail from '../components/Thumbnail';
import { SmallCard } from '../components/Thumbnail';
import WaveBackground from '../design components/WaveBackground.jsx';
import DeleteButton from '../components/DeleteSVGButton.js';

function UserPage() {
	const [skip, setSkip] = useState(true);
	const [newDisplayName, setNewDisplayName] = useState('');
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
				avatarUrl: authUser[0].avatarUrl,
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
				avatarUrl: url,
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
						<div className="user-page ">
							{showingAvatarModal && (
								<AvatarModal updateUserAvatar={updateAvatar} />
							)}
							<Avatar
								url={authUser[0]?.avatarUrl}
								showModal={showAvatarModal}
								caller={'user-page'}
							/>
							<div>
								<label htmlFor="displayName">Display name</label>
								<input
									type="text"
									id="displayName"
									defaultValue={authUser[0]?.userName}
									onChange={(e) => setNewDisplayName(e.target.value)}
								/>
								<label htmlFor="accountName">Account name</label>
								<input
									type="text"
									id="accountName"
									value={authUser[0]?.accountName}
									disabled
								/>
								<label htmlFor="email">Email</label>
								<input
									type="email"
									id="email"
									value={authUser[0]?.email}
									disabled
								/>

								<button onClick={updateDisplayName}>Save changes</button>
								<button
									onClick={() =>
										instance.loginRedirect({
											authority:
												'https://flashleit.b2clogin.com/flashleit.onmicrosoft.com/B2C_1_PasswordReset',
											scopes: ['openid'],
										})
									}
								>
									Change Password
								</button>
								<button onClick={() => instance.logout()}>Log Out</button>
								<button onClick={closeAccount}>Close Account</button>
							</div>
							<DeleteButton></DeleteButton>
							<HeartButton></HeartButton>
							<LoadingIcon></LoadingIcon>
							{/* <div className="abcdef">
								<WaveBackground></WaveBackground>
							</div> */}
							{/* <Thumbnail></Thumbnail> */}
							<div className="grid-container--small-card">
								<SmallCard className={'--dusty-rose small-card'}></SmallCard>
								<SmallCard className={'--soft-peach small-card'}></SmallCard>
								<SmallCard className={'--muted-coral small-card'}></SmallCard>
								<SmallCard className={'--warm-taupe small-card'}></SmallCard>
								<SmallCard className={' small-card'}></SmallCard>
							</div>
						</div>
					)
				)}
			</AuthenticatedTemplate>
		</>
	);
}
export default UserPage;
