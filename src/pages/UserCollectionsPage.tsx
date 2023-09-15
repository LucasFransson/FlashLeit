import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CardGrid from '../components/CardGrid/CardGrid';
import CollectionPreview from '../components/CollectionPreview/CollectionPreview';
import { useEffect, useState } from 'react';
import { useGetCollectionsByUserIdQuery } from '../redux/api/collectionsSlice';
import { getRandomColorClass } from '../utils/getRandomColorClass';
import ColorClassContext from '../context/ColorClassContext';
import ErrorMsg from '../components/ErrorMsg/ErrorMsg';
import LoadingIcon from '../components/LoadingIcon/LoadingIcon';
import SearchBar from '../components/Searchbar/Searchbar';

function UserCollectionsPage() {
	const { userId } = useSelector((state: RootState) => state.userId);

	const [skip, setSkip] = useState(true);
	const {
		data: collections,
		isLoading,
		isError,
		error,
	} = useGetCollectionsByUserIdQuery(userId, { skip });

	console.log(collections);

	useEffect(() => {
		if (userId != null) {
			setSkip(false);
		}
	}, [userId]);

	if (isLoading) {
		return <LoadingIcon />;
	}

	if (isError) {
		return <ErrorMsg error={error} />;
	}

	const colorClass = getRandomColorClass();
	return (
		<div className="collections-page">
			<div className="collections-page__favorites">
				<h3>Pinned Collections</h3>
			</div>
			<div className="collections-page__public">
				<h3 className="collections-page__h3 collections-page__h3--public">
					Public Collections
				</h3>
				<SearchBar
					className={
						'collections-page__searchbar collections-page__searchbar--public-collections'
					}
				></SearchBar>
				{/* <CollectionPreview></CollectionPreview> */}
				<div className="collections-page__card-grid collections-page__card-grid--public">
					{collections && (
						<CardGrid
							items={collections}
							Component={CollectionPreview}
							linkPrefix={'collection'}
							className="--public-collections"
						></CardGrid>
					)}
				</div>
			</div>
			<div className="collections-page__user-collections">
				<h3>My Collections</h3>
				<SearchBar
					className={
						'collections-page__searchbar collections-page__searchbar--user-collections'
					}
				></SearchBar>
				<ColorClassContext.Provider value={colorClass}>
					{collections && (
						<CardGrid
							items={collections}
							Component={CollectionPreview}
							linkPrefix={'collection'}
							className="--discover-page"
						></CardGrid>
					)}
				</ColorClassContext.Provider>
			</div>
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
