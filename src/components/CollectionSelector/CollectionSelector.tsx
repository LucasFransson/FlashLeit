import CardCollectionTypes from '../../types/CardCollectionTypes';
import { useState } from 'react';

interface CollectionSelectorProps {
	collections: CardCollectionTypes[] | null;
	onCollectionChange: (collectionId: number) => void;
  isCheckedProp: boolean;
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

	return (
    <div className="collection-selector">
      <>
        <h1 className="collection-selector__title">{selectedTitle}</h1>
      </>
      <>
        <div className="collection-selector__wrapper">
          <label className="collection-selector__wrapper--label">Collection: </label>
            <select
              className="collection-selector__selector"
              onChange={handleSelectChange}
              value={collections.find((col) => col.title === selectedTitle)?.id}
            >
              {collections.map((collection) => (
                <option className="collection-selector__option" key={collection.id} value={collection.id}>
                  {collection.title}
                </option>
              ))}
            </select>
          </div>
        </>
      </div>
  );
};

export default CollectionSelector;
