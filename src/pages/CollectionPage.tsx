import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useParams } from 'react-router-dom';
import { useGetCollectionByIdAndUserIdQuery } from '../redux/api/collectionsSlice';
import CardCollection from '../components/CardCollection/CardCollection';
import CardList from '../components/CardList/CardList';
import LoadingIcon from '../components/LoadingIcon/LoadingIcon';
import ErrorMsg from '../components/ErrorMsg/ErrorMsg';
import Toggler from '../components/Toggler/Toggler';
import LeitnerBoxes from '../components/LeitnerBoxes/LeitnerBoxes';
import CardTypes from '../types/CardTypes';
import LeitnerCollection from '../components/LeitnerCollection/LeitnerCollection';
import { useUpdateLastReviewedDate } from '../utils/cardUtility';

interface RouteParams {
	id: number;
}

function CollectionPage() {
	
	// --- Leitner UseStates ---
	const [selectedBox, setSelectedBox] = useState<CardTypes[]>([])
  const [isSelectedBox, setIsSelectedBox] = useState(false);
  const [leitnerBoxNumber, setLeitnerBoxNumber] = useState('');

	// Get collection id from route parameters:
	const { id } = useParams<RouteParams>();

	const [isShowingRegularCollection, setIsShowingRegularCollection] = useState(true);

	// Initializing the userId by getting it from the global state of the userId
	const { userId } = useSelector((state: RootState) => state.userId);

	// This is only used to prevent any api calls when the userId is null
	const [skip, setSkip] = useState(true);

	// Initializing the CardIndex var for passing to child components
	const [currentCardIndex, setCurrentCardIndex] = useState(0);

	const [markedCards, setMarkedCards] = useState<{
		[key: number]: 'correct' | 'wrong';
	}>({});

	const { data, isLoading, isError, error } =
		useGetCollectionByIdAndUserIdQuery(
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

	const handleToggle = (toggleChange: boolean) => {
		
		if (toggleChange) {
			setIsSelectedBox(false);
			setSelectedBox([])
		}
		
		setIsShowingRegularCollection(toggleChange);
		setCurrentCardIndex(0);
		setMarkedCards({});

		
	}


	// --- Leitner functions ---

		// --- Update last reviewed date --- 

	const updateReviewDate = useUpdateLastReviewedDate();

	const updateLastReviewedDate = (card: CardTypes) => {
		
		const currentDate = new Date().toISOString();

		const updatedCard: CardTypes = {
			id: card.id,
			collectionId: card.collectionId,
			userId: userId,
			question: card.question,
			answer: card.answer,
			leitnerIndex: card.leitnerIndex,
			lastReviewed: currentDate,
			colorClass: null
		};

		updateReviewDate(updatedCard);
	}

	// --- Select Leitner box:

	const selectBox = (leitnerBox: CardTypes[], boxNumber: string) => {
    
		setSelectedBox(leitnerBox);
    setIsSelectedBox(true);
    setLeitnerBoxNumber(boxNumber);

    setMarkedCards({});
    setCurrentCardIndex(0);
  }

	return (
		<>
			{isLoading ? (
				<LoadingIcon />
			) : isError || !data ? (
				<ErrorMsg error={error} />
			) : (
				<div className="cardset-page">
					<Toggler onToggle={handleToggle} isChecked={isShowingRegularCollection}/>
					{isShowingRegularCollection ? (
						<>	
							<CardCollection
								flashCards={data.flashCards}
								title={data.title}
								cardIndex={currentCardIndex}
								setCardIndex={setCurrentCardIndex}
								// setAnswerStatus={setAnswerStatus}
								setMarkedCards={setMarkedCards}
								id={data.id}
								animationOnRendering="draw"
							/>
							<CardList
								flashCards={data.flashCards}
								title={data.title}
								highlightedIndex={currentCardIndex}
								// answerStatus={answerStatus}
								markedCards={markedCards}
							/>
						</>
					) : (
						<>
							<LeitnerBoxes collection={data} selectBox={selectBox}/>
                
							{isSelectedBox ? (
								<>
									<LeitnerCollection
										collection={data}
										flashCards={selectedBox}
										title={`${data.title} (${leitnerBoxNumber})`}
										boxNumber={leitnerBoxNumber}
										cardIndex={currentCardIndex}
										setCardIndex={setCurrentCardIndex}
										// setAnswerStatus={setAnswerStatus}
										setMarkedCards={setMarkedCards}
										id={data.id}
										updateLastReviewedDate={updateLastReviewedDate}
										selectBox={selectBox}
									/>
									<CardList
										flashCards={selectedBox}
										title={data.title}
										highlightedIndex={currentCardIndex}
										// answerStatus={answerStatus}
										markedCards={markedCards}
									/>
								</>
          		) : (
          			<h1>Pick your desired Leitner Box</h1>
							)}
						</>
					)}
				</div>
			)}		
		</>
	);
}

export default CollectionPage;
