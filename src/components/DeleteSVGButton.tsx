import React, { useState } from 'react';

import { ReactComponent as DeleteIcon } from '../../public/svg/SVG/delete-icon.svg'; // Assuming the SVG is saved as delete-icon.svg in the same directory

const DeleteButton: React.FC = () => {
	const [isDeleted, setIsDeleted] = useState(false);

	const handleDeleteClick = () => {
		setIsDeleted(true);
		// logic shit here // Call the delete function

		// Reset to original ui state after 2 sec
		setTimeout(() => {
			setIsDeleted(false);
		}, 2000);
	};
	return (
		<button
			className={`button--delete-trash ${isDeleted ? 'deleted' : ''}`}
			onClick={handleDeleteClick}
		>
			{isDeleted ? (
				<span>✓</span>
			) : (
				<DeleteIcon className={'svgIcon--delete-trash'} />
			)}
		</button>
	);
};

export default DeleteButton;
