import {
    Box, Heading, Table as ChakraTable, Tbody, Td, Th, Thead, Tr
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface TableProps {
    heading: string;
    data: any;
    tableHeadings: string[];
}

const Table: React.FC<TableProps> = ({heading, data, tableHeadings}) => {

    if(data.length===0)
    {
        return null;
    }
    
    return (
        <Box my={10}>
        <Heading size="md" mb={2}>{heading}</Heading>
        <ChakraTable variant="striped" colorScheme="teal" size="sm">
            <Thead>
                <Tr>
                    {
                        tableHeadings?.map((value:string,index:any)=>{
                            return <Th key={index}>{value}</Th>
                        })
                    }
                </Tr>
            </Thead>
            <Tbody>
                { // if data is an array
                    Array.isArray(data) && data.map((row:any,index:any)=>{
                        return (
                            <Tr key={index}>
                                {
                                    tableHeadings.map((value:any,index:any)=>{
                                        return <Td key={index}>{row[value]}</Td>
                                    })
                                }
                            </Tr>
                        )
                    })

                }
                { //if data is an JSON object
                    typeof data === 'object' && !Array.isArray(data) && data !== null &&
                        <Tr>
                            {
                                tableHeadings.map((value:any,index:any)=>{
                                    return <Td key={index}>{data[value]}</Td>
                                })
                            } 
                        </Tr>
                }
            </Tbody>
        </ChakraTable>
        </Box>
    );
};

export default Table;