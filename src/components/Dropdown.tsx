// import { useState, useEffect } from 'react';

// const data = [
// 	{ id: 0, label: 'Istanbul, TR (AHL)' },
// 	{ id: 1, label: 'Paris, FR (CDG)' },
// ];

// const Dropdown = () => {
// 	const [isOpen, setOpen] = useState(false);
// 	const [items, setItem] = useState(data);
// 	const [selectedItem, setSelectedItem] = useState(null);

// 	const toggleDropdown = () => setOpen(!isOpen);

// 	const handleItemClick = (id) => {
// 		selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
// 	};

// 	return (
// 		<div className="dropdown">
// 			<div className="dropdown-header" onClick={toggleDropdown}>
// 				{selectedItem
// 					? items.find((item) => item.id === selectedItem).label
// 					: 'Select your destination'}
// 				<i className={`fa fa-chevron-right icon ${isOpen && 'open'}`}></i>
// 			</div>
// 			<div className={`dropdown-body ${isOpen && 'open'}`}>
// 				{items.map((item) => (
// 					<div
// 						className="dropdown-item"
// 						onClick={(e) => handleItemClick(e.target.id)}
// 						id={item.id}
// 					>
// 						<span
// 							className={`dropdown-item-dot ${
// 								item.id == selectedItem && 'selected'
// 							}`}
// 						>
// 							•{' '}
// 						</span>
// 						{item.label}
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };
// export default Dropdown;

import { useState, useCallback } from 'react';

const data = [
	{ id: 0, label: 'Collection 1' },
	{ id: 1, label: 'Collection 2' },
];

const Dropdown = () => {
	const [isOpen, setOpen] = useState(false);
	const [items] = useState(data); // No need to set items again
	const [selectedItem, setSelectedItem] = useState(null);

	const toggleDropdown = useCallback(() => {
		setOpen((prevOpen) => !prevOpen);
	}, []);

	const handleItemClick = useCallback((id) => {
		setSelectedItem((prevSelectedItem) =>
			prevSelectedItem === id ? null : id
		);
	}, []);

	return (
		<div className="dropdown">
			<div className="dropdown__header" onClick={toggleDropdown}>
				{selectedItem !== null
					? items.find((item) => item.id === selectedItem).label
					: 'Select Collection'}
				<i
					className={`fa fa-chevron-right dropdown__icon ${isOpen && 'open'}`}
				></i>
			</div>
			<div className={`dropdown__body ${isOpen && 'open'}`}>
				{items.map((item) => (
					<div
						key={item.id}
						className="dropdown__item"
						onClick={() => handleItemClick(item.id)}
					>
						<span
							className={`dropdown__item-dot ${
								item.id === selectedItem && 'selected'
							}`}
						>
							•
						</span>
						{item.label}
					</div>
				))}
			</div>
		</div>
	);
};

export default Dropdown;
