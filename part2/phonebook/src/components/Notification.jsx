const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message.includes('error')) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  if (message.includes('Added')) {
    return (
      <div className="someChangeHappened">
        {message}
      </div>
    )
  }
  return 
}



export default Notification