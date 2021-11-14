import {BrowserRouter as Router, Route, Routes as Switch} from "react-router-dom";
import {Login} from "./components/Login";
import { SignUp } from "./components/SignUp";
export default function Routes()
{
	return (
		<Router>
			<Switch>
				<Route path='/' element={<Login/>}/>
				<Route path='/signup' element={<SignUp/>}/>
			</Switch>
		</Router>
	);
}