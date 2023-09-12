import CardEditor from '../components/CardEditor/CardEditor';
import LoadingIcon from '../components/LoadingIcon/LoadingIcon';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CollectionSelector from '../components/CollectionSelector/CollectionSelector';
import {
	useGetCollectionsByUserIdQuery,
	useGetCollectionByIdAndUserIdQuery,
} from '../redux/api/collectionsSlice';
import { useEffect, useState } from 'react';
import { useDeleteCard } from '../utils/cardEditor';
import CardGrid from '../components/CardGrid/CardGrid';
import CardGridTypes from '../types/CardGridTypes';
import Card from '../components/Card/Card';
import CardTypes from '../types/CardTypes';
import AnimationClassContext from '../context/AnimationContext';

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

	// Retrieve the UserId:
	const { userId } = useSelector((state: RootState) => state.userId);

	// useState to hold the id of currently selected collection:
	const [selectedCollectionId, setSelectedCollectionId] = useState<
		number | null
	>(null);

	// useState to hold the cards of the currently selected collection:
	const [flashCards, setFlashCards] = useState<CardTypes[] | null>([]);

	// Delete card from utility folder:
	const deleteCard = useDeleteCard();

	// API call for getting all the users collections:
	const {
		data: collectionData,
		error: collectionError,
		isLoading: collectionLoading,
	} = useGetCollectionsByUserIdQuery(userId);

	// API call for getting all the cards of the currently selected collection;
	const {
		data: cardsData,
		error: cardsError,
		isLoading: cardsLoading,
	} = useGetCollectionByIdAndUserIdQuery({
		collectionId: selectedCollectionId,
		userId: userId,
	});

	// useEffect to set the selected collection after API call:
	useEffect(() => {
		if (collectionData) {
			setSelectedCollectionId(collectionData[0].id);
		}
	}, [collectionData]);

	//useEffect to set flashCards to fetched data:
	useEffect(() => {
		if (cardsData) {
			setFlashCards(cardsData.flashCards);
		}
	}, [cardsData]);

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

		deleteCard(cardDetails);
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
		<AnimationClassContext.Provider value="fade-in">
			<div className="create-edit-page">
				<div className="create-edit-page__collection-selector">
					<CollectionSelector
						className=""
						collections={collectionData}
						onCollectionChange={handleCollectionChange}
					/>
				</div>
				<div className="create-edit-page__wrapper">
					<div className="create-edit-page__card-grid">
						<CardGrid
							items={flashCards}
							Component={Card}
							onCardClick={selectCard}
							onDeleteClick={deleteSelectedCard}
							animationOnRendering={'fade-in'}
						/>
					</div>
					<div className="create-edit-page__card-editor">
						<CardEditor
							card={selectedCard}
							userId={userId}
							collectionId={selectedCollectionId}
						/>
					</div>
				</div>
			</div>
		</AnimationClassContext.Provider>
	);
}

export default EditCardPage;
