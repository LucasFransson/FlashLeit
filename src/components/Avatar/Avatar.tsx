

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
      <img src={url} />
    </div>

  )

}

export default Avatar;