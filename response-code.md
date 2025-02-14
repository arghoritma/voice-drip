## Response Code Documentation

### 2xx Success

- 200 OK - Request successful
- 201 Created - Resource created successfully
- 202 Accepted - Request accepted but processing not completed
- 204 No Content - Request successful but no content returned

### 3xx Redirection

- 301 Moved Permanently - Resource permanently moved to new URL
- 302 Found - Resource temporarily moved
- 304 Not Modified - Cached version can be used

### 4xx Client Error

- 400 Bad Request - Invalid request syntax
- 401 Unauthorized - Authentication required
- 403 Forbidden - Client lacks access rights
- 404 Not Found - Resource not found
- 405 Method Not Allowed - HTTP method not allowed
- 409 Conflict - Request conflicts with server state
- 429 Too Many Requests - Rate limit exceeded

### 5xx Server Error

- 500 Internal Server Error - Generic server error
- 501 Not Implemented - Server doesn't support functionality
- 502 Bad Gateway - Invalid response from upstream server
- 503 Service Unavailable - Server temporarily unavailable
- 504 Gateway Timeout - Upstream server timeout

### Common Response Status

```json
{
  "success": {
    "code": 200,
    "status": "OK",
    "message": "Request processed successfully",
    "data": {}
  },
  "error": {
    "code": 400,
    "status": "Bad Request",
    "message": "Invalid input parameters"
  },
  "unauthorized": {
    "code": 401,
    "status": "Unauthorized",
    "message": "Authentication required"
  },
  "forbidden": {
    "code": 403,
    "status": "Forbidden",
    "message": "Access denied"
  },
  "notFound": {
    "code": 404,
    "status": "Not Found",
    "message": "Resource not found"
  },
  "serverError": {
    "code": 500,
    "status": "Internal Server Error",
    "message": "An unexpected error occurred"
  }
}
```
