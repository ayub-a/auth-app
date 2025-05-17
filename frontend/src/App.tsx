import { Route, Routes } from "react-router-dom"

import { LoginPage } from "./pages/login"


const Home = () => {
	return <div>Home page</div>
}


function App() {

	return <Routes>
		<Route path="/" element={<Home/>}/>
		<Route path="/login" element={<LoginPage />}/>
	</Routes>
}


export default App
