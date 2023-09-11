import CardCollectionTypes from "../../types/CardCollectionTypes";

interface CollectionSelectorProps {
  collections: CardCollectionTypes[] | null;
  onCollectionChange: (collectionId: number) => void;
}

const CollectionSelector: React.FC<CollectionSelectorProps> = ({ collections, onCollectionChange }) => {

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const collectionId = Number(event.target.value);
    onCollectionChange(collectionId);
  }

  // TODO: Redirect to create new collection:
  const createCollection = () => {

  }

  return (
    <div className="collection-selector">
      {collections.length > 0 ? (
        <select className="collection-selector__selector" onChange={handleSelectChange}>
          {collections.map((collection) => (
            <option className="collection-selector__option" key={collection.id} value={collection.id}>
              {collection.title}
            </option>
          ))}
        </select>
      ) : (
        <>
          <div className="">
            <p>You don't have any collections..</p>
            <div className="collection-selector__buttons">
              <button className="collection-selector__btn" onClick={createCollection}>Create Collection</button>
            </div>
          </div>

        </>

      )}
    </div>
  );
};

export default CollectionSelector;