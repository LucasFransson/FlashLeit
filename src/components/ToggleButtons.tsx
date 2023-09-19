import react, { useState } from 'react';

interface ToggleButtonsProps {
	onToggle: (selected: boolean) => void;
	// className?: string;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({ onToggle }) => {
	const [selectedOption, setSelectedOption] = useState<'edit' | 'create'>(
		'edit'
	);

	const handleChange = (option: 'edit' | 'create') => {
		setSelectedOption(option);
		onToggle(option === 'edit'); // Assuming 'edit' means true and 'create' means false
	};

	return (
		<div className="toggle-buttons">
			<label
				className={`button--neo toggle-buttons__button toggle-buttons__button--left ${
					selectedOption === 'edit' ? 'button--neo--selected' : ''
				}`}
			>
				<input
					type="radio"
					value="edit"
					checked={selectedOption === 'edit'}
					onChange={() => handleChange('edit')}
					className="toggle-buttons__radio"
				/>
				Edit
			</label>
			<label
				className={`button--neo toggle-buttons__button toggle-buttons__button--right ${
					selectedOption === 'create' ? 'button--neo--selected' : ''
				}`}
			>
				<input
					type="radio"
					value="create"
					checked={selectedOption === 'create'}
					onChange={() => handleChange('create')}
					className="toggle-buttons__radio"
				/>
				Create
			</label>
		</div>
	);
};

export default ToggleButtons;

// import React from 'react';

// interface ToggleButtonProps {
// 	selectedOption: 'edit' | 'create';
// 	onToggle: (selected: 'edit' | 'create') => void;
// }

// const ToggleButtons: React.FC<ToggleButtonProps> = ({
// 	selectedOption,
// 	onToggle,
// }) => {
// 	return (
// 		<div className="toggle-buttons">
// 			<label
// 				className={`toggle-buttons__button button--neo ${
// 					selectedOption === 'edit' ? 'button--neo--selected' : ''
// 				}`}
// 			>
// 				<input
// 					type="radio"
// 					value="edit"
// 					checked={selectedOption === 'edit'}
// 					onChange={() => onToggle('edit')}
// 					className="toggle-buttons__radio"
// 				/>
// 				Edit
// 			</label>
// 			<label
// 				className={`toggle-buttons__button button--neo ${
// 					selectedOption === 'create' ? 'button--neo--selected' : ''
// 				}`}
// 			>
// 				<input
// 					type="radio"
// 					value="create"
// 					checked={selectedOption === 'create'}
// 					onChange={() => onToggle('create')}
// 					className="toggle-buttons__radio"
// 				/>
// 				Create
// 			</label>
// 		</div>
// 	);
// };

// export default ToggleButtons;

// import React, { useState } from 'react';

// interface RadioButtonProps {
// 	label: string;
// 	checked: boolean;
// 	onChange: () => void;
// 	className: string;
// }

// const RadioButton: React.FC<RadioButtonProps> = ({
// 	label,
// 	checked,
// 	onChange,
// 	className,
// }) => (
// 	<div className={className}>
// 		<input
// 			type="radio"
// 			name="toggleRadio"
// 			id={label}
// 			checked={checked}
// 			onChange={onChange}
// 			style={{ display: 'none' }} // Hide the actual radio button
// 		/>
// 		<label htmlFor={label} className={`button--neo ${checked ? 'active' : ''}`}>
// 			{label}
// 		</label>
// 	</div>
// );

// const ToggleRadioButtons: React.FC = () => {
// 	const [selectedOption, setSelectedOption] = useState<'edit' | 'create'>(
// 		'edit'
// 	);

// 	return (
// 		<div className="toggle-radio-buttons">
// 			<RadioButton
// 				label="edit"
// 				checked={selectedOption === 'edit'}
// 				onChange={() => setSelectedOption('edit')}
// 				className="sidebar__neo-card sidebar__neo-card--left"
// 			/>
// 			<RadioButton
// 				label="create"
// 				checked={selectedOption === 'create'}
// 				onChange={() => setSelectedOption('create')}
// 				className="sidebar__neo-card sidebar__neo-card--right"
// 			/>
// 		</div>
// 	);
// };

// export default ToggleRadioButtons;

// import React, { useState } from 'react';

// interface RadioButtonProps {
// 	label: string;
// 	checked: boolean;
// 	onChange: () => void;
// 	className: string;
// }

// const RadioButton: React.FC<RadioButtonProps> = ({
// 	label,
// 	checked,
// 	onChange,
// 	className,
// }) => (
// 	<label className={className}>
// 		<input
// 			type="radio"
// 			name="toggleRadio"
// 			checked={checked}
// 			onChange={onChange}
// 			className={className}
// 		/>
// 		{label}
// 	</label>
// );

// const ToggleRadioButtons: React.FC = () => {
// 	const [selectedOption, setSelectedOption] = useState<'option1' | 'option2'>(
// 		'option1'
// 	);
// 	const className = 'button--neo';
// 	return (
// 		<div>
// 			<RadioButton
// 				label="Option 1"
// 				checked={selectedOption === 'option1'}
// 				onChange={() => setSelectedOption('option1')}
// 				className={className}
// 			/>
// 			<RadioButton
// 				label="Option 2"
// 				checked={selectedOption === 'option2'}
// 				onChange={() => setSelectedOption('option2')}
// 				className={className}
// 			/>
// 		</div>
// 	);
// };

// export default ToggleRadioButtons;
