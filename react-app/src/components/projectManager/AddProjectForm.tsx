import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberInput,
    NumberInputField,
    Select,
    useDisclosure,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useStoreState } from "easy-peasy";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import formatDate from "../../utils/formatDate";

interface AddProjectFormProps {
    houseNo: string;
    street: string;
    pincode: string;
    city: string;
    state: string;
    length: number;
    breadth: number;
    customerid: number;
}
const AddProjectForm: React.FC = () => {
    const { handleSubmit, register } = useForm<AddProjectFormProps>();
    const navigate = useNavigate();
    const employee = useStoreState((state: any) => state.employee);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [startDate, setStartDate] = useState(new Date());
    const [estimatedEndDate, setEstimatedEndDate] = useState(new Date());
    const { isLoading, data: customer } = useQuery("get-all-customers", () => {
        return axios
            .get(`/getallcustomers?designation=${employee.designation}`)
            .then(({ data }) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    });

    if (isLoading) return null;

    async function onSubmit(formdata: any) {
        try {
            const { data }: AxiosResponse = await axios.post(
                `/projectManager/${employee.employeeId}`,
                {
                    ...formdata,
                    startDate: formatDate(startDate),
                    estimatedEndDate: formatDate(estimatedEndDate),
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
                        onChange={(date: Date) => {
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
                        onChange={(date: Date) => {
                            setEstimatedEndDate(date);
                        }}
                        dateFormat="d/M/yyyy"
                    />
                </FormControl>

                <FormControl id="designation" isRequired>
                    <FormLabel>Customer id</FormLabel>
                    {customer.length > 0 && (
                        <Select
                            placeholder="Select option"
                            {...register("customerid")}
                        >
                            {customer.map(
                                (
                                    { customerid, customername }: any,
                                    index: any
                                ) => {
                                    return (
                                        <option
                                            value={customerid}
                                            key={customerid}
                                        >
                                            {customerid}-{customername}
                                        </option>
                                    );
                                }
                            )}
                        </Select>
                    )}
                </FormControl>
                <Button my="5" display="block" onClick={onOpen}>
                    Add Customer
                </Button>
                <Button my="5" type="submit">
                    Submit
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add Customer</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>

                        </ModalBody>
                        <ModalFooter>
                            <Button variant="ghost">Create</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </form>
        </Box>
    );
};

export default AddProjectForm;
