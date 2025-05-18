import { Route, Routes } from "react-router-dom"

import { LoginPage } from "./pages/login"
import { RegisterPage } from "./pages/register"
import { VerifyEmail } from "./pages/verifyEmail"
import { PasswordForgotPage } from "./pages/passwordForgot"
import { PasswordResetPage } from "./pages/passwordReset"
import { AppContainer } from "./components/appContainer"
import { ProfilePage } from "./pages/profile"


function App() {

	return <Routes>
		<Route path="/" element={<AppContainer />}>
			<Route index element={<ProfilePage />}/>
		</Route>
		
		<Route path="/login" element={<LoginPage />}/>
		<Route path="/register" element={<RegisterPage />}/>
		<Route path="/email/verify/:code" element={<VerifyEmail />}/>
		<Route path="/password/forgot" element={<PasswordForgotPage />}/>
		<Route path="/password/reset" element={<PasswordResetPage />}/>
	</Routes>
}


export default App
