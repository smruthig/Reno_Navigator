import { Button } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/layout";
import { useStoreState } from "easy-peasy";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

const ProjectList: React.FC = () => {
    const employee = useStoreState((state: any) => state.employee);
	const navigate = useNavigate();

	const {isLoading} = useQuery('projects',()=>{
			axios.get(`/project?employee_id=${employee.employeeId}`)
			.then(({data})=>{
				console.log(data);
			})
			.catch((err)=>{
				console.log(err)
			})
		});
	if(isLoading)
		return null;

    return (
        <Box mx="auto" my="auto" w="50rem" h="90rem" p="5rem">
            <Heading>My Projects</Heading>
			<Button onClick={()=>{
				navigate('/addproject');
			}}>Add Project</Button>
        </Box>
    );
};

export default ProjectList;
