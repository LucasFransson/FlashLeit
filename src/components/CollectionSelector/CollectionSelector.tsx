import CardCollectionTypes from "../../types/CardCollectionTypes";

interface CollectionSelectorProps {
  collections: CardCollectionTypes[];
  onCollectionChange: (collectionId: number) => void;
}

const CollectionSelector: React.FC<CollectionSelectorProps> = ({ collections, onCollectionChange }) => {

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const collectionId = Number(event.target.value);
    onCollectionChange(collectionId);
  }

  return (
    <div className="collection-selector">
      <select onChange={handleSelectChange}>
        {collections.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CollectionSelector;