import { useState } from "react"
import { Link } from "react-router-dom"
import { Flex, Container, Heading, Box, Stack, FormControl, FormLabel, Input, Button, Text, Link as ChakraLink, Alert, AlertIcon } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"

import { authApi } from "../api/authApi"


export const PasswordForgotPage = () => {
    const [email, setEmail] = useState('')


    const { mutate: sendPasswordReset, isPending, isSuccess, isError, error } = useMutation({
        mutationFn: authApi.passwordForgot,
    })


    return (
        <Flex minH='100vh' align='center' justify='center'>

            <Container mx='auto' maxW='md' py={12} px={6} textAlign='center'>

                <Heading fontSize='4xl' mb={8}>
                    Reset your password
                </Heading>
                
                <Box rounded='lg' bg='gray.700' boxShadow='lg' p={8}>
                    {
                        isError && <Box mb={3} color='red.400'>{ error?.message || 'An error occurred' }</Box>
                    }
                    <Stack spacing={4}>
                        {
                            isSuccess ?
                                <Alert status='success' borderRadius={12}>
                                    <AlertIcon/>
                                    Email sent! Chek your inbox.
                                </Alert>
                            :
                            <>
                                <FormControl id='email'>
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        type='email' 
                                        autoFocus 
                                        value={email} 
                                        placeholder="test@test.com" 
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && sendPasswordReset(email)}
                                    />
                                </FormControl>

                                <Button
                                    my={2} 
                                    isDisabled={!email} 
                                    onClick={() => sendPasswordReset(email)} 
                                    isLoading={isPending}
                                >
                                    Reset password
                                </Button>
                            </>
                        }

                        <Text align='center' fontSize='sm' color='text.muted'>
                            Go back to
                            <ChakraLink as={Link} to='/login' mx={2}>
                                Login
                            </ChakraLink>
                            or
                            <ChakraLink as={Link} to='/login' ml={2}>
                                Registration
                            </ChakraLink>
                        </Text>
                        
                    </Stack>
                </Box>
            </Container>
        </Flex>
    )
}
