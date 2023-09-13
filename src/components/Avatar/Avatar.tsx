

function Avatar({url, showModal, caller}) {

  const avatarClickHandler = () => {

    if (caller === "user-page") {
      showModal();
    }
  }

  return (
    <div className="avatar__wrapper" onClick={avatarClickHandler}>
      <img src={url} />
    </div>

  )

}

export default Avatar;