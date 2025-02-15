import { Box} from "@chakra-ui/react"
import {Routes,Route} from "react-router-dom"
import HomePage from "./Pages/HomePage"
import CreatePage from "./Pages/CreatePage"
import Navbar from "./Components/Navbar"
import { useCustomTheme } from "./hooks/useCustomTheme"
import { useColorModeValue } from "./Components/ui/color-mode"
import SignupPage from "./Pages/SignupPage"
import LoginPage from "./Pages/LoginPage"
function App() {


  return (
    <>
      <Box  >
        {<Navbar/>}
        {/* <useCustomTheme> */}
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/create" element={<CreatePage/>} />
          </Routes>
          {/* </useCustomTheme> */}
      </Box>
    </>
  )
}

export default App
