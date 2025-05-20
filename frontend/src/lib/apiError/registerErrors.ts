import { apiError } from "."
import { invalidAccessTokenHandler } from "./handlers/invalidAccessToken"
import { sessionDeletedHandler } from "./handlers/sessionDeleted"


export const registerErrors = () => {
    apiError.register(401, 'InvalidAccessToken', invalidAccessTokenHandler)
    apiError.register(404, 'SessionDeleted', sessionDeletedHandler)
    // add other errors
}
