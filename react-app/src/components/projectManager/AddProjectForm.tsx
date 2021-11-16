import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useStoreState } from "easy-peasy";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

interface AddProjectFormProps {
    houseNo: string;
    street: string;
    pincode: string;
    city: string;
    state: string;
    length: number;
    breadth: number;
    customer: string;
}
const AddProjectForm: React.FC = () => {
    const { handleSubmit, register } = useForm<AddProjectFormProps>();
    const navigate = useNavigate();
    const employee = useStoreState((state: any) => state.employee);

    const [startDate, setStartDate] = useState(new Date());
    const [estimatedEndDate, setEstimatedEndDate] = useState(new Date());

    async function onSubmit(formdata: any) {
        try {
            const { data }: AxiosResponse = await axios.post(
                `/projectManager/${employee.employeeId}`,
                {
                    ...formdata,
                    startDate,
                    estimatedEndDate
                }
            );
            navigate(-1);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Box mx="auto" my="auto" w="50rem" h="50rem" p="5rem">
            <Heading textAlign="center">Sign Up</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="house-no" isRequired>
                    <FormLabel>House No</FormLabel>
                    <Input {...register("houseNo")} placeholder="House No" />
                </FormControl>
                <FormControl id="street" isRequired>
                    <FormLabel>Street</FormLabel>
                    <Input {...register("street")} placeholder="Street" />
                </FormControl>
                <FormControl id="Pincode" isRequired>
                    <FormLabel>Pincode</FormLabel>
                    <Input {...register("pincode")} placeholder="address" />
                </FormControl>
                <FormControl id="City" isRequired>
                    <FormLabel>City</FormLabel>
                    <Input {...register("city")} placeholder="city" />
                </FormControl>
                <FormControl id="State" isRequired>
                    <FormLabel>State</FormLabel>
                    <Input {...register("state")} placeholder="state" />
                </FormControl>
                <FormControl id="length" isRequired>
                    <FormLabel>length</FormLabel>
                    <NumberInput>
                        <NumberInputField
                            {...register("length")}
                            placeholder="length"
                        />
                    </NumberInput>
                </FormControl>
                <FormControl id="breadth" isRequired>
                    <FormLabel>breadth</FormLabel>
                    <NumberInput>
                        <NumberInputField
                            {...register("breadth")}
                            placeholder="breadth"
                        />
                    </NumberInput>
                </FormControl>
                <FormControl id="start-date" isRequired>
                    <FormLabel>start date</FormLabel>
                    <DatePicker
                        selected={startDate}
                        minDate={startDate}
                        onChange={(date:Date) => {
                            setStartDate(date);
                        }}
                        dateFormat="d/M/yyyy"
                    />
                </FormControl>
                <FormControl id="end-date" isRequired>
                    <FormLabel>estimated end date</FormLabel>
                    <DatePicker
                        selected={estimatedEndDate}
                        minDate={startDate}
                        onChange={(date:Date) => {
                            setEstimatedEndDate(date);
                        }}
                        dateFormat="d/M/yyyy"
                    />
                </FormControl>
                <Button my="5" type="submit">
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default AddProjectForm;
