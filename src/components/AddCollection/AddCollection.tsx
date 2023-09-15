import { useState } from "react";
import { useAddCollection } from "../../utils/collectionUtility";
import CardCollectionTypes from "../../types/CardCollectionTypes";

function AddCollection({ userId, collectionAdded }) {
	const [titleInput, setTitleInput] = useState("");
	const [isTitleInputEmpty, setIsTitleInputEmpty] = useState(true);
	const [descriptionInput, setDescriptionInput] = useState("");
	const [isDescriptionInputEmpty, setIsDescriptionInputEmpty] = useState(true);
	const [isPublic, setIsPublic] = useState(false);

	const addCollection = useAddCollection();

	const handleCheckbox = (checkBoxValue: boolean) => {
		setIsPublic(checkBoxValue);
	};

	const createCollection = () => {
		const collectionDetails: CardCollectionTypes = {
			id: 0,
			title: titleInput,
			userId: userId,
			publicKey: 0,
			flashCards: null,
			amountOfCorrectAnswers: 0,
			amountOfIncorrectAnswers: 0,
			amountOfCompletedRuns: 0,
			description: descriptionInput,
			isPublic: isPublic,
			cardCount: 0,
		};

		addCollection(collectionDetails);
		collectionAdded();
	};

	return (
		<div className="add-collection__wrapper">
			<label>Title: </label>
			<input
				type="text"
				onChange={e => {
					setTitleInput(e.target.value);
					setIsTitleInputEmpty(e.target.value === "");
				}}
			/>
			<label>Description: </label>
			<input
				type="text"
				onChange={e => {
					setDescriptionInput(e.target.value);
					setIsDescriptionInputEmpty(e.target.value === "");
				}}
			/>
			<label>Public collection:</label>
			<input
				type="checkbox"
				onChange={e => {
					handleCheckbox(e.target.checked);
				}}
			/>
			<button onClick={createCollection} disabled={isTitleInputEmpty}>
				Create collection
			</button>
		</div>
	);
}

export default AddCollection;
