import type { AxiosError } from "axios";

import { authApi } from "../../../api/authApi";
import { tokenrefreshClient } from "../../../config/apiClient";
import { queryClient } from "../../../config/queryClient";
import { ApiError } from "..";


export const invalidAccessTokenHandler = async (error: AxiosError) => {
    try {
        await authApi.refresh();
        return tokenrefreshClient(error.response!.config);
    } catch {
        queryClient.clear();
        ApiError.navigateTo();
    }
}
