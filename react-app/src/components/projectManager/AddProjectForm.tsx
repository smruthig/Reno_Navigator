import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading, HStack, VStack } from "@chakra-ui/layout";
import {
    Checkbox,
    CheckboxGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
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

interface AddCustomerFormProps {
    customername: string;
    customeremailid: string;
    customeraddress: string;
    customerphoneno: string;
}

const AddProjectForm: React.FC = () => {
    const { handleSubmit, register } = useForm<AddProjectFormProps>();
    const { handleSubmit: handleSubmitModal, register: registerModal } =
        useForm<AddCustomerFormProps>();
    const navigate = useNavigate();
    const employee = useStoreState((state: any) => state.employee);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [startDate, setStartDate] = useState(new Date());
    const [estimatedEndDate, setEstimatedEndDate] = useState(new Date());
    const [customer, setCustomer] = useState<any>([]);
    const [designers, setDesigners] = useState<any>([]);
    const [selectedDesigners, setSelectedDesigners] = useState<any>([]);

    const { isLoading } = useQuery("get-all-customers", () => {
        axios
            .get(`/getallcustomers?designation=${employee.designation}`)
            .then(({ data }) => {
                setCustomer(data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`/projectmanager/getfreedesigners?designation=${employee.designation}`)
            .then(({ data }) => {
                setDesigners(data);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    if (isLoading) return null;

    async function onSubmit(formdata: any) {
        try {
            await axios.post(
                `/projectmanager/${employee.employeeId}?designation=${employee.designation}`,
                {
                    ...formdata,
                    startDate: formatDate(startDate),
                    estimatedEndDate: formatDate(estimatedEndDate),
                    designerlist: selectedDesigners
                }
            );
            navigate(-1);
        } catch (err) {
            console.log(err);
        }
    }

    async function createCustomer(formdata: any) {
        try {
            console.log(formdata);
            const { data }: AxiosResponse = await axios.post(
                `/createcustomer?designation=${employee.designation}`,
                formdata
            );
            setCustomer((customer: any) => {
                return [...customer, data];
            });
            onClose();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Box mx="auto" my="auto" w="50rem" h="50rem" p="5rem">
            <Heading textAlign="center">Add New Project</Heading>
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
                    <NumberInput max={999999}>
                        <NumberInputField
                            {...register("pincode")}
                            placeholder="pincode"
                        />
                    </NumberInput>
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

                <FormControl id="customer-id" isRequired>
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
                <FormControl id="designers" isRequired>
                    <FormLabel>Available Designers</FormLabel>
                    <CheckboxGroup onChange={(value)=>{
                        // console.log(value)
                        setSelectedDesigners(value);
                    }}>
                    <VStack align='flex-start'>
                        {designers.map(({employeeid,empname}:any, index:any) => {
                            return <Checkbox key={index} value={`${employeeid}`}>{empname}</Checkbox>
                        })}
                    </VStack>
                    </CheckboxGroup>
                </FormControl>
                <Button my="5" type="submit">
                    Submit
                </Button>
            </form>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Customer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmitModal(createCustomer)}>
                            <FormControl id="customer name" isRequired>
                                <FormLabel>Customer Name</FormLabel>
                                <Input {...registerModal("customername")} />
                            </FormControl>
                            <FormControl id="customer ph no" isRequired>
                                <FormLabel>Customer Phone Number</FormLabel>
                                <Input {...registerModal("customerphoneno")} />
                            </FormControl>
                            <FormControl id="customer email" isRequired>
                                <FormLabel>Customer Email</FormLabel>
                                <Input {...registerModal("customeremailid")} />
                            </FormControl>
                            <FormControl id="customer address" isRequired>
                                <FormLabel>Customer Address</FormLabel>
                                <Input {...registerModal("customeraddress")} />
                            </FormControl>
                            <Button variant="ghost" type="submit">
                                Create
                            </Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default AddProjectForm;
