import { useGetAllAvatarsQuery, useGetUserAvatarsQuery } from "../../redux/api/avatarsSlice";
import Avatar from "../Avatar/Avatar";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import AvatarTypes from "../../types/AvatarTypes";
import {useEffect, useState} from "react";


function AvatarModal({updateUserAvatar, userId}) {

  const {data: unlockedAvatars, isError: isUnlockedAvatarError, error: unlockedAvatarError, isLoading: isLoadingUnlockedAvatars} = useGetUserAvatarsQuery(userId);
  const {data: allAvatars, isError: isAvatarError, error: avatarError, isLoading: isLoadingAvatar } = useGetAllAvatarsQuery();
  const [lockedAvatars, setLockedAvatars] = useState<AvatarTypes[]>([])

  useEffect(() => {
    const filteredAvatars = allAvatars?.filter( avatar => !unlockedAvatars?.some(unlockedAvatar => unlockedAvatar.id === avatar.id));

    setLockedAvatars(filteredAvatars);

  }, [unlockedAvatars && allAvatars])

  const updateAvatar = (url: string) => {  
    updateUserAvatar(url);
  }
  

  return (
    <>
    {isLoadingUnlockedAvatars || isLoadingAvatar ? (
      <LoadingIcon />
    ) : isUnlockedAvatarError ? (
      <ErrorMsg error={unlockedAvatarError} 
      /> 
    ) : isAvatarError ? (
      <ErrorMsg error={avatarError}
      />
    ) : (    
    <div className="modal__backdrop">
        <div className="modal__content">
          <div className="modal__header">
            <h2>Pick your Avatar:</h2>
          </div>
          {unlockedAvatars?.map(avatar => (
            <div className="modal__avatar__wrapper">
              <Avatar key={avatar.id} url={avatar.url} caller={"modal"} updateAvatar={updateAvatar}/>
            </div>
          ))}
          {lockedAvatars?.map(avatar => (
            <div className="modal__avatar__wrapper__locked">
              <Avatar key={avatar.id} url={avatar.url} caller={"modal"} />
            </div>
          ))}
        </div>
      </div>)}
    </>
  );
}

  export default AvatarModal;


