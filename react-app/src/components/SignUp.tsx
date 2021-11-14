import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";
import { NumberInput, NumberInputField, Select } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface SignUpFormProps {
  emailId: string;
  password: string;
  address: string;
  designation: string;
  salary: number;
}
export const SignUp: React.FC = () => {
  const { handleSubmit, register } = useForm<SignUpFormProps>();
  const navigate = useNavigate();
  async function onSubmit(formdata: any) {
    console.log(formdata);
  }

  return (
    <Box mx="auto" my="auto" w="50rem" h="50rem" p="5rem">
      <Heading textAlign="center">Sign Up</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="email-id" isRequired>
          <FormLabel>Email ID</FormLabel>
          <Input {...register("emailId")} placeholder="Email Id" />
        </FormControl>
        <FormControl id="" isRequired>
          <FormLabel>Password</FormLabel>
          <Input {...register("password")} placeholder="Password" />
        </FormControl>
        <FormControl id="Address" isRequired>
          <FormLabel>Address</FormLabel>
          <Input {...register("address")} placeholder="Address" />
        </FormControl>
        <FormControl id="designation" isRequired>
          <FormLabel>Designation</FormLabel>
          <Select placeholder="Select option" {...register("designation")}>
            <option value="projectManager">project manager</option>
            <option value="designer">designer</option>
            <option value="companyManager">company manager</option>
            <option value="accountant">accountant</option>
          </Select>
        </FormControl>
        <FormControl id="salary" isRequired>
          <FormLabel>Salary</FormLabel>
          <NumberInput min={15001} defaultValue={15001}>
            <NumberInputField {...register("salary")} />
          </NumberInput>
        </FormControl>
        <Button my="5" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};
