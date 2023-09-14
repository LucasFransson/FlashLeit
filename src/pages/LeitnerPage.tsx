import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";
import ErrorMsg from "../components/ErrorMsg/ErrorMsg";
import CardCollection from "../components/CardCollection/CardCollection";
import CardList from "../components/CardList/CardList";
import { useGetCollectionByIdAndUserIdQuery } from "../redux/api/collectionsSlice";
import CardTypes from "../types/CardTypes";
import { useUpdateLastReviewedDate } from "../utils/cardUtility";
import LeitnerBox from "../components/LeitnerBoxes/LeitnerBoxes";


function LeitnerPage() {


  const { id } = useParams<RouteParams>();

  const [skip, setSkip] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [markedCards, setMarkedCards] = useState<{
		[key: number]: "correct" | "wrong";
	}>({});

  const { userId } = useSelector((state: RootState) => state.userId);

	const { data, isLoading, isError, error } = useGetCollectionByIdAndUserIdQuery(
		{
			collectionId: id,
			userId: userId,
		},
		{ skip }
	);

  useEffect(() => {
		if (userId != null) {
			setSkip(false);
		}
	}, [userId]);


  // ------ LEITNER LOGIC ------

  const updateLastReviewDate = useUpdateLastReviewedDate();



 

  // Call to update the latest review date (WORKS):
  const updateLastReviewed = (card: CardTypes) => {
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


    updateLastReviewDate(updatedCard);
  }

  const selectBox = (leitnerBox: CardTypes[]) => {
    console.log(leitnerBox);
  }


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
            <LeitnerBox collection={data} selectBox={selectBox}/>
					</div>
				)
			)}
		</>
	);
}

export default LeitnerPage;