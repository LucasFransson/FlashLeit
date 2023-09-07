import { useUpdateCollectionCounterMutation } from "../redux/api/collectionsSlice"


export const useUpdateCollection = () => {
  
  const [mutate] = useUpdateCollectionCounterMutation();

  const updateCollectionCounter = (id: number, category: string) => {
    mutate({id: id, category: category});
  }


  return updateCollectionCounter;


}