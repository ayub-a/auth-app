
export const HTTP_RESPONSE = {
    SUCCESS: {
        OK: { code: 200, message: 'OK' },
        CREATED: { code: 201, message: 'Created successfully' },
    },
    CLIENT_ERROR: {
        BAD_REQUEST: { code: 400, message: 'Bad request' },
        UNAUTHORIZED: { code: 401, message: 'Unauthorized' },
        FORBIDDEN: { code: 403, message: 'Forbidden' },
        NOT_FOUND: { code: 404, message: 'Not found' },
        CONFLICT: { code: 409, message: 'Conflict' },
        UNPROCESSABLE_CONTENT: { code: 422, message: 'Unprocessable entity' },
        TOO_MANY_REQUESTS: { code: 429, message: 'Too many requests' },
    },
    SERVER_ERROR: {
        INTERNAL_SERVER_ERROR: { code: 500, message: 'Internal server error' },
    },
} as const
