import './App.css'
import LoginForm from './components/LoginForm/LoginForm'
import AuthorizationCodeForm from './components/AuthorizationCodeForm/AuthorizationCodeForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route
            path='/checkAuthorization'
            element={<AuthorizationCodeForm />}
          />
          <Route
            path='/loggedInPage'
            element={<h1>You have logged in successfully</h1>}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
