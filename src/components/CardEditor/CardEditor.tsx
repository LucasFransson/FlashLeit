import { useRef, useState, useEffect } from 'react';
function CardEditor() {
	const questionInput = useRef();
	const answerInput = useRef();
	const [areInputsEmpty, setAreInputsEmpty] = useState(true);

	useEffect(() => {
		setAreInputsEmpty(
			!questionInput.current ||
				questionInput.current.value === '' ||
				!answerInput.current ||
				answerInput.current.value === ''
		);
	}, []);

	const PostCard = async () => {
		const questionValue = questionInput.current.value;
		const answerValue = answerInput.current.value;

		const dataToSubmit = {
			// question: 'Test Post Question',
			question: questionValue,
			correctAnswer: answerValue,
			wrongAnswer1: null,
			wrongAnswer2: null,
			wrongAnswer3: null,
			collectionId: 1, // TODO: Replace with {id}
		};

		const postResult = await fetch(
			'https://flashleit.azure-api.net/api/cards',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dataToSubmit),
			}
		);
		const resultInJson = await postResult.json();
		console.log(resultInJson);
	};

	const ClearInputFields = () => {
		questionInput.current.value = '';
		answerInput.current.value = '';
	};

	// Consider moving to Util for reusability
	const DiscardChanges = () => {};
	const SaveChanges = () => {
		PostCard();
		ClearInputFields();
	};

	return (
		<div className="card-editor">
			{/* Left Side */}
			<div className="card-editor-card--left">
				{/* <p className="card-editor__heading">Question</p> */}
				<div className="card-editor-card__content">
					{/* FRONTSIDE */}
					<div className="card-editor-card__top">
						<p className="card-editor-card__heading">QUESTION</p>
					</div>
					<div className="card-editor-card__center">
						<p className="card-editor-card__text">
							<textarea
								ref={questionInput}
								className="card-editor-card__text-input"
								onChange={() =>
									setAreInputsEmpty(
										questionInput.current.value === '' ||
											answerInput.current.value === ''
									)
								}
							></textarea>
						</p>
					</div>
					<div className="card-editor-card__bottom">
						{/* <p>QUESTION</p> */}
					</div>
				</div>
			</div>
			{/* Right Side */}
			{/* <div className={`card-editor-card--right ${colorClass}`}> */}
			<div className="card-editor-card--right ">
				<div className="card-editor-card__top">
					<p className="card-editor-card__heading">ANSWER</p>
				</div>
				<div className="card-editor-card__center">
					<textarea
						ref={answerInput}
						className="card-editor-card__text-input"
						onChange={() =>
							setAreInputsEmpty(
								questionInput.current.value === '' ||
									answerInput.current.value === ''
							)
						}
					></textarea>
				</div>
				<div className="card-editor-card__bottom">{/* <p>ANSWER</p> */}</div>
			</div>
			{/* Buttons */}
			<div className="card-editor__buttons">
				{' '}
				<button
					className="card-editor__btn card-editor__btn--cancel"
					onClick={DiscardChanges}
					disabled={areInputsEmpty}
				>
					Discard Changes
				</button>
				<button
					className="card-editor__btn card-editor__btn--save"
					// onClick={SaveChanges}
					onClick={SaveChanges}
					// onClick={() => PostCard() || ClearInputFields()}
					// onClick={[PostCard(), ClearInputFields()]}
					disabled={areInputsEmpty}
				>
					Save Changes
				</button>
			</div>
		</div>
	);
}

export default CardEditor;
