import './LoginForm.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function LoginForm () {
  const navigate = useNavigate()
  const [loggingFailed, setLoggingFailed] = useState(false)
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')

  const submitLoginForm = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    const data = {
      email: inputEmail,
      password: inputPassword
    }
    const jsonData = JSON.stringify(data)
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const res = await fetch('http://localhost:4000/login/firstStep', {
      method: 'POST',
      headers: headers,
      body: jsonData
    })
    if (!res.ok) {
      setLoggingFailed(true)
      return
    }

    localStorage.setItem('Email', inputEmail)
    localStorage.setItem('Password', inputPassword)

    navigate('/checkAuthorization')
  }

  if (loggingFailed) {
    return (
      <>
        <h1>Logging failed, refresh and retry</h1>
      </>
    )
  }

  return (
    <>
      <form className='LoginForm'>
        <h1>Please log in</h1>
        <div className='FormField'>
          <label>Email:</label>
          <input
            className='userEmailInput'
            value={inputEmail}
            onChange={e => setInputEmail(e.target.value)}
            type='email'
          />
        </div>
        <div className='FormField'>
          <label>Password:</label>
          <input
            className='userPasswordInput'
            value={inputPassword}
            onChange={e => setInputPassword(e.target.value)}
            type='password'
          />
        </div>
        <button type='submit' onClick={submitLoginForm}>
          Submit
        </button>
      </form>
    </>
  )
}
