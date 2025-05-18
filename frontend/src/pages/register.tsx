import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Box, Container, Flex, FormControl, FormLabel, Heading, Input, Stack, Link as ChakraLink, Button, Text } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"

import { authApi } from "../api/authApi"


export const RegisterPage = () => {
    const navigate = useNavigate()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    
    const { mutate: register, isPending, isError, error } = useMutation({
        mutationFn: authApi.register,
        onSuccess: () => {
            navigate('/', { replace: true })
        }
    })


    const createAccount = () => {
        register({ email, password, confirmPassword })
    }


    return (
          <Flex minH='100vh' align='center' justify='center'>

            <Container mx='auto' maxW='md' py={12} px={6} textAlign='center'>

                <Heading fontSize='4xl' mb={8}>
                    Create an account
                </Heading>
                
                <Box rounded='lg' bg='gray.700' boxShadow='lg' p={8}>
                    {
                        isError && <Box mb={3} color='red.400'>{ error?.message || 'An error occurred' }</Box>
                    }
                    <Stack spacing={4}>

                        <FormControl id='email'>
                            <FormLabel>Email address</FormLabel>
                            <Input 
                                type='email' 
                                autoFocus 
                                value={email} 
                                placeholder="test@test.com" 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        
                        <FormControl id='password'>
                            <FormLabel>Password</FormLabel>
                            <Input 
                                type='password' 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Text color='text.muted' fontSize='sm' textAlign='left' mt={2}>
                                - Must be at least 6 characters long.
                            </Text>
                        </FormControl>

                        <FormControl id='confirm-password'>
                            <FormLabel>Confrm password</FormLabel>
                            <Input 
                                type='password' 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && createAccount()}
                            />
                        </FormControl>

                        <Button 
                            my={2} 
                            isDisabled={
                                !email 
                                || password.length < 6
                                || password !== confirmPassword
                            } 
                            onClick={createAccount} 
                            isLoading={isPending}
                        >
                            Create Account
                        </Button>

                        <Text align='center' fontSize='sm' color='text.muted'>
                            Already have an account?
                            <ChakraLink as={Link} to='/login' ml={2}>
                                Login
                            </ChakraLink>
                        </Text>

                    </Stack>
                </Box>
            </Container>
        </Flex>
    )
}