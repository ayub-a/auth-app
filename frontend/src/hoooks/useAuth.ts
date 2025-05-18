import { useQuery } from "@tanstack/react-query"
import { userApi } from "../api/userApi"


export const AUTH = 'auth'


export const useAuth = (options = {}) => {

    const query = useQuery({
        queryKey: [AUTH],
        queryFn: userApi.getUser,
        staleTime: Infinity,
        ...options,
    })  

    return { user: query.data!, ...query }
}
