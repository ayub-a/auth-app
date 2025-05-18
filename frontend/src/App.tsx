import { Route, Routes } from "react-router-dom"

import { LoginPage } from "./pages/login"
import { RegisterPage } from "./pages/register"


const Home = () => {
	return <div>Home page</div>
}


function App() {

	return <Routes>
		<Route path="/" element={<Home/>}/>
		<Route path="/login" element={<LoginPage />}/>
		<Route path="/register" element={<RegisterPage />}/>

	</Routes>
}


export default App
