function Toggler({
  isChecked,
  onToggle,
}) {

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(event.target.checked);
  }


  return (
    <label className="toggler__switch">
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className="toggler__slider"></span>
    </label>

  )

}

export default Toggler;