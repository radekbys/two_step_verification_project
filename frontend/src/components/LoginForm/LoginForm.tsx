import './LoginForm.css'
import { useNavigate } from 'react-router-dom'

export default function LoginForm () {
  const navigate = useNavigate()

  const submitLoginForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    navigate('/checkAuthorization')
  }

  return (
    <>
      <form className='LoginForm'>
        <h1>Please log in</h1>
        <div className='FormField'>
          <label>Email:</label>
          <input type='text' />
        </div>
        <div className='FormField'>
          <label>Password:</label>
          <input type='password' />
        </div>
        <button type='submit' onClick={submitLoginForm}>
          Submit
        </button>
      </form>
    </>
  )
}
