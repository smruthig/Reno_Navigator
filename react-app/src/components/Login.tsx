import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useStoreActions } from "easy-peasy";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

interface LoginFormProps {
  emailId: string;
  password: string;
}
export const Login: React.FC = () => {
  const loginEmployee:any = useStoreActions((actions:any)=>actions.loginEmployee);

  const { handleSubmit, register } = useForm<LoginFormProps>();

  const navigate = useNavigate();

  const [hidden, setHidden] = useState(true);

  async function onSubmit(formdata: any) {
    try {
      const { data }: AxiosResponse = await axios.post("/login", formdata);
      //successful login
      if (data.message === "success") {
        loginEmployee(data);
        navigate(`/${data.designation}`);
      }
      //new user must sign up
      else if (data.message === "no user") {
        navigate("/signup");
      } else if (data.message === "incorrect password") setHidden(false);
    } catch (err) {
      console.log(err);
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
          <Input {...register("password")} placeholder="Password" type="password"/>
        </FormControl>
        <Flex justifyContent='space-between'>
          <Button my="5" type="submit">
            Submit
          </Button>
          <Button my="5" onClick={()=>{navigate("/signup")}}>
            Sign Up
          </Button>
        </Flex>
        <Text hidden={hidden} color="red">
          Incorrect username or password
        </Text>
      </form>
    </Box>
  );
};
