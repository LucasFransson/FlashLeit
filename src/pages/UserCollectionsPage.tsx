import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CardGrid from "../components/CardGrid/CardGrid";
import CollectionPreview from "../components/CollectionPreview/CollectionPreview";
import { useEffect, useState } from "react";
import { useGetCollectionsByUserIdQuery } from "../redux/api/collectionsSlice";
import { getRandomColorClass } from "../utils/getRandomColorClass";
import ColorClassContext from "../context/ColorClassContext";
import ErrorMsg from "../components/ErrorMsg/ErrorMsg";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";
import { Link } from "react-router-dom";

function UserCollectionsPage() {
	const { userId } = useSelector((state: RootState) => state.userId);

	const [skip, setSkip] = useState(true);
	const { data: collections, isLoading, isError, error } = useGetCollectionsByUserIdQuery(userId, { skip });

	useEffect(() => {
		if (userId != null) {
			setSkip(false);
		}
	}, [userId]);

	const colorClass = getRandomColorClass();
	return (
		<>
			<div className="user-collections-page">
				{isLoading ? (
					<LoadingIcon />
				) : isError ? (
					<ErrorMsg error={error} />
				) : collections?.length >= 1 ? (
						<ColorClassContext.Provider value={colorClass}>{collections && <CardGrid items={collections} Component={CollectionPreview} linkPrefix={"collection"}></CardGrid>}</ColorClassContext.Provider>
				) : (
					<div className="user-collection-page__wrapper">
						<img src="/img/user_avatars/spanish_blob.png" id="spanish__blob" />
						<h3>Spanish blob is trying to tell you that currently, there are no collections connected to your account and that he very much wishes you to try this <Link to="/edit">link (click here)</Link> to create your first collection.</h3>
					</div>
				)}
			</div>
		</>
	);
}

export default UserCollectionsPage;