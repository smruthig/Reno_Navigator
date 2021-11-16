import {
    Box, Heading, Table as ChakraTable, Tbody, Td, Th, Thead, Tr
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface TableProps {
    heading: string;
    data: any;
}

const Table: React.FC<TableProps> = ({heading,data}) => {

    const [tableHeadings,setTableHeadings] = useState<string[]>();
    
    useEffect(()=>{
        if(data.length!==0)
        {
            setTableHeadings(Object.keys(data[0]));
        }
    },[data])

    if(data.length===0)
    {
        return null;
    }

    return (
        <Box my={5}>
        <Heading size="md" mb={2}>{heading}</Heading>
        <ChakraTable variant="striped" colorScheme="teal" size="sm">
            <Thead>
                <Tr>
                    {
                        tableHeadings?.map((value,index)=>{
                            return <Th key={index}>{value}</Th>
                        })
                    }
                </Tr>
            </Thead>
            <Tbody>
                {
                    data.map((row:any,index:any)=>{
                        return (
                            <Tr>
                                {
                                    Object.entries(row).map((value:any,index:any)=>{
                                        return <Td key={index}>{value[1]}</Td>
                                    })
                                }
                            </Tr>
                        )
                    })
                }
            </Tbody>
        </ChakraTable>
        </Box>
    );
};

export default Table;