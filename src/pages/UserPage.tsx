import { useSelector } from "react-redux";
import Avatar from "../components/Avatar/Avatar";
import { RootState } from "../redux/store";
import { useGetUserByIdQuery } from "../redux/api/usersSlice";
import { useEffect, useState } from "react";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";
import AvatarModal from "../components/Modal/AvatarModal";

function userPage() {

	// const [user, setUser] = useState(null)

	const [showingAvatarModal, setIsShowingAvatarModal] = useState(false);

	const { userId } = useSelector((state: RootState) => state.userId);
	const { data: user, error, isLoading } = useGetUserByIdQuery(userId);

	// useEffect(() => {
	// 	if(data?.length > 0) {
			
	// 		console.log(data[0]);
			
	// 		setUser(data[0])
	// 	}

	// }, [data]);

	const showAvatarModal = () => {
		setIsShowingAvatarModal(true);
	}

	if (isLoading) return <LoadingIcon />;
	
	if (error)
		return (
			<div>
				Error: {error.status} {JSON.stringify(error.data)}
			</div>
		);

	return (
		<div className="user-page">
			{showingAvatarModal && <AvatarModal/>}
			<Avatar url={user[0].avatarUrl} showModal={showAvatarModal} caller={"user-page"}/>
		</div>


	);
}
export default userPage;
