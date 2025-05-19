import { useNavigate } from "react-router-dom"
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"

import { authApi } from "../api/authApi"
import { queryClient } from "../config/queryClient"


export const UserMenu = () => {
    const navigate = useNavigate()


    const { mutate: logout } = useMutation({
        mutationFn: authApi.logout,
        onSettled: () => {
            queryClient.clear()
            navigate('/login', { replace: true })
        }
    })


    return (
        <Menu isLazy placement='right-start'>

            <MenuButton position='fixed' left='1.5rem' bottom='1.5rem'>
                <Avatar src="#"/>
            </MenuButton>

            <MenuList>
                <MenuItem onClick={() => navigate('/')}>Profile</MenuItem>
                <MenuItem onClick={() => navigate('/sessions')}>Sessions</MenuItem>
                <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuList>

        </Menu>
    )
}
