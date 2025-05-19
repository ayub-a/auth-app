import { api } from "../config/apiClient"


interface IUserAgent {
    browser: { 
        name?: string
        version?: string 
    };
    os: { 
        name?: string
        version?: string 
    };
    device?: { 
        model?: string
        type?: string 
        vendor?: string 
    }
}


interface ISessionReturnType {
    _id: string,
    userAgent: IUserAgent
    isCurrent: boolean
    createdAt: Date
}


export type ISessionParams = ISessionReturnType


class SessionApi {

    private static readonly SESSION_PATH = '/sessions'

    
    async getSessions() {
        return await api.get<void, ISessionReturnType[]>(SessionApi.SESSION_PATH)
    }


    async deleteSession(id: string) {
        return await api.delete(`${SessionApi.SESSION_PATH}/${id}`,)
    }

}


export const sessionApi = new SessionApi()
