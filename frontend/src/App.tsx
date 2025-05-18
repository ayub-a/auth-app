import { Route, Routes } from "react-router-dom"

import { LoginPage } from "./pages/login"
import { RegisterPage } from "./pages/register"
import { VerifyEmail } from "./pages/verifyEmail"


const Home = () => {
	return <div>Home page</div>
}


function App() {

	return <Routes>
		<Route path="/" element={<Home/>}/>
		<Route path="/login" element={<LoginPage />}/>
		<Route path="/register" element={<RegisterPage />}/>
		<Route path="/email/verify/:code" element={<VerifyEmail />}/>

	</Routes>
}


export default App
