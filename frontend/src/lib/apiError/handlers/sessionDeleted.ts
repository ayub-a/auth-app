import { ApiError } from "..";
import { queryClient } from "../../../config/queryClient";


export const sessionDeletedHandler = () => {
    queryClient.clear();
    ApiError.navigateTo();
}
