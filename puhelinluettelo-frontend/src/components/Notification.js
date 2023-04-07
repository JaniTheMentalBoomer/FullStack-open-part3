const success = {
    color: 'green'
  }
  
  const error = {
    color: 'red'
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    if (message.includes('VIRHE')){
      return (
        <div style={error} className="notification">
          {message}
        </div>
      )
    } else {
      return (
        <div style={success} className="notification">
          {message}
        </div>
      )
    }
  }

  export default Notification