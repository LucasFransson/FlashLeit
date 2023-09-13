import Avatar from "../Avatar/Avatar";

function AvatarModal() {



  return (
    <div className="modal__backdrop">
      <div className="modal__content">
        <div className="modal__header">
          <h2>Pick a new Avatar:</h2>
        </div>
        <div className="modal__avatar__wrapper">
          <Avatar url={"/img/user_avatars/avatar_1.png"} caller={"modal"} />
        </div>
        <div className="modal__avatar__wrapper">
          <Avatar url={"/img/user_avatars/avatar_2.png"} caller={"modal"} />
        </div>
        <div className="modal__avatar__wrapper">
          <Avatar url={"/img/user_avatars/avatar_3.png"} caller={"modal"} />
        </div>
        <div className="modal__avatar__wrapper">
          <Avatar url={"/img/user_avatars/avatar_4.png"} caller={"modal"} />
        </div>
        <div className="modal__avatar__wrapper">
          <Avatar url={"/img/user_avatars/avatar_5.png"} caller={"modal"} />
        </div>
        <div className="modal__avatar__wrapper">
          <Avatar url={"/img/user_avatars/avatar_6.png"} caller={"modal"} />
        </div>
        <div className="modal__avatar__wrapper">
          <Avatar url={"/img/user_avatars/avatar_7.png"} caller={"modal"} />
        </div>
        <div className="modal__avatar__wrapper">
          <Avatar url={"/img/user_avatars/avatar_8.png"} caller={"modal"} />
        </div>
        <div className="modal__avatar__wrapper">
          <Avatar url={"/img/user_avatars/avatar_9.png"} caller={"modal"} />
        </div>
        <div className="modal__avatar__wrapper">
          <Avatar url={"/img/user_avatars/avatar_10.png"} caller={"modal"} />
        </div>
        <div className="modal__avatar__wrapper">
          <Avatar url={"/img/user_avatars/avatar_11.png"} caller={"modal"} />
        </div>
      </div>
    </div>

  );
}

  export default AvatarModal;

