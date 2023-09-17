import { useState, useEffect } from 'react';
import { useAddCardMutation } from '../../redux/api/cardsSlice';
import { useAddCard, useUpdateCard } from '../../utils/cardUtility';
import CardTypes from '../../types/CardTypes';
import { getRandomColorClass } from '../../utils/getRandomColorClass';

function CardEditor({ card, userId, collectionId }) {
	// const [id, setCardId] = useState(card.id);
	// const [collectionId, setCollectionId] = useState(card.collectionId);
	const [question, setQuestionInput] = useState(card.question);
	const [answer, setAnswerInput] = useState(card.answer);

	const [areInputsEmpty, setAreInputsEmpty] = useState(true);

	const addCard = useAddCard();
	const updateCard = useUpdateCard();

	useEffect(() => {
		setAreInputsEmpty(!question || !answer);
	}, [question, answer]);

	useEffect(() => {
		setQuestionInput(card.question);
		setAnswerInput(card.answer);
	}, [card]);

	const ClearInputFields = () => {
		setQuestionInput('');
		setAnswerInput('');
	};

	// Consider moving to Util for reusability
	const DiscardChanges = () => {
		ClearInputFields();
	};
	const SaveChanges = () => {
		const cardDetails: CardTypes = {
			id: card.id,
			collectionId: collectionId,
			userId: userId,
			question: question,
			answer: answer,
			leitnerIndex: 1,
			lastReviewed: null,
			colorClass: getRandomColorClass(), // Changed from null to rnd color function // Lucas
		};

		if (card.id === 0) {
			addCard(cardDetails);

			ClearInputFields();
		} else {
			updateCard(cardDetails);

			ClearInputFields();
		}
	};

	return (
		<div className="card-editor">
			{/* Left Side */}
			<div className="card-editor-card card-editor-card--left">
				{/* <p className="card-editor__heading">Question</p> */}

				{/* FRONTSIDE */}
				{/* <div className="card-editor-card__top"> */}
				<h3 className="card-editor-card__heading">QUESTION</h3>
				{/* </div> */}

				<textarea
					value={question}
					className="card-editor-card__text-input"
					onChange={(e) => {
						setQuestionInput(e.target.value);
						setAreInputsEmpty(e.target.value === '' || answer === '');
					}}
				></textarea>

				<div className="card-editor-card__bottom">{/* <p>QUESTION</p> */}</div>
			</div>

			{/* Right Side */}
			{/* <div className={`card-editor-card--right ${colorClass}`}> */}
			<div className="card-editor-card card-editor-card--right ">
				{/* <div className="card-editor-card__top"> */}
				<h3 className="card-editor-card__heading">ANSWER</h3>
				{/* </div> */}

				<textarea
					value={answer}
					className="card-editor-card__text-input"
					onChange={(e) => {
						setAnswerInput(e.target.value);
						setAreInputsEmpty(question === '' || e.target.value === '');
					}}
				></textarea>

				<div className="card-editor-card__bottom">{/* <p>ANSWER</p> */}</div>
			</div>
			{/* Buttons */}

			<button
				// className="card-editor__btn card-editor__btn--cancel"
				className="card-editor__btn card-editor__btn--cancel"
				onClick={DiscardChanges}
				disabled={areInputsEmpty}
			>
				Discard Changes
			</button>
			<button
				className="card-editor__btn card-editor__btn--save"
				onClick={SaveChanges}
				disabled={areInputsEmpty}
			>
				Save Changes
			</button>
		</div>
	);
}

export default CardEditor;
