import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";
import axios from "../utils/axios";
import { useForm } from "react-hook-form";

interface LoginProps {
  employeeId: string;
  password: string;
}
export const Login: React.FC = () => {
  const { handleSubmit, register } = useForm<LoginProps>();
  function onSubmit(data: any) {
	  console.log(data)
	  axios.post('/login',data)
  }

  return (
    <Box mx="auto" my="auto" w="50rem" h="50rem" p="5rem">
      <Heading textAlign="center">Login</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="employee-id" isRequired>
          <FormLabel>Employee Id</FormLabel>
          <Input {...register("employeeId")} placeholder="Employee Id" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input {...register("password")} placeholder="Password" />
        </FormControl>
        <Button my="5" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};
