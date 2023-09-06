import { Route, Routes,Navigate,BrowserRouter} from "react-router-dom"
import SignIn from "./Account/SignIn"
import SignUp from "./Account/SignUp"
import Home from "./Customer/Home"
import {AuthProvider} from 'react-auth-kit'
import { RequireAuth } from 'react-auth-kit'

export function App() {
  return (
    <AuthProvider authName={"_auth"} authType={"cookie"}cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === "https:"} >
    <BrowserRouter>
    <Routes>     
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path={'/home'} element={ <RequireAuth loginPath={'/'}> <Home/></RequireAuth>
            }/>

    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}
export default App;
