import { useState, useCallback } from "react";

interface DropdownProps<T> {
	items: T[] | undefined | null;
	displayKey: keyof T;
	idKey: keyof T;
	onItemSelect: (item: T) => void;
}

const Dropdown = <T extends { [key: string]: any }>({
	items,
	displayKey,
	idKey,
	onItemSelect,
}: DropdownProps<T>) => {
	const [isOpen, setOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<T | null>(null);

	const toggleDropdown = useCallback(() => {
		setOpen((prevOpen) => !prevOpen);
	}, []);

	const handleItemClick = useCallback(
		(item: T) => {
			setSelectedItem(item);
			onItemSelect(item);
		},
		[onItemSelect]
	);

	return (
		<div className="dropdown">
			<div className="dropdown__header" onClick={toggleDropdown}>
				{selectedItem ? selectedItem[displayKey as string] : "Select Item"}
				<i
					className={`fa fa-chevron-right dropdown__icon ${isOpen && "open"}`}
				></i>
			</div>
			<div className={`dropdown__body ${isOpen && "open"}`}>
				{items.map((item) => (
					<div
						key={item[idKey as string]}
						className="dropdown__item"
						onClick={() => handleItemClick(item)}
					>
						<span
							className={`dropdown__item-dot ${
								selectedItem &&
								item[idKey as string] === selectedItem[idKey as string] &&
								"selected"
							}`}
						>
							•
						</span>
						{item[displayKey as string]}
					</div>
				))}
			</div>
		</div>

		// const handleItemClick = useCallback((id) => {
		// 	setSelectedItem((prevSelectedItem) =>
		// 		prevSelectedItem === id ? null : id
		// 	);
		// }, []);

		// return (
		// 	<div className="dropdown">
		// 		<div className="dropdown__header" onClick={toggleDropdown}>
		// 			{selectedItem !== null
		// 				? items.find((item) => item.id === selectedItem).label
		// 				: "Select Collection"}
		// 			<i
		// 				className={`fa fa-chevron-right dropdown__icon ${isOpen && "open"}`}
		// 			></i>
		// 		</div>
		// 		<div className={`dropdown__body ${isOpen && "open"}`}>
		// 			{items.map((item) => (
		// 				<div
		// 					key={item.id}
		// 					className="dropdown__item"
		// 					onClick={() => handleItemClick(item.id)}
		// 				>
		// 					<span
		// 						className={`dropdown__item-dot ${
		// 							item.id === selectedItem && "selected"
		// 						}`}
		// 					>
		// 						•
		// 					</span>
		// 					{item.label}
		// 				</div>
		// 			))}
		// 		</div>
		// 	</div>
	);
};

export default Dropdown;
