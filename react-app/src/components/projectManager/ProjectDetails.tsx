import { Box, Heading, Text } from "@chakra-ui/react";
import { useStoreState } from "easy-peasy";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import Table from "../Table";

const ProjectDetails:React.FC = () => {
	const {projectId} = useParams();
	const employee = useStoreState((state:any)=>state.employee);

	const {isLoading, data} = useQuery('project-details',()=>{
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

	const {project,site,customer,customerFeedback, designer, contractor, des_for_rooms} = data;
	
	return (
	<Box mx="auto" mt="4%" w="60rem">
		<Heading>Project {projectId}</Heading>
		<Text>Start Date: {project.startdate}</Text>
		<Text>Estimated End Date: {project.estimatedenddate}</Text>
		<Table heading="Site Details" data={site} tableHeadings={['houseno', 'street', 'pincode', 'city', 'state', 'length', 'breadth']}/>
		<Table heading="Customer Details" data={customer} tableHeadings={['customername', 'customerphno', 'customeremailid', 'customeraddress']}/>
		<Table heading="Customer Feedback" data={customerFeedback} tableHeadings={['customerid', 'feedback', 'feedbackdate', 'rating']}/>
		<Table heading="Designers" data={designer} tableHeadings={['employeeid', 'empname', 'empemailid']}/>
		<Table heading="Contractors" data={contractor} tableHeadings={['contractorid', 'contractorname', 'typeofwork', 'contractoremail']}/>
		<Table heading="Design" data={des_for_rooms} tableHeadings={['roomid', 'roomname', 'roomsize', 'designid', 'productid', 'typename', 'productcost', 'description']}/>
	</Box>
	)
}

export default ProjectDetails;