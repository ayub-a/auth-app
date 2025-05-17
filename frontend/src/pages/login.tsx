import { useState } from "react"
import { Link } from "react-router-dom"
import { Box, Container, Flex, FormControl, FormLabel, Heading, Input, Stack, Link as ChakraLink, Button, Text } from "@chakra-ui/react"


export const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <Flex minH='100vh' align='center' justify='center'>
            <Container mx='auto' maxW='md' py={12} px={6} textAlign='center'>
                <Heading fontSize='4xl' mb={8}>
                    Login to your account
                </Heading>
                <Box rounded='lg' bg='gray.700' boxShadow='lg' p={8}>
                    <Stack spacing={4}>
                        <FormControl id='email'>
                            <FormLabel>Email address</FormLabel>
                            <Input type='email' autoFocus value={email} placeholder="test@test.com" onChange={(e) => setEmail(e.target.value)}/>
                        </FormControl>
                         <FormControl id='password'>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </FormControl>

                        <ChakraLink as={Link} to='/password/forgot' fontSize='sm' textAlign={{ base: 'center', sm: 'left' }}>
                            Forgot password?
                        </ChakraLink>

                        <Button my={2} isDisabled={!email || password.length < 6}>Sign in</Button>

                        <Text align='center' fontSize='sm' color='text.muted'>
                            Don't have an account?
                            <ChakraLink as={Link} to='/register' ml={2}>
                                Get account
                            </ChakraLink>
                        </Text>
                    </Stack>
                </Box>
            </Container>
        </Flex>
    )
}
