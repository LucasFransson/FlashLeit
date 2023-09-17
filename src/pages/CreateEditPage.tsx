import CardEditor from '../components/CardEditor/CardEditor';
import LoadingIcon from '../components/LoadingIcon/LoadingIcon';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CollectionSelector from '../components/CollectionSelector/CollectionSelector';
import {
	useGetCollectionByIdAndUserIdQuery,
	useGetAuthoredCollectionsQuery,
} from '../redux/api/collectionsSlice';
import { useEffect, useState } from 'react';
import { useDeleteCard } from '../utils/cardUtility';
import AddCollection from '../components/AddCollection/AddCollection';
import CardGrid from '../components/CardGrid/CardGrid';
import CardGridTypes from '../types/CardGridTypes';
import Card from '../components/Card/Card';
import CardTypes from '../types/CardTypes';
import AnimationClassContext from '../context/AnimationContext';
import Toggler from '../components/Toggler/Toggler';
import { useDeleteCollection } from '../utils/collectionUtility';
import Carousel from '../components/Carousel';

function EditCardPage() {
	// useState to hold the selected card:

	const [selectedCard, setSelectedCard] = useState<CardTypes>({
		id: 0,
		collectionId: 0,
		userId: 0, // Added userId to get rid of errors // Lucas
		question: '',
		answer: '',
		leitnerIndex: 1,
		lastReviewed: null,
		colorClass: null,
		animationOnRendering: 'fade-in',
	});

	// useState to hold toggler value:
	const [isChecked, setIsChecked] = useState(false);

	// Retrieve the UserId:
	const { userId } = useSelector((state: RootState) => state.userId);

	// useState to hold the id of currently selected collection:
	const [selectedCollectionId, setSelectedCollectionId] = useState<
		number | null
	>(null);

	// useState to hold the cards of the currently selected collection:
	const [flashCards, setFlashCards] = useState<CardTypes[] | null>([]);

	// useState for skip:
	const [skip, setSkip] = useState(true);
	const [skip2, setSkip2] = useState(true);

	// Delete card from utility folder:
	const deleteCard = useDeleteCard();

	// Delete collections from utility folder:
	const deleteCollection = useDeleteCollection();

	// API call for getting all the users collections:
	const {
		data: collectionData,
		error: collectionError,
		isLoading: collectionLoading,
	} = useGetAuthoredCollectionsQuery(userId, { skip: skip2 });

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
		if (userId != null) {
			setSkip2(false);
		}

		if (selectedCollectionId != null) {
			setSkip(false);
		}
	}, [selectedCollectionId, userId]);

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
			question: '',
			answer: '',
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

	const collectionAdded = () => {
		// --- TODO --- Show success modal?

		setIsChecked(false);
	};

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
		<>
			{userId && (
				<div className="create-edit-page ">
					{/* <div className="create-edit-page__collection-selector"> */}
					{collectionData && collectionData.length > 0 && (
						<>
							<Toggler onToggle={handleToggle} isChecked={isChecked} />
							{!isChecked ? (
								<CollectionSelector
									collections={collectionData}
									onCollectionChange={handleCollectionChange}
								/>
							) : (
								<AddCollection
									userId={userId}
									collectionAdded={collectionAdded}
								/>
							)}
						</>
					)}
					{/* </div> */}

					{collectionData && collectionData.length > 0 && !isChecked && (
						// <div className="create-edit-page__wrapper">
						<>
							{/* <Carousel
								className={'carousel create-edit-page__carousel'}
								slides={['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5']}
							/> */}
							<Carousel
								className={'carousel create-edit-page__carousel'}
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
									animationOnRendering={'fade-in'}
								/>
							</div> */}
							<div className="create-edit-page__card-editor">
								<CardEditor
									card={selectedCard}
									userId={userId}
									collectionId={selectedCollectionId}
								/>
							</div>
							{/* </div> */}
						</>
					)}
				</div>
			)}
		</>
	);

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
