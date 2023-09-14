

function Avatar({url, showModal, updateAvatar, caller}) {

  const avatarClickHandler = () => {

    if (caller === "user-page") {
      showModal();
    } else {
      updateAvatar(url);
    }
  }

  return (
    <div className="avatar__wrapper" onClick={avatarClickHandler}>
      <img src={url} alt="Flashleit blob avatar" />
    </div>

  )
}

export default Avatar;