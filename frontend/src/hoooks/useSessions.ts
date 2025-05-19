import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { sessionApi } from "../api/sessionApi"


export const QUERY_KEY_SESSIONS = 'sessions'


export const useSessions = (options = {}) => {

    const query = useQuery({
        queryKey: [QUERY_KEY_SESSIONS],
        queryFn: sessionApi.getSessions,
        ...options
    })

    const sortedSessions = useMemo(() => {
        if (!query.data) return []

        return [...query.data].sort((a, b) => {
            return (b.isCurrent ? 1 : 0) - (a.isCurrent ? 1 : 0)
        })
  }, [query.data])
    
    return { sessions: sortedSessions!, ...query }
}
