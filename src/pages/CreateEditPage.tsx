// Imports
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
	useGetCollectionByIdAndUserIdQuery,
	useGetAuthoredCollectionsQuery,
} from "../redux/api/collectionsSlice";
import { useDeleteCard } from "../utils/cardUtility";
import { useDeleteCollection } from "../utils/collectionUtility";
import { useAchievementService } from "../utils/achievementsUtility";

// Components
import CardEditor from "../components/CardEditor/CardEditor";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";
import CollectionSelector from "../components/CollectionSelector/CollectionSelector";
import AddCollection from "../components/AddCollection/AddCollection";
import CardGrid from "../components/CardGrid/CardGrid";
import Card from "../components/Card/Card";
import Toggler from "../components/Toggler/Toggler";
import Carousel from "../components/Carousel";
import Dropdown from "../components/Dropdown";
import ToggleButtons from "../components/ToggleButtons";

// Types
import CardGridTypes from "../types/CardGridTypes";
import CardTypes from "../types/CardTypes";
import CardCollectionTypes from "../types/CardCollectionTypes";
import AnimationClassContext from "../context/AnimationContext";

function EditCardPage() {
	// STATE MANAGEMENT TODO:
	const [selectedCard, setSelectedCard] = useState<CardTypes>({
		id: 0,
		collectionId: 0,
		userId: 0,
		question: "",
		answer: "",
		leitnerIndex: 1,
		lastReviewed: null,
		colorClass: null,
		animationOnRendering: "fade-in",
	});
	const [achievement, setAchievement] = useState<
		[AchievementTypes | AvatarTypes] | null
	>(null);

	const [isEditMode, setIsEditMode] = useState(true);
	const [selectedCollectionId, setSelectedCollectionId] = useState<
		number | null
	>(null);
	const [flashCards, setFlashCards] = useState<CardTypes[] | null>([]);

	// SELECTORS AND HOOKS TODO:
	const { userId } = useSelector((state: RootState) => state.userId);
	const deleteCard = useDeleteCard();
	const deleteCollection = useDeleteCollection();
	const { unlockCreateAchievement } = useAchievementService();

	// API CALLS TODO:
	const {
		data: collectionData,
		error: collectionError,
		isLoading: collectionLoading,
	} = useGetAuthoredCollectionsQuery(userId, {
		skip: userId === null || userId === undefined,
	});

	const {
		data: cardsData,
		error: cardsError,
		isLoading: cardsLoading,
	} = useGetCollectionByIdAndUserIdQuery(
		{
			collectionId: selectedCollectionId,
			userId: userId,
		},
		{
			skip:
				selectedCollectionId === null ||
				selectedCollectionId === undefined ||
				selectedCollectionId === 0,
		}
	);

	// EFFECTS TODO:

	useEffect(() => {
		if (collectionData?.length > 0) {
			setSelectedCollectionId(collectionData[0].id);
		}
	}, [collectionData]);

	useEffect(() => {
		if (cardsData) {
			setFlashCards(cardsData.flashCards);
		}
	}, [cardsData]);

	// HANDLERS TODO:
	const handleToggle = (toggleChange: boolean) => {
		setIsEditMode(toggleChange);
	};

	// const handleCollectionChange = (collectionId: number) => {
	// 	setSelectedCollectionId(collectionId);
	// 	setSelectedCard({
	// 		id: 0,
	// 		collectionId: 0,
	// 		userId: userId,
	// 		question: "",
	// 		answer: "",
	// 		leitnerIndex: 1,
	// 		lastReviewed: null,
	// 		colorClass: null,
	// 	});
	// };
	const handleCollectionChange = (selectedCollection: CardCollectionTypes) => {
		setSelectedCollectionId(selectedCollection.id);
		setSelectedCard({
			id: 0,
			collectionId: 0,
			userId: userId,
			question: "",
			answer: "",
			leitnerIndex: 1,
			lastReviewed: null,
			colorClass: null,
		});
	};

	// const handleDropdownSelect = (selectedCollection: CardCollectionTypes) => {
	// 	setSelectedCollectionId(selectedCollection.id);
	// };

	const selectCard = (selectedCard: CardTypes) => {
		setSelectedCard(selectedCard);
	};

	const deleteSelectedCard = (selectedCard: CardTypes) => {
		const cardDetails: CardTypes = {
			id: selectedCard.id,
			collectionId: selectedCard.collectionId,
			userId: userId,
			answer: selectedCard.answer,
			question: selectedCard.question,
			leitnerIndex: 1,
			lastReviewed: null,
			colorClass: null,
		};

		if (flashCards?.length <= 1) {
			deleteCollection(selectedCollectionId, userId);
		} else {
			deleteCard(cardDetails);
		}
	};

	const collectionAdded = (addedCollectionId: number) => {
		const achievement = unlockCreateAchievement();
		setAchievement(achievement);
		setIsChecked(false);
	};

	const resetParameters = () => {
		setSelectedCard({
			id: 0,
			collectionId: 0,
			userId: userId,
			question: "",
			answer: "",
			leitnerIndex: 1,
			lastReviewed: null,
			colorClass: null,
		});
	};

	// RENDER LOGIC TODO:
	if (collectionLoading || cardsLoading) return <LoadingIcon />;
	if (collectionError)
		return (
			<div>
				Error: {collectionError.status} {JSON.stringify(collectionError.data)}
			</div>
		);
	if (cardsError)
		return (
			<div>
				Error: {cardsError.status} {JSON.stringify(cardsError.data)}
			</div>
		);
	// if (achievement)
	// 	return (
	// 		<AchievementCard achievement={achievement[0]} avatar={achievement[1]} />
	// 	);

	return (
		<>
			{/* {userId && ( */}
			<div className="create-edit-page ">
				<aside className="create-edit-page__sidebar sidebar">
					<ToggleButtons onToggle={handleToggle}></ToggleButtons>
					<h3 className="sidebar__h3 sidebar__h3--current-choice">
						Title of Current Choice
					</h3>
					{/* // EDIT COLLECTION PICKED */}
					{isEditMode ? (
						<div className="sidebar__edit">
							{" "}
							<p className="sidebar__dropdown--label"></p>
							<p className="sidebar__dropdown">
								{collectionData && collectionData.length > 0 && (
									<Dropdown
										items={collectionData}
										displayKey={"title"}
										idKey="id"
										onItemSelect={handleCollectionChange}
									/>
								)}
							</p>
						</div>
					) : (
						// CREATE COLLECTION PICKED
						<div className="sidebar__bottom sidebar__bottom--create">
							<AddCollection></AddCollection>
						</div>
					)}

					{/* <h3 className="sidebar__h3 sidebar__h3--current-collection">
						Current collection here
					</h3>
					<textarea className="sidebar__text-area">
						Change Name Textarea
					</textarea> */}
				</aside>

				<Carousel
					className={"carousel create-edit-page__carousel"}
					items={flashCards}
					Component={Card}
					onCardClick={selectCard}
					onDeleteClick={deleteSelectedCard}
					animationOnRendering={`fade-in`}
				/>

				{/* <div className="create-edit-page__card-grid">
					<CardGrid
						items={flashCards}
						Component={Card}
						onCardClick={selectCard}
						onDeleteClick={deleteSelectedCard}
						animationOnRendering={"fade-in"}
					/>
				</div> */}
				<div className="create-edit-page__card-editor">
					<CardEditor
						card={selectedCard}
						userId={userId}
						collectionId={selectedCollectionId}
					/>
				</div>
			</div>
		</>
	);

	// // ERROR HANDLING
	// if (collectionLoading) return <LoadingIcon />;
	// if (collectionError)
	// 	return (
	// 		<div>
	// 			Error: {collectionError.status} {JSON.stringify(collectionError.data)}
	// 		</div>
	// 	);

	// if (cardsLoading) return <LoadingIcon />;
	// if (cardsError)
	// 	return (
	// 		<div>
	// 			Error: {cardsError.status} {JSON.stringify(cardsError.data)}
	// 		</div>
	// 	);
	// if (achievement) {
	// 	return (
	// 		<>
	// 			<AchievementCard achievement={achievement[0]} avatar={achievement[1]} />
	// 		</>
	// 	);
	// }

	// return (
	// 	// <AnimationClassContext.Provider value="fade-in">
	// 	<div className="create-edit-page">
	// 		<div className="create-edit-page__collection-selector">
	// 			{collectionData && collectionData.length > 0 && !isChecked ? (
	// 				<>
	// 					<Toggler onToggle={handleToggle} isChecked={isChecked} />
	// 					<CollectionSelector
	// 						className=""
	// 						collections={collectionData}
	// 						onCollectionChange={handleCollectionChange}
	// 					/>
	// 					<div className="create-edit-page__wrapper">
	// 						<div className="create-edit-page__card-grid">
	// 							<CardGrid
	// 								items={flashCards}
	// 								Component={Card}
	// 								onCardClick={selectCard}
	// 								onDeleteClick={deleteSelectedCard}
	// 								animationOnRendering={'fade-in'}
	// 							/>
	// 						</div>
	// 						<div className="create-edit-page__card-editor">
	// 							<CardEditor
	// 								card={selectedCard}
	// 								userId={userId}
	// 								collectionId={selectedCollectionId}
	// 							/>
	// 						</div>
	// 					</div>
	// 				</>
	// 			) : collectionData && collectionData.length > 0 && isChecked ? (
	// 				<>
	// 					<Toggler onToggle={handleToggle} isChecked={isChecked} />
	// 					<AddCollection userId={userId} collectionAdded={collectionAdded} />
	// 				</>
	// 			) : (
	// 				<>
	// 					<AddCollection userId={userId} collectionAdded={collectionAdded} />
	// 				</>
	// 			)}
	// 		</div>
	// 		{/* </AnimationClassContext.Provider> */}
	// 	</div>
	// );
}

export default EditCardPage;
