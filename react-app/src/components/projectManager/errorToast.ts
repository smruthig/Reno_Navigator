import { createStandaloneToast } from "@chakra-ui/react"

export const errorToast = (description: string, title: string = 'An error occurred.') => {
    const toast = createStandaloneToast();

    return toast({
        title: title,
        description: description,
        status: 'error',
        duration: 2000,
        isClosable: true,
    });
};