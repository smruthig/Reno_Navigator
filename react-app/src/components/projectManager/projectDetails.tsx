import { Box, Heading, Text } from "@chakra-ui/react";
import { useStoreState } from "easy-peasy";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import Table from "../Table";

const ProjectDetails:React.FC = () => {
	const {projectId} = useParams();
	const employee = useStoreState((state:any)=>state.employee);

	const {isLoading, data} = useQuery('projects',()=>{
			return axios.get(`/projectManager/${employee.employeeId}/${projectId}`)
			.then(({data})=>{
				return data;
			})
			.catch((err)=>{
				console.log(err)
			})
		});

	if(isLoading)
		return null;

	const {customerFeedback,siteCustomerDetails} = data;
	
	return (
	<Box mx="auto" mt="4%" w="50rem">
		<Heading>Project {projectId}</Heading>
		<Text>Start Date</Text>
		<Text>Estimated End Date</Text>
		<Heading size="md">Site Details</Heading>
		<Box>
			<Heading size="md">Customer Feedback</Heading>
			<Table heading="Customer Feedback" data={customerFeedback}/>
		</Box>
		<Heading size="md">Designers</Heading>
		<Heading size="md">Contractors</Heading>
	</Box>
	)
}

export default ProjectDetails;