import { useState, type FC } from "react"
import { Link } from "react-router-dom"
import { Alert, AlertIcon, Box, Heading, Link as ChakraLink, VStack, FormControl, FormLabel, Input, Button } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"

import { authApi } from "../api/authApi"


interface IResetPasswordFormProps {
    code: string
}


export const ResetPasswordForm: FC<IResetPasswordFormProps> = ({ code }) => {
    const [password, setPassword] = useState('')


    const { mutate: resetUserPassword, isPending, isSuccess, isError, error  } = useMutation({
        mutationFn: authApi.passwordReset
    })


    const resetPasswordHandler = () => {
        resetUserPassword({ verificationCode: code, password })
    }

    
    return (
        <>
            <Heading fontSize='4xl' mb={8}>
                Change your password
            </Heading>

            <Box rounded='lg' bg='gray.700' boxShadow='lg' p={9}>
                {
                    isError
                    &&
                    <Box mb={3} color='red.400'>
                        { error?.message || 'An error occured' }
                    </Box>
                }
                {
                    isSuccess
                    ?
                    <Box>
                        <Alert status='success' borderRadius={12} mb={3}>
                            <AlertIcon/>
                            Password updated successefully!
                        </Alert>
                        <ChakraLink as={Link} to='/login' replace>
                            Login
                        </ChakraLink>
                    </Box>
                    :
                    <VStack>
                        <FormControl id='password'>
                            <FormLabel>New password</FormLabel>
                            <Input
                                type='password' 
                                autoFocus
                                value={password} 
                                placeholder="test@test.com" 
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && resetPasswordHandler()}
                            />
                        </FormControl>

                        <Button
                            w='100%'
                            my={2} 
                            isDisabled={password.length < 6} 
                            onClick={() => resetPasswordHandler()} 
                            isLoading={isPending}
                        >
                            Reset password
                        </Button>

                        <ChakraLink as={Link} to='/password/forgot' mt={2} replace>
                                Request a new password reset link
                        </ChakraLink>
                    </VStack>
                }
            </Box>
        </>
    )
}
