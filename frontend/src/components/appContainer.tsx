import { Navigate, Outlet } from "react-router-dom"
import { Box, Center, Spinner } from "@chakra-ui/react"

import { UserMenu } from "./userMenu"
import { useAuth } from "../hoooks/useAuth"


export const AppContainer = () => {

    const { user, isLoading } = useAuth()

    return (
        isLoading
        ?
        <Center w='100vw' h='90vh'>
            <Spinner mb={4}/>
        </Center>
        :
        user
        ?
        <Box p={4} minH='100vh'>
            <UserMenu/>
            <Outlet/>
        </Box>
        :
        <Navigate to='/login' replace state={{ redirectUrl: window.location.pathname }}/>
    )
}

