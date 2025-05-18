import { useNavigate } from "react-router-dom"
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"


export const UserMenu = () => {
    
    const navigate = useNavigate()

    return (
        <Menu isLazy placement='right-start'>

            <MenuButton position='absolute' left='1.5rem' bottom='1.5rem'>
                <Avatar src="#"/>
            </MenuButton>

            <MenuList>
                <MenuItem onClick={() => navigate('/')}>Profile</MenuItem>
                <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
            </MenuList>

        </Menu>
    )
}
