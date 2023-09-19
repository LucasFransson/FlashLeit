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
						<div className="user-dashboard">
							<div className="user-dashboard__col">
								<div className=" user-dashboard__card--flat user-dashboard__card--flat">
									<h1 className="user-dashboard__title">
										{authUser[0]?.userName}
									</h1>
									<p className="user-dashboard__description">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Consectetur, adipisci.
									</p>
									<small className="user-dashboard__note">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Illo molestias earum magni numquam quo ut voluptatibus
										expedita a qui cupiditate!
									</small>
								</div>
								<div className="user-dashboard__card user-dashboard__card--xl">
									<h4 className="user-dashboard__subtitle">Profile Card</h4>
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
										User Collections{' '}
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

				{/* WORKING */}
				{/* <div className="user-dashboard">
					<div className="user-dashboard__col">
						<div className="user-dashboard__card user-dashboard__card--flat user-dashboard__card--small">
							<h1 className="user-dashboard__title">
								Dashbo<span className="highlight">.</span>
							</h1>
							<p className="user-dashboard__description">
								we're excited you're here, net neutrality syndicated Journal
								Register shoot a photo hashtag curmudgeon 5% corruption analog.
							</p>
							<small className="user-dashboard__note">
								This Week in Review content is king engagement Romenesko RSS
								Wikipedia, data visualization advertising privacy discuss
							</small>
						</div>
						<div className="user-dashboard__card user-dashboard__card--xl">
							<h4 className="user-dashboard__subtitle">Key Indicators</h4>
						</div>
					</div>
					<div className="user-dashboard__col">
						<div className="user-dashboard__card user-dashboard__card--small">
							<h4 className="user-dashboard__subtitle">Shoe Size</h4>
						</div>
						<div className="user-dashboard__card user-dashboard__card--large">
							<h4 className="user-dashboard__subtitle">Demographics</h4>
						</div>
						<div className="user-dashboard__card">
							<h4 className="user-dashboard__subtitle">Location</h4>
						</div>
					</div>
					<div className="user-dashboard__col">
						<div className="user-dashboard__card">
							<h4 className="user-dashboard__subtitle">Properties</h4>
						</div>
						<div className="user-dashboard__card">
							<h4 className="user-dashboard__subtitle">Directorships</h4>
						</div>
						<div className="user-dashboard__card user-dashboard__card--large">
							<h4 className="user-dashboard__subtitle">Brand Matches</h4>
						</div>
					</div>
				</div> */}

				{/* working with CardGrid

<div className="user-dashboard">
			<div className="user-dashboard__col">
				<div className="user-dashboard__card user-dashboard__card--flat user-dashboard__card--small">
					<h1 className="user-dashboard__title">
						Dashbo<span className="highlight">.</span>
					</h1>
					<p className="user-dashboard__description">
						we're excited you're here, net neutrality syndicated Journal
						Register shoot a photo hashtag curmudgeon 5% corruption analog.
					</p>
					<small className="user-dashboard__note">
						This Week in Review content is king engagement Romenesko RSS
						Wikipedia, data visualization advertising privacy discuss
					</small>
				</div>
				<div className="user-dashboard__card user-dashboard__card--xl">
					<h2 className="user-dashboard__subtitle">Key Indicators</h2>
				</div>
			</div>
			<div className="user-dashboard__col">
				<div className="user-dashboard__card user-dashboard__card--small">
					<h2 className="user-dashboard__subtitle">Shoe Size</h2>
				</div>
				<div className="user-dashboard__card user-dashboard__card--large">
					<h2 className="user-dashboard__subtitle">Demographics</h2>
				</div>
				<div className="user-dashboard__card">
					<h2 className="user-dashboard__subtitle">Location</h2>
				</div>
			</div>
			<div className="user-dashboard__col">
				<div className="user-dashboard__card">
					<h2 className="user-dashboard__subtitle">Properties</h2>
				</div>
				<div className="user-dashboard__card">
					<h2 className="user-dashboard__subtitle">Directorships</h2>
				</div>
				<div className="user-dashboard__card user-dashboard__card--large">
					<h2 className="user-dashboard__subtitle">Brand Matches</h2>
				</div>
			</div>
		</div>
 */}

				{/* <div className="user-dashboard">
					<div className="user-dashboard__col">
						<div className="user-dashboard__card user-dashboard__card--flat user-dashboard__card--small">
							<h1 className="user-dashboard__title">
								Dashbo<span className="highlight">.</span>
							</h1>
							<p className="user-dashboard__description">
								we're excited you're here, net neutrality syndicated Journal
								Register shoot a photo hashtag curmudgeon 5% corruption analog.
							</p>
							<small className="user-dashboard__note">
								This Week in Review content is king engagement Romenesko RSS
								Wikipedia, data visualization advertising privacy discuss
							</small>
						</div>
						<div className="user-dashboard__card user-dashboard__card--xl">
							<h2 className="user-dashboard__subtitle">Key Indicators</h2>
						</div>
					</div>
					<div className="user-dashboard__col">
						<div className="user-dashboard__card user-dashboard__card--small">
							<h2 className="user-dashboard__subtitle">Shoe Size</h2>
						</div>
						<div className="user-dashboard__card user-dashboard__card--large">
							<h2 className="user-dashboard__subtitle">Demographics</h2>
						</div>
						<div className="user-dashboard__card">
							<h2 className="user-dashboard__subtitle">Location</h2>
						</div>
					</div>
					<div className="user-dashboard__col">
						<div className="user-dashboard__card">
							<h2 className="user-dashboard__subtitle">Properties</h2>
						</div>
						<div className="user-dashboard__card">
							<h2 className="user-dashboard__subtitle">Directorships</h2>
						</div>
						<div className="user-dashboard__card user-dashboard__card--large">
							<h2 className="user-dashboard__subtitle">Brand Matches</h2>
						</div>
					</div>
				</div> */}
			</AuthenticatedTemplate>
		</>
	);
}
export default UserPage;
