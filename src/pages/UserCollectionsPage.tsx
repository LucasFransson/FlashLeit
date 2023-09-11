import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CardGrid from '../components/CardGrid/CardGrid';
import CollectionPreview from '../components/CollectionPreview/CollectionPreview';
import { useEffect, useState } from 'react';
import { useGetCollectionsByUserIdQuery } from '../redux/api/collectionsSlice';
import { getRandomColorClass } from '../utils/getRandomColorClass';

function UserCollectionsPage() {
	const { userId } = useSelector((state: RootState) => state.userId);
	const [skip, setSkip] = useState(true);
	const [colClass, setColClass] = useState<string | null>(null);

	const {
		data: collections,
		isLoading,
		isError,
	} = useGetCollectionsByUserIdQuery(userId, { skip });

	useEffect(() => {
		if (userId != null) {
			setSkip(false);
		}
	}, [userId]);

	useEffect(() => {
		if (!colClass) {
			setColClass(getRandomColorClass()); // Assign a color class only once when the component loads
		}
	}, [colClass]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: Something went wrong!</div>;
	}

	// const colClass = getRandomColorClass();
	// console.log(colClass);

	return (
		<div className="user-collections-page">
			{collections && (
				<CardGrid
					items={collections}
					Component={CollectionPreview}
					linkPrefix={'collection'}
					styleClass={colClass}
				></CardGrid>
			)}
		</div>
	);
}

export default UserCollectionsPage;
