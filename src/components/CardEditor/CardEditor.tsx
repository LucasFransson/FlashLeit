function CardEditor() {
	// function DiscardChanges() {}
	// function SaveChanges() {}

	// Consider moving to Util for reusability
	const DiscardChanges = () => {};
	const SaveChanges = () => {};

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
							<input className="card-editor-card__text-input"></input>
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
					<input className="card-editor-card__text-input"></input>
				</div>
				<div className="card-editor-card__bottom">{/* <p>ANSWER</p> */}</div>
			</div>
			{/* Buttons */}
			<div className="card-editor__buttons">
				{' '}
				<button
					className="card-editor__btn card-editor__btn--cancel"
					onClick={DiscardChanges}
				>
					Discard Changes
				</button>
				<button
					className="card-editor__btn card-editor__btn--save"
					onClick={SaveChanges}
				>
					Save Changes
				</button>
			</div>
		</div>
	);
}

export default CardEditor;
