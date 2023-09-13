import { useAddCollectionMutation, useDeleteCollectionMutation, useUpdateCollectionCounterMutation } from "../redux/api/collectionsSlice"
import CardCollectionTypes from "../types/CardCollectionTypes";


export const useUpdateCollection = () => {
  
  const [mutate] = useUpdateCollectionCounterMutation();

  const updateCollectionCounter = (id: number, category: string) => {
    mutate({id: id, category: category});
  }

  return updateCollectionCounter;
}

export const useAddCollection = () => {
  const [mutate] = useAddCollectionMutation();

  const addCollection = (collection: CardCollectionTypes) => {
    mutate(collection);
  }

  return addCollection;
}

export const useDeleteCollection = () => {
  const [mutate] = useDeleteCollectionMutation();

  const deleteCollections = (collectionId: number, userId: number) => {
    
    mutate({collectionId: collectionId, userId: userId});

  }

  return deleteCollections;
}