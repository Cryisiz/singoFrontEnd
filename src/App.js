import { Route, Routes } from "react-router-dom"
import SignIn from "./Account/SignIn"
import SignUp from "./Account/SignUp"
export function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}
export default App;
