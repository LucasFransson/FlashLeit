import CardEditor from '../components/CardEditor/CardEditor';
import LoadingIcon from '../components/LoadingIcon/LoadingIcon';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CollectionSelector from '../components/CollectionSelector/CollectionSelector';
import { useGetCollectionsByUserIdQuery } from '../redux/api/collectionsSlice';
import { useEffect, useState } from 'react';

function EditCardPage() {

	// Retrieve the UserId:
	const { userId } = useSelector((state: RootState) => state.userId);

	// API call for getting the users collections:
	const { data, error, isLoading } = useGetCollectionsByUserIdQuery(userId);

	// useState to hold the id of currently selected collection:
	const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);

	// useEffect to update the selected collection:
	useEffect(() => {
		if(data?.length > 0) {
			setSelectedCollectionId(data[0].id);
		}
	})

	// Update the selected collection:
	const handleCollectionChange = (collectionId : number) => {
		setSelectedCollectionId(collectionId);
	}

	if(isLoading) return <LoadingIcon />;

	if(error) return <div>Error: {error.status} {JSON.stringify(error.data)}</div>;
	return (
		<>
			<div className='edit-card-page'>
				<CollectionSelector collections={data} onCollectionChange={handleCollectionChange}/>
				<CardEditor />
			</div>
		</>
	);
}

export default EditCardPage;
