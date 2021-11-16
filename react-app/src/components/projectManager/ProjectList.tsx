import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading} from "@chakra-ui/layout";
import { useStoreState } from "easy-peasy";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import {Link} from "react-router-dom"

const ProjectList: React.FC = () => {
    const employee = useStoreState((state: any) => state.employee);
	const navigate = useNavigate();
	const [projects,setProjects] = useState([]);

	const {isLoading} = useQuery('projects',()=>{
			axios.get(`/projectManager/${employee.employeeId}`)
			.then(({data})=>{
				setProjects(data);
			})
			.catch((err)=>{
				console.log(err)
			})
		});
	if(isLoading)
		return null;

    return (
        <Box mx="auto" my="auto" w="50rem" h="90rem" p="5rem">
			<Flex justifyContent='space-between'>
				<Heading>My Projects</Heading>
				<Button onClick={()=>{
					navigate('/addproject');
				}}>Add Project</Button>
			</Flex>
			{
				projects.map((proj:any)=>{
					return(
					<Box key={proj.projectid} my={5}>
						<Link to={`/${employee.designation}/${proj.projectid}`}>Project {proj.projectid}</Link>
					</Box>
					)
				})
			}
        </Box>
    );
};

export default ProjectList;
