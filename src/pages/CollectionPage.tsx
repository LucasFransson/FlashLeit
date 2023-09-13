import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useParams } from "react-router-dom";
import { useGetCollectionByIdAndUserIdQuery } from "../redux/api/collectionsSlice";
import CardCollection from "../components/CardCollection/CardCollection";
import CardList from "../components/CardList/CardList";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";
import ErrorMsg from "../components/ErrorMsg/ErrorMsg";

interface RouteParams {
	id: number;
}

function CollectionPage() {
	const { id } = useParams<RouteParams>();

	// Initializing the userId by getting it from the global state of the userId
	const { userId } = useSelector((state: RootState) => state.userId);

	// This is only used to prevent any api calls when the userId is null
	const [skip, setSkip] = useState(true);

	// Initializing the CardIndex var for passing to child components
	const [currentCardIndex, setCurrentCardIndex] = useState(0);

	const [markedCards, setMarkedCards] = useState<{
		[key: number]: "correct" | "wrong";
	}>({});

	const { data, isLoading, isError, error } = useGetCollectionByIdAndUserIdQuery(
		{
			collectionId: id,
			userId: userId,
		},
		{ skip }
	);

	// This useEffect makes sure that userId have a value before allowing any api calls
	useEffect(() => {
		if (userId != null) {
			setSkip(false);
		}
	}, [userId]);

	return (
		<>
			{isLoading ? (
				<LoadingIcon />
			) : isError ? (
				<ErrorMsg error={error} />
			) : (
				data && (
					<div className="cardset-page">
						<CardCollection
							flashCards={data.flashCards}
							title={data.title}
							cardIndex={currentCardIndex}
							setCardIndex={setCurrentCardIndex}
							// setAnswerStatus={setAnswerStatus}
							setMarkedCards={setMarkedCards}
							id={data.id}
						/>
						<CardList
							flashCards={data.flashCards}
							title={data.title}
							highlightedIndex={currentCardIndex}
							// answerStatus={answerStatus}
							markedCards={markedCards}
						/>
					</div>
				)
			)}
		</>
	);
}

export default CollectionPage;
