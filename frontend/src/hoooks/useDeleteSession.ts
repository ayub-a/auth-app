import { useMutation, useQueryClient } from "@tanstack/react-query"

import { sessionApi, type ISessionParams } from "../api/sessionApi"
import { QUERY_KEY_SESSIONS } from "./useSessions"


export const useDeleteSession = (sessionId: string) => {
    const queryClient = useQueryClient()

    const { mutate: deleteSession, ...rest } = useMutation({
        mutationFn: () => sessionApi.deleteSession(sessionId),
        onSuccess: () => {
            // with getSession api call
            // queryClient.invalidateQueries({ queryKey: [QUERY_KEY_SESSIONS] })

            // filter without getSesions api call,
            // only delete api call
            queryClient.setQueryData(
                [QUERY_KEY_SESSIONS],
                (cache: ISessionParams[]) => cache.filter(session => session._id !== sessionId)
            )
        }
    })

    return { deleteSession, ...rest }
}
