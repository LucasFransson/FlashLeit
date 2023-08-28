function CardEditor() {
	// function DiscardChanges() {}
	// function SaveChanges() {}

	// Consider moving to Util for reusability
	const DiscardChanges = () => {};
	const SaveChanges = () => {};

	return (
		<div className="card-editor">
			{/* Left Side */}
			<div className="card-editor--left">
				<p className="card-editor__heading">Question</p>
				<input className="card-editor__text-input"></input>
			</div>
			{/* Right Side */}
			<div className="card-editor--right">
				<p className="card-editor__heading">Answer</p>
				<input className="card-editor__text-input"></input>
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
