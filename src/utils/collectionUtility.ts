import { useAddCollectionMutation, useCloneCollectionMutation, useDeleteCollectionMutation, useDeletePrivateCollectionMutation, useUpdateCollectionCounterMutation } from "../redux/api/collectionsSlice"
import AddCollectionResponeTypes from "../types/AddCollectionResponseType";
import CardCollectionTypes from "../types/CardCollectionTypes";
import CardTypes from "../types/CardTypes";


export const useUpdateCollection = () => {
  
  const [mutate] = useUpdateCollectionCounterMutation();

  const updateCollectionCounter = (id: number, category: string) => {
    mutate({id: id, category: category});
  }

  return updateCollectionCounter;
}

export const useAddCollection = () => {
  const [mutate] = useAddCollectionMutation();

  const addCollection = (collection: CardCollectionTypes): Promise<AddCollectionResponeTypes> => {
    
    return mutate(collection).then(result => {

      console.log("Raw result", result);

      if ('data' in result) {
        console.log(result.data);
        return result.data;
      }

      throw new Error("Failed to add collection");
      
      
    })
  }

  return addCollection;
}

export const useDeletePrivateCollection = () => {
  const [mutate] = useDeletePrivateCollectionMutation();

  const deletePrivateCollection = (collectionId: number) => {
    mutate({collectionId});
  }

  return deletePrivateCollection;
}

export const useDeleteCollection = () => {
  const [mutate] = useDeleteCollectionMutation();

  const deleteCollections = (collectionId: number, userId: number) => {
    
    mutate({collectionId: collectionId, userId: userId});

  }

  return deleteCollections;
}

export const useCloneCollection = () => {
  const [mutate] = useCloneCollectionMutation();

  const cloneCollection = (userId: number, collection: CardCollectionTypes) => { 
    mutate({userId: userId, collection: collection});
  }

  return cloneCollection;
}