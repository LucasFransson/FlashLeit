import React, { useState } from "react";
import Card from "../Card/Card";
import { getRandomColorClass } from "../../utils/getRandomColorClass";
import CardCollectionTypes from "../../types/CardCollectionTypes";
import {
	useCloneCollection,
	useUpdateCollection,
} from "../../utils/collectionUtility";
import { useAchievementService } from "../../utils/achievementsUtility";
import { Link } from "react-router-dom";
import AchievementTypes from "../../types/AchievementTypes";
import AvatarTypes from "../../types/AvatarTypes";
import AchievementCard from "../AchievementCard/AchievementCard";

interface CardCollectionProps extends CardCollectionTypes {
	cardIndex: number;
	setCardIndex: (index: number) => void;
	setMarkedCards: React.Dispatch<
		React.SetStateAction<{ [key: number]: "correct" | "wrong" }>
	>;
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
	...restProps
}) => {
	const {
		unlockCorrectAnswersAchievement,
		unlockInCorrectAnswersAchievement,
		unlockCompletedRunsAchievement,
	} = useAchievementService();
	const [achievement, setAchievement] = useState<
		[AchievementTypes | AvatarTypes] | null
	>(null);

	// useState hook for managing current card index
	// const [cardIndex, setCardIndex] = useState(0);
	const updateCollectionsCounter = useUpdateCollection();

	// state for tracking if collection is finished or not
	const [isFinished, setIsFinished] = useState(false);
	// state for tracking card animation for "Dropping card" / unmounting
	const [animateOut, setAnimateOut] = useState(false);
	// state for tracking card animation for Wrong or Correct btn
	const [animationType, setAnimationType] = useState<
		"correct" | "wrong" | null
	>(null);

	const [hasClonedCollection, setHasClonedCollection] = useState(false);

	// Generate random color classes for each card
	const cardColors = flashCards.map(() => getRandomColorClass());

	// Function for handling/switching to the next card
	const handleNextCard = (isCorrect: boolean) => {
		if (isCorrect) {
			setAnimationType("correct");
			setMarkedCards((prevState) => ({ ...prevState, [cardIndex]: "correct" }));

			if (!restProps.isDemo) {
				updateCollectionsCounter(id, "IncrementCorrectAnswers");
				const achievement = unlockCorrectAnswersAchievement();
				setAchievement(achievement);
			}
		} else {
			setAnimationType("wrong");
			setMarkedCards((prevState) => ({ ...prevState, [cardIndex]: "wrong" }));

			if (!restProps.isDemo) {
				updateCollectionsCounter(id, "IncrementIncorrectAnswers");

				const achievement = unlockInCorrectAnswersAchievement();
				setAchievement(achievement);
			}
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

				if (!restProps.isDemo) {
					updateCollectionsCounter(id, "IncrementCompletedRuns");

					const achievement = unlockCompletedRunsAchievement();
					setAchievement(achievement);
				}
			}
		}, 1300); // ms animation time
	};

	// Cloning
	const cloneCollection = useCloneCollection();

	const cloneUserCollection = () => {
		const clonedCollection: CardCollectionTypes = {
			id: id,
			title: title,
			userId: restProps.authorId,
			description: restProps.description,
			amountOfCompletedRuns: 0,
			amountOfCorrectAnswers: 0,
			amountOfIncorrectAnswers: 0,
			publicKey: 0,
			flashCards: flashCards,
			isPublic: false,
			cardCount: flashCards.length,
		};

		// user logged in
		cloneCollection(restProps.userId, clonedCollection);
		setHasClonedCollection(true);
	};

	return (
		<div className="card-collection">
			<div className="card-collection__heading">
				<h1 className="card-collection__heading--title">{title}</h1>
			</div>
			<p className="card-collection__counter">
				<span>{cardIndex + 1}</span>/<span>{flashCards.length}</span>
			</p>
			{achievement && (
				<AchievementCard achievement={achievement[0]} avatar={achievement[1]} />
			)}
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
			) : !restProps.isDemo ? (
				<div className="finished-message">
					<h1>GREAT JOB!</h1>
					You've finished the collection! 🎉
				</div>
			) : !hasClonedCollection ? (
				<div className="finished-message">
					<h1>GREAT JOB!</h1>
					You've finished the demo collection! 🎉 Click{" "}
					<button onClick={cloneUserCollection}>here</button> to clone it to
					your collections!
				</div>
			) : (
				<div className="finished-message">
					<h1>THANK YOU!</h1>
					You've successfully cloned {title} to your collections! 🎉 Click{" "}
					<Link to="/collections">here</Link> to see your collections!
				</div>
			)}
		</div>
	);
};
export default CardCollection;
