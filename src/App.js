import { Route, Routes } from "react-router-dom"
import SignIn from "./Account/SignIn"
import SignUp from "./Account/SignUp"
import Home from "./Customer/Home"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}
export default App;
