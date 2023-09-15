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
import LeitnerCollection from "../components/LeitnerCollection/LeitnerCollection";


function LeitnerPage() {

  const [selectedBox, setSelectedBox] = useState<CardTypes[]>([])
  const [isSelectedBox, setIsSelectedBox] = useState(false);
  const [leitnerBoxNumber, setLeitnerBoxNumber] = useState('');

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

  const updateReviewDate = useUpdateLastReviewedDate();



 

  // Call to update the latest review date (WORKS):
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

    // removeCardFromSelectedBox(card);

    // checkIfLeitnerBoxIsEmpty();
  }

  const removeCardFromSelectedBox = (cardToRemove: CardTypes) => {
    const updatedLeitnerBox = selectedBox.filter(card => card.id !== cardToRemove.id);

    setSelectedBox(updatedLeitnerBox);

    console.log(selectedBox);
  }

  const checkIfLeitnerBoxIsEmpty = () => {
    console.log(selectedBox);
  }

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
          <LeitnerBox collection={data} selectBox={selectBox}/>
                
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
          <h1>Pick your desired Leitner Box</h1>)}
          </div>
        )} 
      </>     
  );
}


export default LeitnerPage;