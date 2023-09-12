import React, { useState } from "react";
import CardCollectionTypes from "../../types/CardCollectionTypes";

interface CollectionSelectorProps {
  collections: CardCollectionTypes[] | null;
  onCollectionChange: (collectionId: number) => void;
}

const CollectionSelector: React.FC<CollectionSelectorProps> = ({ collections, onCollectionChange }) => {

  const [isChecked, setIsChecked] = useState(true);
  const [titleInput, setTitleInput] = useState('');
  const [isTitleInputEmpty, setIsTitleInputEmpty] = useState(true);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const collectionId = Number(event.target.value);
    onCollectionChange(collectionId);
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setIsChecked(e.target.checked);
  }

  // TODO: Set up logic to create new collection:
  const createCollection = () => {
    console.log(titleInput);
  }

  return (
    <div className="collection-selector">


      {collections.length > 0 ? (
        <>
          <label className='collection-selector__toggler-switch'>
				    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
				    <span className='collection-selector__toggler-slider'></span>
			    </label>

          {isChecked ? (
            <select className="collection-selector__selector" onChange={handleSelectChange}>
              {collections.map((collection) => (
                <option className="collection-selector__option" key={collection.id} value={collection.id}>
                  {collection.title}
                </option>
            ))}
            </select>
          ) : (
            <>
            <input type="text" onChange={(e) => {
              setTitleInput(e.target.value);
              setIsTitleInputEmpty(e.target.value === '');
            }}/>
            <button onClick={createCollection} disabled={isTitleInputEmpty}>Create collection</button>
            </>
        )}

        </>
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