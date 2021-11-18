import { Box, Heading, Text } from "@chakra-ui/react";
import { useStoreState } from "easy-peasy";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import Table from "../Table";

const ProjectDetails:React.FC = () => {
	const {projectId} = useParams();
	const employee = useStoreState((state:any)=>state.employee);

	const {isLoading, data} = useQuery('projects',()=>{
			return axios.get(`/projectmanager/${employee.employeeId}/${projectId}?designation=${employee.designation}`)
			.then(({data})=>{
				return data;
			})
			.catch((err)=>{
				console.log(err)
			})
		});

	if(isLoading || data===undefined)
		return null;

	const {project,site,customer,customerFeedback} = data;
	
	return (
	<Box mx="auto" mt="4%" w="50rem">
		<Heading>Project {projectId}</Heading>
		<Text>Start Date: {project.startdate}</Text>
		<Text>Estimated End Date: {project.estimatedenddate}</Text>
		<Table heading="Site Details" data={site}/>
		<Table heading="Customer Details" data={customer}/>
		<Table heading="Customer Feedback" data={customerFeedback}/>
		<Heading size="md">Designers</Heading>
		<Heading size="md">Contractors</Heading>
	</Box>
	)
}

export default ProjectDetails;