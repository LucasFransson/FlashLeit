import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CardGrid from "../components/CardGrid/CardGrid";
import CollectionPreview from "../components/CollectionPreview/CollectionPreview";
import { useEffect, useState } from "react";
import { useGetCollectionsByUserIdQuery } from "../redux/api/collectionsSlice";

function UserCollectionsPage() {
	const { userId } = useSelector((state: RootState) => state.userId);
	const [skip, setSkip] = useState(true);

	const { data: collections, isLoading, isError } = useGetCollectionsByUserIdQuery(userId, { skip });

	useEffect(() => {
		if (userId != null) {
			setSkip(false);
		}
	}, [userId]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: Something went wrong!</div>;
	}

	return <div className="user-collections-page">{collections && <CardGrid items={collections} Component={CollectionPreview} linkPrefix={"collection"}></CardGrid>}</div>;
}

export default UserCollectionsPage;
