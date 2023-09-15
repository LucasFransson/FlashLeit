import React, { useState } from 'react';
import Card from '../Card/Card';
import { getRandomColorClass } from '../../utils/getRandomColorClass';
import CardCollectionTypes from '../../types/CardCollectionTypes';
import { useUpdateCollection } from '../../utils/collectionUtility';
import CardTypes from '../../types/CardTypes';
import useLeitnerBox from '../../hooks/useLeitnerBox';
import { useUpdateLeitnerIndex } from '../../utils/cardUtility';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface CardCollectionProps extends CardCollectionTypes {
  collection: CardCollectionTypes;
	cardIndex: number;
	setCardIndex: (index: number) => void;
	setMarkedCards: React.Dispatch<
		React.SetStateAction<{ [key: number]: 'correct' | 'wrong' }>
	>;
	animationOnRendering: 'draw' | 'fade-in';
  boxNumber: string;
	// setAnswerStatus: (status: string) => void;

	// Logic for Leitner:
	updateLastReviewedDate: (card: CardTypes) => void;
  selectBox: (leitnerBox: CardTypes, boxNumber: string) => void;
}

const LeitnerCollection: React.FC<CardCollectionProps> = ({
	collection,
  id,
	title,
	cardIndex,
	setCardIndex,
	// setAnswerStatus,
	setMarkedCards,
	animationOnRendering,
	flashCards = [],
  boxNumber,
	updateLastReviewedDate,
  selectBox
}) => {
	// useState hook for managing current card index
	// const [cardIndex, setCardIndex] = useState(0);
	const updateCollectionsCounter = useUpdateCollection();

	// state for tracking if collection is finished or not
	const [isFinished, setIsFinished] = useState(false);
	// state for tracking card animation for "Dropping card" / unmounting
	const [animateOut, setAnimateOut] = useState(false);
	// state for tracking card animation for Wrong or Correct btn
	const [animationType, setAnimationType] = useState<
		'correct' | 'wrong' | null
	>(null);

  const { userId } = useSelector((state: RootState) => state.userId);

	// Generate random color classes for each card
	const cardColors = flashCards.map(() => getRandomColorClass());

  // Leitner Index update hook:
  const updateLeitnerIndex = useUpdateLeitnerIndex();

	// Function for handling/switching to the next card
	const handleNextCard = (isCorrect: boolean) => {
		if (isCorrect) {
			setAnimationType('correct');
			setMarkedCards((prevState) => ({ ...prevState, [cardIndex]: 'correct' }));
			updateCollectionsCounter(id, 'IncrementCorrectAnswers');

			// --- Update card reviewed date --- 
			updateLastReviewedDate(flashCards[cardIndex]);

      // Update card leitner index:
      
      if (flashCards[cardIndex].leitnerIndex <= 2) {
        const newIndex = flashCards[cardIndex].leitnerIndex + 1;

        const cardToIncrementLeitner: CardTypes = {
          id: flashCards[cardIndex].id,
          collectionId: flashCards[cardIndex].collectionId,
          userId: userId,
          question: flashCards[cardIndex].question,
          answer: flashCards[cardIndex].answer,
          leitnerIndex: newIndex,
          colorClass: null,
          lastReviewedDate: flashCards[cardIndex].lastReviewedDate,
          animationOnRendering: "fade-in"
        };

        updateLeitnerIndex(cardToIncrementLeitner);
      }


		} else {
			setAnimationType('wrong');
			updateCollectionsCounter(id, 'IncrementIncorrectAnswers');
			// setAnswerStatus('wrong');
			setMarkedCards((prevState) => ({ ...prevState, [cardIndex]: 'wrong' }));

			// --- LEITNER Update Reviewed Date ---
			updateLastReviewedDate(flashCards[cardIndex]);

      const cardToResetLeitner: CardTypes = {
          id: flashCards[cardIndex].id,
          collectionId: flashCards[cardIndex].collectionId,
          userId: userId,
          question: flashCards[cardIndex].question,
          answer: flashCards[cardIndex].answer,
          leitnerIndex: 1,
          colorClass: null,
          lastReviewedDate: flashCards[cardIndex].lastReviewedDate,
          animationOnRendering: "fade-in"
        };

        updateLeitnerIndex(cardToResetLeitner);
      }

		setAnimateOut(true);

		setTimeout(() => {
			setAnimateOut(false);
			setAnimationType(null);
			if (cardIndex < flashCards.length - 1) {
				// Check if the current card is the last card
				setCardIndex(cardIndex + 1); // Increment the card index to show the next card
			} else {
				setIsFinished(true);
			}
		}, 1300); // ms animation time
	};

  const oneDay = 24 * 60 * 60 * 1000;
	const threeDays = 72 * 60 * 60 * 1000;
	const sevenDays = 168 * 60 * 60 * 1000;

	const box1 = useLeitnerBox(collection.flashCards, 1, oneDay);
	const box2 = useLeitnerBox(collection.flashCards, 2, threeDays);
	const box3 = useLeitnerBox(collection.flashCards, 3, sevenDays);

  const playAnotherBox = () => {

    setIsFinished(false);


    if (box1.playableCardCount > 0) {
      selectBox(box1.box, 'Box No.1');
    } else if (box2.playableCardCount > 0) {
      selectBox(box2.box, 'Box No.2');
    } else {
      selectBox(box3.box, 'Box No.3');
    }
  }


	return (
		<div className="card-collection">
			<div className="card-collection__heading">
				<h1 className="card-collection__heading--title">{title}</h1>
			</div>
			<p className="card-collection__counter">
				<span>{cardIndex + 1}</span>/<span>{flashCards.length}</span>
			</p>
			{/* Check if there are any cards AND that the current card index is within bounds */}
			{flashCards.length > 0 && !isFinished && cardIndex < flashCards.length ? (
				// Render the Card at cardIndex from the cards array
				<Card
					key={cardIndex}
					id={flashCards[cardIndex].id}
					question={flashCards[cardIndex].question}
					answer={flashCards[cardIndex].answer}
					collectionId={flashCards[cardIndex].collectionId}
					leitnerIndex={flashCards[cardIndex].leitnerIndex}
					lastReviewed={flashCards[cardIndex].lastReviewed}
					colorClass={cardColors[cardIndex]}
					animateOut={animateOut}
					animationType={animationType}
					animationOnRendering={animationOnRendering}
				/>
			) : null}

			{!isFinished ? (
				<div className="card-collection__buttons">
					<button
						className="card-collection__buttons card-collection__buttons--wrong button-next button-next--wrong"
						onClick={() => handleNextCard(false)}
					>
						Wrong
					</button>
					<button
						className="card-collection__buttons card-collection__buttons--correct button-next button-next--correct"
						onClick={() => handleNextCard(true)}
					>
						Correct
					</button>
				</div>
			) : (
				<div className="finished-message">
					<h1>GREAT JOB!</h1>
					
          {box1.playableCardCount > 0 || box2.playableCardCount > 0 || box3.playableCardCount > 0 ? (
            <>
              <h3>You've finished your Leitner challenges for {boxNumber}! 🎉</h3>
              <h3>There are other unfinished Leitner Boxes, would you like to pick another box?</h3>
              <button onClick={() => {playAnotherBox()}}>Yes! Leit me up!</button>
            </>
          ) : (
            <>
              <h3>You've finished all your Leitner challenges for {collection.title}! 🎉</h3>
            </>
          )}
				</div>
			)}
		</div>
	);
};

export default LeitnerCollection;
