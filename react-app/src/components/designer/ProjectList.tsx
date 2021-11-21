import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useStoreState } from "easy-peasy";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

const ProjectListDes: React.FC = () => {
    const employee = useStoreState((state: any) => state.employee);
	const [projects,setProjects] = useState([]);

	const {isLoading} = useQuery('designer-projects-list',()=>{
			return axios.get(`/designer/${employee.employeeId}?designation=${employee.designation}`)
			.then(({data})=>{
				if(data.message==="no projects")
					setProjects([]);
				else
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

export default ProjectListDes;
