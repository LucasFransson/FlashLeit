import CardCollectionTypes from '../../types/CardCollectionTypes';
import { useState } from 'react';

interface CollectionSelectorProps {
	collections: CardCollectionTypes[] | null;
	onCollectionChange: (collectionId: number) => void;
}

const CollectionSelector: React.FC<CollectionSelectorProps> = ({
	collections,
	onCollectionChange,
}) => {
	const [selectedTitle, setSelectedTitle] = useState(
		collections && collections.length > 0 ? collections[0].title : ''
	);

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const collectionId = Number(event.target.value);
		// onCollectionChange(collectionId);
		const selectedCollection = collections?.find(
			(col) => col.id === collectionId
		);
		if (selectedCollection) {
			setSelectedTitle(selectedCollection.title);
		}
		onCollectionChange(collectionId);
	};

	// TODO: Redirect to create new collection:
	const createCollection = () => {};

	return (
		<div className="collection-selector">
			<>
				<h1 className="collection-selector__title">{selectedTitle}</h1>
			</>
			{collections && collections.length > 0 ? (
				<div className="collection-selector__wrapper">
					<label className="collection-selector__wrapper--label">
						Collection:{' '}
					</label>
					<select
						className="collection-selector__selector"
						onChange={handleSelectChange}
						value={collections.find((col) => col.title === selectedTitle)?.id}
					>
						{collections.map((collection) => (
							<option
								className="collection-selector__option"
								key={collection.id}
								value={collection.id}
							>
								{collection.title}
							</option>
						))}
					</select>
				</div>
			) : (
				<div className="">
					<p>You don't have any collections..</p>
					<div className="collection-selector__buttons">
						<button
							className="collection-selector__btn"
							onClick={createCollection}
						>
							Create Collection
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
{
	/*       
			{collections.length > 0 ? (
				<select
					className="collection-selector__selector"
					onChange={handleSelectChange}
				>
					{collections.map((collection) => (
						<>
							<option
								className="collection-selector__option"
								key={collection.id}
								value={collection.id}
							>
								{collection.title}
							</option>
						</>
					))}
				</select>
			) : (
				<>
					<div className="">
						<p>You don't have any collections..</p>
						<div className="collection-selector__buttons">
							<button
								className="collection-selector__btn"
								onClick={createCollection}
							>
								Create Collection
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}; */
}

export default CollectionSelector;
