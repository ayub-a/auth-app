import { useParams, Link } from "react-router-dom"
import { Alert, AlertIcon, Container, Flex, Spinner, Text, VStack, Link as ChakraLink } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"

import { authApi } from "../api/authApi"


export const VerifyEmail = () => {
    const { code } = useParams()

    const { isPending, isSuccess, isError } = useQuery({
        queryKey: ['emailVerification', code],
        queryFn: () => authApi.verifyEmail(code as string)
    })

    return (
        <Flex minH='100vh' justify='center' mt={12}>
            <Container mx='auto' maxW='md' py={12} px={6} textAlign='center'>
                {
                    isPending
                    ? <Spinner/>
                    : (
                        <VStack align='center' spacing={6}>
                            <Alert status={isSuccess ? 'success' : 'error'} w='fit-content' borderRadius={12}>
                                <AlertIcon/>
                                { isSuccess ? 'Email verified!' : 'Invalid link'}
                            </Alert>
                            {
                                isError
                                &&
                                <Text color='gray.400'>
                                    The link is invalid or expired.
                                    <ChakraLink as={Link} to='/password/forgot' ml={2} replace>
                                        Get a new link
                                    </ChakraLink>
                                </Text>
                            }
                            <ChakraLink as={Link} to='/' replace>
                                Back to home
                            </ChakraLink>
                        </VStack>
                    )
                }
            </Container>
        </Flex>
    )
}
