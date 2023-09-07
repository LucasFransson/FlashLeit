import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import CardGrid from '../components/CardGrid/CardGrid';
import CollectionPreview from "../components/CollectionPreview/CollectionPreview";
import useFetch from "../hooks/useFetch";

function UserCollectionsPage() {
	
	const { userId } = useSelector((state: RootState) => state.userId);

	const {
		data: collections,
		loading,
		error,
	} = useFetch (
		`https://flashleit.azure-api.net/api/collections/user/${userId}`,
		[] as Array<any>
	);
	
	if(loading) {
		return <div>Loading...</div>;
	}

	if(error) {
		return <div>Error: {error.message}</div>
	}
	
	return <div className="user-collections-page">
		<CardGrid items={collections} Component={CollectionPreview} linkPrefix={"collection"}></CardGrid>
	</div>;
}

export default UserCollectionsPage;
