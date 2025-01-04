import { useNavigate } from 'react-router-dom'
import './AuthorizationCodeForm.css'
import { useState } from 'react'

export default function AuthorizationCodeForm () {
  const navigate = useNavigate()
  const [verCode, setVerCode] = useState('')
  const [loggingFailed, setLoggingFailed] = useState(false)

  const submitAuthorizationCodeForm = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    const reqObj = {
      email: localStorage.getItem('Email'),
      password: localStorage.getItem('Password'),
      code: verCode
    }

    const reqBodyJson = JSON.stringify(reqObj)
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const res = await fetch('http://localhost:4000/login/secondStep', {
      method: 'POST',
      headers: headers,
      body: reqBodyJson
    })
    if (!res.ok) {
      setLoggingFailed(true)
      return
    }

    const resObj = await res.json()

    console.log(resObj)

    navigate('/loggedInPage')
  }

  if (loggingFailed) {
    return (
      <>
        <h1>Authorization failed, refresh and retry</h1>
      </>
    )
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
          <input
            type='text'
            value={verCode}
            onChange={e => {
              setVerCode(e.target.value)
            }}
          />
        </div>
        <button type='submit' onClick={submitAuthorizationCodeForm}>
          Submit
        </button>
      </form>
    </>
  )
}
