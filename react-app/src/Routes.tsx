import {BrowserRouter as Router, Route, Routes as Switch} from "react-router-dom";
import {Login} from "./components/Login";
export default function Routes()
{
	return (
		<Router>
			<Switch>
				<Route path='/' element={<Login/>}/>
				<Route path='/success' element={<h1>Success!!</h1>}/>
			</Switch>
		</Router>
	);
}