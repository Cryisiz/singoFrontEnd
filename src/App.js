import { Route, Routes,BrowserRouter} from "react-router-dom"
import {AuthProvider} from 'react-auth-kit'
import { RequireAuth } from 'react-auth-kit'
import SignIn from "./Account/SignIn"
import SignUp from "./Account/SignUp"
import Home from "./Customer/Home"
import ViewHotel from "./Hotel/ViewHotel"
import ViewActivities from "./Activities/ViewActivities"
import ViewRestaurant from "./Restaurant/ViewRestaurant"
import AdminSignIn from "./Admin/AdminSignIn"
import AdminHome from "./Admin/AdminHome"
import CreateHotel from "./Admin/Hotel/CreateHotel"
import CreateRestaurant from "./Admin/Restaurant/CreateRestaurant"
import CreateActivities from "./Admin/Activities/CreateActivities"

export function App() {
  return (
    <AuthProvider authName={"_auth"} authType={"cookie"}cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === "https:"} >
    <BrowserRouter>
    <Routes> 
             {/*User*/}
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />           
            {/*Secure*/}
            <Route path={'/home'} element={ <RequireAuth loginPath={'/'}> <Home/></RequireAuth>}/>
            <Route path={'/viewHotel'} element={ <RequireAuth loginPath={'/'}> <ViewHotel/></RequireAuth>}/>
            <Route path={'/viewRestaurant'} element={ <RequireAuth loginPath={'/'}> <ViewRestaurant/></RequireAuth>}/>
            <Route path={'/viewActivities'} element={ <RequireAuth loginPath={'/'}> <ViewActivities/></RequireAuth>}/>
            <Route path={'/viewHotel'} element={ <RequireAuth loginPath={'/'}> <ViewActivities/></RequireAuth>}/>

            {/*Admin*/}
            <Route path="/adminsignin" element={<AdminSignIn />} />
            {/*Secure*/}
            <Route path={'/adminhome'} element={ <RequireAuth loginPath={'/adminsignin'}> <AdminHome/></RequireAuth>}/>
            <Route path={'/createhotel'} element={ <RequireAuth loginPath={'/adminsignin'}> <CreateHotel/></RequireAuth>}/>
            <Route path={'/createRestaurant'} element={ <RequireAuth loginPath={'/adminsignin'}> <CreateRestaurant/></RequireAuth>}/>
            <Route path={'/createActivities'} element={ <RequireAuth loginPath={'/adminsignin'}> <CreateActivities/></RequireAuth>}/>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}
export default App;
