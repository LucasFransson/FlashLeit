import { useSelector } from "react-redux";

import SearchBar from "../components/Searchbar/Searchbar";
import AnimatedGridFade from "../components/AnimatedGridFade";
import { SmallCard } from "../components/Thumbnail";

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
import {
	AuthenticatedTemplate,
	UnauthenticatedTemplate,
} from "@azure/msal-react";

function UserCollectionsPage() {
	const { userId } = useSelector((state: RootState) => state.userId);
	const [skip, setSkip] = useState(true);

	// State vars for searcing collections
	const [searchTermUserCollections, setSearchTermUserCollections] =
		useState("");
	const [searchTermPublicCollections, setSearchTermPublicCollections] =
		useState("");
	// State var for setting randomized color on the collections
	const [coloredCollections, setColoredCollections] = useState<any[]>([]);

	useEffect(() => {
		if (userId != null) {
			setSkip(false);
		}
	}, [userId]);

	// Fetch the Collections that are created by the user
	const {
		data: collections,
		isLoading,
		isError,
		error,
	} = useGetCollectionsByUserIdQuery(userId, { skip });

	// UseEffect for random color
	useEffect(() => {
		if (collections && collections.length > 0) {
			// Assign a random color class to each collection
			const processedData = collections.map((item: any) => ({
				...item,
				colorClass: getRandomColorClass(),
			}));
			setColoredCollections(processedData);
		}
	}, [collections]);

	// Filter Users own Collections based on searchbar
	const filteredUserCollections = Array.isArray(coloredCollections)
		? coloredCollections.filter((c) =>
				c.title.toLowerCase().includes(searchTermUserCollections.toLowerCase())
		  )
		: [];

	// Filter Public Collections based on searchbar
	const filteredPublicCollections = Array.isArray(coloredCollections)
		? coloredCollections.filter((c) =>
				c.title
					.toLowerCase()
					.includes(searchTermPublicCollections.toLowerCase())
		  )
		: [];

	if (isLoading) {
		return <LoadingIcon />;
	}

	if (isError) {
		return <ErrorMsg error={error} />;
	}

	return (
		<div className="collections-page">
			{/* PINNED FAV COLLECTIONS */}
			{/* <div className="collections-page__favorites">
				<h3>Pinned Collections</h3>
			</div> */}
			{/* PUBLIC COLLECTIONS */}
			<div className="collections-page__public">
				<h3 className="collections-page__h3 collections-page__h3--public">
					Public Collections
				</h3>
				<SearchBar
					searchTerm={searchTermPublicCollections}
					setSearchTerm={setSearchTermPublicCollections}
					className={
						"collections-page__searchbar collections-page__searchbar--public-collections"
					}
				></SearchBar>
				<div className="collections-page__card-grid collections-page__card-grid--public">
					{collections && (
						<AnimatedGridFade
							items={filteredPublicCollections}
							Component={SmallCard}
							linkPrefix={"collection"}
							className={"--muted-coral small-card"}
						></AnimatedGridFade>
						// <CardGrid
						// 	items={filteredPublicCollections}
						// 	Component={CollectionPreview}
						// 	linkPrefix={'collection'}
						// 	className="--public-collections"
						// ></CardGrid>
					)}
				</div>
			</div>
			{/* USER COLLECTIONS */}
			<div className="collections-page__user-collections">
				<h3 className="collections-page__h3 collections-page__h3--user-collections">
					My Collections
				</h3>
				<SearchBar
					searchTerm={searchTermUserCollections}
					setSearchTerm={setSearchTermUserCollections}
					className={
						"collections-page__searchbar collections-page__searchbar--user-collections"
					}
				></SearchBar>

				{collections && (
					<CardGrid
						items={filteredUserCollections}
						Component={CollectionPreview}
						linkPrefix={"collection"}
						className="--discover-page"
					></CardGrid>
				)}
			</div>
		</div>
		// const colorClass = getRandomColorClass();
		// return (
		// 	<>
		// 		<AuthenticatedTemplate>
		// 			<div className="user-collections-page">
		// 				{isLoading ? (
		// 					<LoadingIcon />
		// 				) : isError ? (
		// 					<ErrorMsg error={error} />
		// 				) : collections?.length >= 1 ? (
		// 					<ColorClassContext.Provider value={colorClass}>
		// 						{collections && <CardGrid items={collections} Component={CollectionPreview} linkPrefix={"collection"}></CardGrid>}
		// 					</ColorClassContext.Provider>
		// 				) : (
		// 					<div className="user-collection-page__wrapper">
		// 						<img src="/img/user_avatars/spanish_blob.png" id="spanish__blob" />
		// 						<h3>
		// 							Spanish blob is trying to tell you that currently, there are no collections connected to your account and that he very much wishes you to try this{" "}
		// 							<Link to="/edit">link (click here)</Link> to create your first collection.
		// 						</h3>
		// 					</div>
		// 				)}
		// 			</div>
		// 		</AuthenticatedTemplate>
		// 		<UnauthenticatedTemplate></UnauthenticatedTemplate>
		// 	</>
		// );
	);
}

export default UserCollectionsPage;
