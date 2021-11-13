import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";
import axios from "../utils/axios";
import { useForm } from "react-hook-form";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  emailId: string;
  password: string;
}
export const Login: React.FC = () => {
  const { handleSubmit, register } = useForm<LoginFormProps>();
  const navigate = useNavigate();
  async function onSubmit(formdata: any) {
    const {data}: AxiosResponse = await axios.post("/login", formdata);
    //successful login
    if (data.message === "success") {
      navigate(`/user/${data.employeeId}`);
    }
    //new user must sign up
    else if(data.message === "no user"){
      navigate('/signup'); 
    }
  }

  return (
    <Box mx="auto" my="auto" w="50rem" h="50rem" p="5rem">
      <Heading textAlign="center">Login</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="email-id" isRequired>
          <FormLabel>Email ID</FormLabel>
          <Input {...register("emailId")} placeholder="Email Id" />
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
