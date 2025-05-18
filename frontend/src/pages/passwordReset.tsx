import { Link, useSearchParams } from "react-router-dom"
import { Flex, Container, Text, Link as ChakraLink, Alert, AlertIcon, VStack } from "@chakra-ui/react"

import { ResetPasswordForm } from "../components/resetPasswordForm"


export const PasswordResetPage = () => {
    const [searchParams] = useSearchParams() 

    const code = searchParams.get('code')
    const exp = Number(searchParams.get('exp'))
    const now = Date.now()
    const linkIsValid = code && exp && exp > now

    
    return (
        <Flex minH='100vh' align='center' justify='center'>
            <Container mx='auto' maxW='md' py={12} px={6} textAlign='center'>
                {
                    linkIsValid 
                    ? <ResetPasswordForm code={code}/>
                    : (
                        <VStack align='center' spacing={6}>
                            <Alert status="error" w='fit-content' borderRadius={12}>
                                <AlertIcon/>
                                Invalid link
                            </Alert>

                            <Text color='gray.400'>The link is invalid or expired.</Text>

                            <ChakraLink as={Link} to='/password/forgot' replace>
                                Request a new password reset link
                            </ChakraLink>
                        </VStack>
                    )
                }
            </Container>
        </Flex>
    )
}
