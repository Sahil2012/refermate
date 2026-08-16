
export enum ErrorCode {
    // 400 - Bad Request
    BAD_REQUEST = "BAD_REQUEST",
    INVALID_INPUT = "INVALID_INPUT",
    VALIDATION_FAILED = "VALIDATION_FAILED",
    EMPTY_FIELD = "EMPTY_FIELD",
    INVALID_DATE_FORMAT = "INVALID_DATE_FORMAT",
    NO_VALID_FIELDS = "NO_VALID_FIELDS",

    // 401 - Unauthorized
    UNAUTHORIZED = "UNAUTHORIZED",
    AUTHENTICATION_REQUIRED = "AUTHENTICATION_REQUIRED",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    REFRESH_TOKEN_NOT_FOUND = "REFRESH_TOKEN_NOT_FOUND",
    USER_NOT_CONNECTED_GOOGLE = "USER_NOT_CONNECTED_GOOGLE",

    // 403 - Forbidden
    FORBIDDEN = "FORBIDDEN",
    INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS",

    // 404 - Not Found
    RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
    THREAD_NOT_FOUND = "THREAD_NOT_FOUND",
    MESSAGE_NOT_FOUND = "MESSAGE_NOT_FOUND",
    PROFILE_NOT_FOUND = "PROFILE_NOT_FOUND",
    USER_NOT_FOUND = "USER_NOT_FOUND",
    EMPLOYEE_NOT_FOUND = "EMPLOYEE_NOT_FOUND",

    // 409 - Conflict
    RESOURCE_CONFLICT = "RESOURCE_CONFLICT",
    THREAD_ALREADY_EXISTS = "THREAD_ALREADY_EXISTS",
    DUPLICATE_ENTRY = "DUPLICATE_ENTRY",

    // 422 - Unprocessable Entity
    UNPROCESSABLE_ENTITY = "UNPROCESSABLE_ENTITY",
    INVALID_STATE_TRANSITION = "INVALID_STATE_TRANSITION",
    THREAD_NOT_UPGRADABLE = "THREAD_NOT_UPGRADABLE",
    THREAD_ALREADY_SENT = "THREAD_ALREADY_SENT",
    MESSAGE_NOT_DRAFT = "MESSAGE_NOT_DRAFT",
    INSUFFICIENT_CREDITS = "INSUFFICIENT_CREDITS",
    OAUTH_MISSING_REFRESH_TOKEN = "OAUTH_MISSING_REFRESH_TOKEN",
    FILE_TOO_LARGE = "FILE_TOO_LARGE",
    INVALID_FILE_TYPE = "INVALID_FILE_TYPE",

    // 500 - Internal Server Error
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    DATABASE_ERROR = "DATABASE_ERROR",
    UNEXPECTED_ERROR = "UNEXPECTED_ERROR",

    // 502 - Bad Gateway (External Service Errors)
    EXTERNAL_SERVICE_ERROR = "EXTERNAL_SERVICE_ERROR",
    GMAIL_API_ERROR = "GMAIL_API_ERROR",
    GOOGLE_API_ERROR = "GOOGLE_API_ERROR",
    EMAIL_SEND_FAILED = "EMAIL_SEND_FAILED",
    LLM_GENERATION_FAILED = "LLM_GENERATION_FAILED",

    // 503 - Service Unavailable
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
    EXTERNAL_SERVICE_UNAVAILABLE = "EXTERNAL_SERVICE_UNAVAILABLE",

    // Business Logic Errors
    INVALID_EMAIL_STRATEGY = "INVALID_EMAIL_STRATEGY",
    INVALID_PROFILE_STATUS = "INVALID_PROFILE_STATUS",
    NO_FILE_UPLOADED = "NO_FILE_UPLOADED",
    FILE_PROCESSING_FAILED = "FILE_PROCESSING_FAILED",

    // 429
    RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
}


export const ErrorCodeMetadata: Record<ErrorCode, { httpStatus: number; defaultMessage: string }> = {
    // 400
    [ErrorCode.BAD_REQUEST]: { httpStatus: 400, defaultMessage: "Bad request" },
    [ErrorCode.INVALID_INPUT]: { httpStatus: 400, defaultMessage: "Invalid input provided" },
    [ErrorCode.VALIDATION_FAILED]: { httpStatus: 400, defaultMessage: "Validation failed" },
    [ErrorCode.EMPTY_FIELD]: { httpStatus: 400, defaultMessage: "Required field is empty" },
    [ErrorCode.INVALID_DATE_FORMAT]: { httpStatus: 400, defaultMessage: "Invalid date format" },
    [ErrorCode.NO_VALID_FIELDS]: { httpStatus: 400, defaultMessage: "No valid fields provided to update" },

    // 401
    [ErrorCode.UNAUTHORIZED]: { httpStatus: 401, defaultMessage: "Unauthorized" },
    [ErrorCode.AUTHENTICATION_REQUIRED]: { httpStatus: 401, defaultMessage: "Authentication required" },
    [ErrorCode.INVALID_CREDENTIALS]: { httpStatus: 401, defaultMessage: "Invalid credentials" },
    [ErrorCode.REFRESH_TOKEN_NOT_FOUND]: { httpStatus: 401, defaultMessage: "Refresh token not found" },
    [ErrorCode.USER_NOT_CONNECTED_GOOGLE]: { httpStatus: 401, defaultMessage: "User not connected with Google" },

    // 403
    [ErrorCode.FORBIDDEN]: { httpStatus: 403, defaultMessage: "Forbidden" },
    [ErrorCode.INSUFFICIENT_PERMISSIONS]: { httpStatus: 403, defaultMessage: "Insufficient permissions" },

    // 404
    [ErrorCode.RESOURCE_NOT_FOUND]: { httpStatus: 404, defaultMessage: "Resource not found" },
    [ErrorCode.THREAD_NOT_FOUND]: { httpStatus: 404, defaultMessage: "Thread not found" },
    [ErrorCode.MESSAGE_NOT_FOUND]: { httpStatus: 404, defaultMessage: "Message not found" },
    [ErrorCode.PROFILE_NOT_FOUND]: { httpStatus: 404, defaultMessage: "Profile not found" },
    [ErrorCode.USER_NOT_FOUND]: { httpStatus: 404, defaultMessage: "User not found" },
    [ErrorCode.EMPLOYEE_NOT_FOUND]: { httpStatus: 404, defaultMessage: "Employee details not found" },

    // 409
    [ErrorCode.RESOURCE_CONFLICT]: { httpStatus: 409, defaultMessage: "Resource conflict" },
    [ErrorCode.THREAD_ALREADY_EXISTS]: { httpStatus: 409, defaultMessage: "Thread already exists" },
    [ErrorCode.DUPLICATE_ENTRY]: { httpStatus: 409, defaultMessage: "Duplicate entry" },

    // 422
    [ErrorCode.UNPROCESSABLE_ENTITY]: { httpStatus: 422, defaultMessage: "Unprocessable entity" },
    [ErrorCode.INVALID_STATE_TRANSITION]: { httpStatus: 422, defaultMessage: "Invalid state transition" },
    [ErrorCode.THREAD_NOT_UPGRADABLE]: { httpStatus: 422, defaultMessage: "Thread not found or already in unupgradable state" },
    [ErrorCode.THREAD_ALREADY_SENT]: { httpStatus: 422, defaultMessage: "Thread is already in SENT state" },
    [ErrorCode.MESSAGE_NOT_DRAFT]: { httpStatus: 422, defaultMessage: "Message cannot be deleted unless it is in DRAFT state" },
    [ErrorCode.INSUFFICIENT_CREDITS]: { httpStatus: 422, defaultMessage: "Insufficient credits" },
    [ErrorCode.OAUTH_MISSING_REFRESH_TOKEN]: { httpStatus: 422, defaultMessage: "Please re-authenticate with Google" },
    [ErrorCode.FILE_TOO_LARGE]: { httpStatus: 422, defaultMessage: "File size exceeds limit" },
    [ErrorCode.INVALID_FILE_TYPE]: { httpStatus: 422, defaultMessage: "Invalid file type" },

    // 500
    [ErrorCode.INTERNAL_SERVER_ERROR]: { httpStatus: 500, defaultMessage: "Internal server error" },
    [ErrorCode.DATABASE_ERROR]: { httpStatus: 500, defaultMessage: "Database error occurred" },
    [ErrorCode.UNEXPECTED_ERROR]: { httpStatus: 500, defaultMessage: "An unexpected error occurred" },

    // 502
    [ErrorCode.EXTERNAL_SERVICE_ERROR]: { httpStatus: 502, defaultMessage: "External service error" },
    [ErrorCode.GMAIL_API_ERROR]: { httpStatus: 502, defaultMessage: "Gmail API error" },
    [ErrorCode.GOOGLE_API_ERROR]: { httpStatus: 502, defaultMessage: "Google API error" },
    [ErrorCode.EMAIL_SEND_FAILED]: { httpStatus: 502, defaultMessage: "Failed to send email" },
    [ErrorCode.LLM_GENERATION_FAILED]: { httpStatus: 502, defaultMessage: "Failed to generate email content" },

    // 503
    [ErrorCode.SERVICE_UNAVAILABLE]: { httpStatus: 503, defaultMessage: "Service unavailable" },
    [ErrorCode.EXTERNAL_SERVICE_UNAVAILABLE]: { httpStatus: 503, defaultMessage: "External service unavailable" },

    // Business Logic
    [ErrorCode.INVALID_EMAIL_STRATEGY]: { httpStatus: 400, defaultMessage: "Invalid email strategy" },
    [ErrorCode.INVALID_PROFILE_STATUS]: { httpStatus: 400, defaultMessage: "Invalid profile status" },
    [ErrorCode.NO_FILE_UPLOADED]: { httpStatus: 400, defaultMessage: "No file uploaded" },
    [ErrorCode.FILE_PROCESSING_FAILED]: { httpStatus: 400, defaultMessage: "File processing failed" },

    // 429
    [ErrorCode.RATE_LIMIT_EXCEEDED]: { httpStatus: 429, defaultMessage: "Rate limit exceeded" },
};
