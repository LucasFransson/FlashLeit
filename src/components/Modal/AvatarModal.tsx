import { useGetAllAvatarsQuery } from "../../redux/api/avatarsSlice";
import Avatar from "../Avatar/Avatar";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import ErrorMsg from "../ErrorMsg/ErrorMsg";


function AvatarModal({updateUserAvatar}) {

  const {data: avatars, isError: isAvatarError, error: avatarError, isLoading: isLoadingAvatar } = useGetAllAvatarsQuery();

  const updateAvatar = (url: string) => {  
    updateUserAvatar(url);
  }
  
  return (
    <>
    {isLoadingAvatar ? (
      <LoadingIcon />
    ) : isAvatarError ? (
      <ErrorMsg error={avatarError}/>
    ) : (      
    <div className="modal__backdrop">
        <div className="modal__content">
          <div className="modal__header">
            <h2>Pick your Avatar:</h2>
          </div>
          {avatars?.map(avatar => (
            <div className="modal__avatar__wrapper">
              <Avatar key={avatar.id} url={avatar.url} caller={"modal"} updateAvatar={updateAvatar}/>
            </div>
          ))}
        </div>
      </div>)}
    </>
  );
}

  export default AvatarModal;

