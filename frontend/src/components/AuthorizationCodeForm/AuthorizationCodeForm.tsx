import { useNavigate } from 'react-router-dom'
import './AuthorizationCodeForm.css'

export default function AuthorizationCodeForm () {
  const navigate = useNavigate()

  const submitAuthorizationCodeForm = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    navigate('/loggedInPage')
  }

  return (
    <>
      <form className='AuthorizationCodeForm'>
        <p>
          Authorization code has been send on your emal. Check it and enter
          below:
        </p>
        <div className='FormField'>
          <label>Authorization Code:</label>
          <input type='text' />
        </div>
        <button type='submit' onClick={submitAuthorizationCodeForm}>
          {' '}
          Submit
        </button>
      </form>
    </>
  )
}
