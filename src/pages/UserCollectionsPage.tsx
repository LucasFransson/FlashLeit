import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CardGrid from '../components/CardGrid/CardGrid';
import CollectionPreview from '../components/CollectionPreview/CollectionPreview';
import { useEffect, useState } from 'react';
import { useGetCollectionsByUserIdQuery } from '../redux/api/collectionsSlice';

import { getRandomColorClass } from '../utils/getRandomColorClass';
import ColorClassContext from '../context/ColorClassContext';
import useFetch from '../hooks/useFetch';

function UserCollectionsPage() {
	const { userId } = useSelector((state: RootState) => state.userId);

	const [skip, setSkip] = useState(true);
	const {
		data: collections,
		isLoading,
		isError,
	} = useGetCollectionsByUserIdQuery(userId, { skip });

	// const {
	// 	data: collections,
	// 	isLoading,
	// 	isError,
	// } = useFetch(`https://flashleit.azure-api.net/api/collections/user/${userId}`,[]as Array<any>)

	console.log(collections);

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
	const colorClass = getRandomColorClass();
	return (
		<div className="user-collections-page">
			<ColorClassContext.Provider value={colorClass}>
				{collections && (
					<CardGrid
						items={collections}
						Component={CollectionPreview}
						linkPrefix={'collection'}
					></CardGrid>
				)}
			</ColorClassContext.Provider>
		</div>
	);
}

export default UserCollectionsPage;

// const coloredCollections = collections.map(collection => ({
// 	...collection,
// 	colorClass: getRandomColorClass()
// }));

// const colorClass = getRandomColorClass();

// 	return (
// 		<div className="user-collections-page">
// 			<ColorClassContext.Provider value={colorClass}>
// 				{collections && (
// 					<CardGrid
// 						items={collections}
// 						Component={CollectionPreview}
// 						linkPrefix={'collection'}
// 					></CardGrid>
// 				)}
// 			</ColorClassContext.Provider>
// 		</div>
// 	);

// const colorClass = getRandomColorClass();
// // console.log(colorClass);
{
	/* <ColorClassContext.Provider value={colorClass}> */
}
{
	/* </ColorClassContext.Provider> */
}
// const [colClass, setColClass] = useState<string | null>(null);

// useEffect(() => {
// 	if (!colClass) {
// 		setColClass(getRandomColorClass()); // Assign a color class only once when the component loads
// 	}
// }, [colClass]);
