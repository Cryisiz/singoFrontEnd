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
import AddActivities from "./Activities/AddActivities"
import EditViewActivities from "./Admin/Activities/EditViewActivities"
import EditActivities from "./Admin/Activities/EditActivities"
import DeleteActivities from "./Admin/Activities/DeleteActivities"
import AddHotel from "./Hotel/AddHotel"
import EditViewHotel from "./Admin/Hotel/EditViewHotel"
import EditHotel from "./Admin/Hotel/EditHotel"
import DeleteHotel from "./Admin/Hotel/DeleteHotel"

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
            {/*Add*/}
            <Route path={'/addActivities'} element={ <RequireAuth loginPath={'/'}> <AddActivities/></RequireAuth>}/>
            <Route path={'/addHotel'} element={ <RequireAuth loginPath={'/'}> <AddHotel/></RequireAuth>}/>

            {/*Admin*/}
            <Route path="/adminsignin" element={<AdminSignIn />} />
            {/*Secure*/}
            <Route path={'/adminhome'} element={ <RequireAuth loginPath={'/adminsignin'}> <AdminHome/></RequireAuth>}/>
            {/*Hotel"*/}
            <Route path={'/createhotel'} element={ <RequireAuth loginPath={'/adminsignin'}> <CreateHotel/></RequireAuth>}/>
            <Route path={'/editViewHotel'} element={ <RequireAuth loginPath={'/adminsignin'}> <EditViewHotel/></RequireAuth>}/>
            <Route path={'/edithotel'} element={ <RequireAuth loginPath={'/adminsignin'}> <EditHotel/></RequireAuth>}/>
            <Route path={'/deleteHotel'} element={ <RequireAuth loginPath={'/adminsignin'}> <DeleteHotel/></RequireAuth>}/>
            {/*Restaurant"*/}
            <Route path={'/createRestaurant'} element={ <RequireAuth loginPath={'/adminsignin'}> <CreateRestaurant/></RequireAuth>}/>

            {/*Activities"*/}
            <Route path={'/createActivities'} element={ <RequireAuth loginPath={'/adminsignin'}> <CreateActivities/></RequireAuth>}/>
            <Route path={'/editViewActivities'} element={ <RequireAuth loginPath={'/adminsignin'}> <EditViewActivities/></RequireAuth>}/>
            <Route path={'/editActivities'} element={ <RequireAuth loginPath={'/adminsignin'}> <EditActivities/></RequireAuth>}/>
            <Route path={'/deleteActivities'} element={ <RequireAuth loginPath={'/adminsignin'}> <DeleteActivities/></RequireAuth>}/>
            
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}
export default App;
