import CardEditor from "../components/CardEditor/CardEditor";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CollectionSelector from "../components/CollectionSelector/CollectionSelector";
import { useGetCollectionByIdAndUserIdQuery, useGetAuthoredCollectionsQuery } from "../redux/api/collectionsSlice";
import { useEffect, useState } from "react";
import { useDeleteCard } from "../utils/cardUtility";
import AddCollection from "../components/AddCollection/AddCollection";
import CardGrid from "../components/CardGrid/CardGrid";
import Card from "../components/Card/Card";
import CardTypes from "../types/CardTypes";
import Toggler from "../components/Toggler/Toggler";
import { useDeleteCollection } from "../utils/collectionUtility";
import { useAchievementService } from "../utils/achievementsUtility";
import CardCollectionTypes from "../types/CardCollectionTypes";
function EditCardPage() {
	// useState to hold the selected card:
	const [selectedCard, setSelectedCard] = useState<CardTypes>({
		id: 0,
		collectionId: 0,
		userId: 0, // Added userId to get rid of errors // Lucas
		question: "",
		answer: "",
		leitnerIndex: 1,
		lastReviewed: null,
		colorClass: null,
	});
	const { unlockCreateAchievement } = useAchievementService();
	// useState to hold toggler value:
	const [isChecked, setIsChecked] = useState(false);
	// Retrieve the UserId:
	const { userId } = useSelector((state: RootState) => state.userId);
	// useState to hold the id of currently selected collection:
	const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(0);
	// useState to hold the cards of the currently selected collection:
	const [flashCards, setFlashCards] = useState<CardTypes[] | null>([]);
	// useState for skip:
	const [skip, setSkip] = useState(true);
	// Delete card from utility folder:
	const deleteCard = useDeleteCard();
	// Delete collections from utility folder:
	const deleteCollection = useDeleteCollection();
	// API call for getting all the users collections:
	const { data: collectionData, error: collectionError, isLoading: collectionLoading } = useGetAuthoredCollectionsQuery(userId);

	const [addedCollectionId, setAddedCollectionId] = useState<number | null>(null);

	// UseEffet to select the newly added collection:
	useEffect(() => {
			if(selectedCollectionId === addedCollectionId && addedCollectionId !== null) {
				handleCollectionChange(addedCollectionId);
				
				const newCollection = collectionData?.find(collection => collection.id === addedCollectionId);

				console.log(newCollection);
				
				setSelectedCard(newCollection?.flashCards[0]);

				console.log(selectedCard);
			}
	}, [collectionData, addedCollectionId]);

	// API call for getting all the cards of the currently selected collection;
	const {
		data: cardsData,
		error: cardsError,
		isLoading: cardsLoading,
	} = useGetCollectionByIdAndUserIdQuery(
		{
			collectionId: selectedCollectionId,
			userId: userId,
		},
		{ skip }
	);
	// useEffect to set the selected collection after API call:
	useEffect(() => {
		if (collectionData?.length > 0) {
			setSelectedCollectionId(collectionData[0].id);
		}
	}, [collectionData]);
	//useEffect to set flashCards to fetched data:
	useEffect(() => {
		if (cardsData) {
			setFlashCards(cardsData.flashCards);
		}
	}, [cardsData]);
	// useEffect to set skip:
	useEffect(() => {
		if (selectedCollectionId != null) {
			setSkip(false);
		}
	}, [selectedCollectionId]);
	const handleToggle = (toggleChange: boolean) => {
		setIsChecked(toggleChange);
	};
	// Update the selected collection:
	const handleCollectionChange = (collectionId: number) => {
		setSelectedCollectionId(collectionId);
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
			// --- TODO --- Error handeling: (1) Show error modal? (2) Show modal explaining that continuing to delete last card will delete the entire collection?

			deleteCollection(selectedCollectionId, userId);
		} else {
			deleteCard(cardDetails);
		}
	};

	const collectionAdded = (addedCollectionId: number) => {
		// --- TODO --- Show success modal?
		const isAchievementUnlocked = unlockCreateAchievement();
		if (isAchievementUnlocked) {
			console.log("Unlocked");
		} else {
			console.log("Not yet");
		}
		setIsChecked(false);

		console.log(addedCollectionId);

		// setAddedCollectionId(addedCollectionId);
		// setSelectedCollectionId(addedCollectionId);

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
	}


	if (collectionLoading) return <LoadingIcon />;
	if (collectionError)
		return (
			<div>
				Error: {collectionError.status} {JSON.stringify(collectionError.data)}
			</div>
		);
	if (cardsLoading) return <LoadingIcon />;
	if (cardsError)
		return (
			<div>
				Error: {cardsError.status} {JSON.stringify(cardsError.data)}
			</div>
		);
	return (
		<div className="create-edit-page">
			<div className="create-edit-page__collection-selector">
				{collectionData && collectionData.length > 0 && !isChecked ? (
					<>
						<Toggler onToggle={handleToggle} isChecked={isChecked} />
						<CollectionSelector className="" collections={collectionData} onCollectionChange={handleCollectionChange} />
						<div className="create-edit-page__wrapper">
							<div className="create-edit-page__card-grid">
								<CardGrid items={flashCards} Component={Card} onCardClick={selectCard} onDeleteClick={deleteSelectedCard} />
							</div>
							<div className="create-edit-page__card-editor">
								<CardEditor card={selectedCard} userId={userId} collectionId={selectedCollectionId} resetParameters={resetParameters}/>
							</div>
						</div>
					</>
				) : collectionData && collectionData.length > 0 && isChecked ? (
					<>
						<Toggler onToggle={handleToggle} isChecked={isChecked} />
						<AddCollection userId={userId} collectionAdded={collectionAdded} />
					</>
				) : (
					<>
						<AddCollection userId={userId} collectionAdded={collectionAdded} />
					</>
				)}
			</div>
		</div>
	);
}
export default EditCardPage;
