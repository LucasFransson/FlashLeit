import React, { useState } from "react";
import Card from "../Card/Card";
import { getRandomColorClass } from "../../utils/getRandomColorClass";
import CardCollectionTypes from "../../types/CardCollectionTypes";
import { useUpdateCollection } from "../../utils/collectionUtility";
import { useAchievementService } from "../../utils/achievementsUtility";

interface CardCollectionProps extends CardCollectionTypes {
	cardIndex: number;
	setCardIndex: (index: number) => void;
	setMarkedCards: React.Dispatch<React.SetStateAction<{ [key: number]: "correct" | "wrong" }>>;
	animationOnRendering: "draw" | "fade-in";
	// setAnswerStatus: (status: string) => void;
}

const CardCollection: React.FC<CardCollectionProps> = ({
	id,
	title,
	cardIndex,
	setCardIndex,
	// setAnswerStatus,
	setMarkedCards,
	animationOnRendering,
	flashCards = [],
}) => {
	const { unlockCorrectAnswersAchievement, unlockInCorrectAnswersAchievement, unlockCompletedRunsAchievement } = useAchievementService();
	// useState hook for managing current card index
	// const [cardIndex, setCardIndex] = useState(0);
	const updateCollectionsCounter = useUpdateCollection();

	// state for tracking if collection is finished or not
	const [isFinished, setIsFinished] = useState(false);
	// state for tracking card animation for "Dropping card" / unmounting
	const [animateOut, setAnimateOut] = useState(false);
	// state for tracking card animation for Wrong or Correct btn
	const [animationType, setAnimationType] = useState<"correct" | "wrong" | null>(null);

	// Generate random color classes for each card
	const cardColors = flashCards.map(() => getRandomColorClass());

	// Function for handling/switching to the next card
	const handleNextCard = (isCorrect: boolean) => {
		if (isCorrect) {
			setAnimationType("correct");
			setMarkedCards(prevState => ({ ...prevState, [cardIndex]: "correct" }));
			updateCollectionsCounter(id, "IncrementCorrectAnswers");
			unlockCorrectAnswersAchievement();
		} else {
			setAnimationType("wrong");
			updateCollectionsCounter(id, "IncrementIncorrectAnswers");
			unlockInCorrectAnswersAchievement();
			// setAnswerStatus('wrong');
			setMarkedCards(prevState => ({ ...prevState, [cardIndex]: "wrong" }));
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
				updateCollectionsCounter(id, "IncrementCompletedRuns");
				console.log("Finished answering all cards!");

				const isAchievementUnlocked = unlockCompletedRunsAchievement();
				if (isAchievementUnlocked) {
					console.log("Hello");
				} else {
					console.log("Bye");
				}
			}
		}, 1300); // ms animation time

		// // Check if the current card is the last card
		// if (cardIndex < flashCards.length - 1) {
		// 	// Increment the card index to show the next card
		// 	setCardIndex(cardIndex + 1);
		// } else {
		// 	console.log('Finished answering all cards!');
		// }
	};

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
					<button className="card-collection__buttons card-collection__buttons--wrong button-next button-next--wrong" onClick={() => handleNextCard(false)}>
						Wrong
					</button>
					<button className="card-collection__buttons card-collection__buttons--correct button-next button-next--correct" onClick={() => handleNextCard(true)}>
						Correct
					</button>
				</div>
			) : (
				<div className="finished-message">
					<h1>GREAT JOB!</h1>
					You've finished the collection! 🎉
				</div>
			)}
		</div>
	);

	// return (
	// 	<div className="card-collection">
	// 		<div className="card-collection__heading">
	// 			<h1 className="card-collection__heading--title">{title}</h1>
	// 		</div>
	// 		<p className="card-collection__counter">
	// 			<span>{cardIndex + 1}</span>/<span>{flashCards.length}</span>
	// 		</p>
	// 		{/* Check if there are any cards AND that the current card index is within bounds */}
	// 		{flashCards.length > 0 && cardIndex < flashCards.length && (
	// 			// Render the Card at cardIndex from the cards array
	// 			<Card
	// 				key={cardIndex} // This Key Forces a re-mount of the Card Component, causing the useState hook to reset the components initial value, ensuring that the Card starts with the front side facing up
	// 				id={flashCards[cardIndex].id}
	// 				question={flashCards[cardIndex].question}
	// 				answer={flashCards[cardIndex].answer}
	// 				collectionId={flashCards[cardIndex].collectionId} // Not correct? This is the card id not the collection id
	// 				leitnerIndex={flashCards[cardIndex].leitnerIndex}
	// 				lastReviewed={flashCards[cardIndex].lastReviewed}
	// 				colorClass={cardColors[cardIndex]} // Pass the random color class as a prop
	// 				animateOut={animateOut} // pass the animateOut state as a prop
	// 				animationType={animationType} // oass the animation type state as prop
	// 				animationOnRendering={animationOnRendering}
	// 			/>
	// 		)}

	// 		<div className="card-collection__buttons">
	// 			{/* Div for Buttons */}
	// 			<button
	// 				className="card-collection__buttons card-collection__buttons--wrong button-next button-next--wrong"
	// 				onClick={() => handleNextCard(false)}
	// 				//disabled={cardIndex === flashCards.length} // if the Current Card is the last one, Disable the button
	// 				// 	disabled={isFlipped} !
	// 			>
	// 				Wrong
	// 			</button>
	// 			<button
	// 				className="card-collection__buttons card-collection__buttons--correct button-next button-next--correct"
	// 				onClick={() => handleNextCard(true)}
	// 				//disabled={cardIndex === flashCards.length} // if the Current Card is the last one, Disable the button
	// 			>
	// 				Correct
	// 			</button>
	// 		</div>
	// 	</div>
	// );
};

export default CardCollection;
