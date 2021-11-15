import {BrowserRouter as Router, Route, Routes as Switch} from "react-router-dom";
import {Login} from "./components/Login";
import AddProjectForm from "./components/projectManager/AddProjectForm";
import ProjectList from "./components/projectManager/ProjectList";
import { SignUp } from "./components/SignUp";
export default function Routes()
{
	return (
		<Router>
			<Switch>
				<Route path='/' element={<Login/>}/>
				<Route path='/signup' element={<SignUp/>}/>
				<Route path='/projectManager' element={<ProjectList/>}/>
				<Route path='/addproject' element={<AddProjectForm/>}/>
			</Switch>
		</Router>
	);
}