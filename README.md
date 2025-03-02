# ArgoNext - Fullstack Web Application

ArgoNext is a modern template for fullstack web application development using Next.js, React, and SQLite. The template is flexible and supports changing the database driver to MySQL, PostgreSQL, and others.

## Features

- **Next.js 15.1.3**: Server-side rendering and API routes for efficient backend and frontend development.
- **React 19**: Supports TypeScript for modern UI component development.
- **Knex Query Builder**: Database query abstraction with support for multiple drivers, including SQLite, MySQL, and PostgreSQL.
- **Authentication**: Token-based authentication using JWT and password hashing with bcrypt. Supports third-party access via API with x-auth-session header.
- **File Upload**: Supports file uploads using Multer.
- **Tailwind CSS**: Modern UI components with responsive design.
- **Icon Libraries**: Includes Lucide React and React Icons for modern iconography.

## Prerequisites

- **Node.js**: (LTS version recommended)
- **npm** or **yarn** as the package manager.

## Installation

1. Clone the repository:

git clone https://github.com/arghoritma/argonext.git
cd argonext

2. Install dependencies:

npm install

# or

yarn install

3. Run the development server:

npm run dev

# or

yarn dev

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run storage` - Starts the storage server
- `npm run lint` - Runs ESLint for code linting

## Project Structure

```
argonext/
├── app/ # Main React components
│ └── api/ # API route handlers and third-party endpoints
├── components/ # Reusable UI components
├── services/ # Application configuration files
├── db/ # Database configuration and access
├── migrations/ # Database migration files
├── public/ # Static assets like images and icons
├── storage/ # Storage for uploaded files
│ └── avatar/ # User avatar storage
├── types/ # TypeScript type definitions
├── actions/ # Server actions for form handling and data mutations
│ ├── auth.ts # Authentication actions (signup, signin, logout)
│ └── profile.ts # Profile management actions
├── lib/ # Utility functions and middleware
│ ├── dal.ts # Data Access Layer for session verification
│ └── auth-middleware.ts # Authentication middleware functions
├── middleware.ts # Global Next.js middleware for route protection
├── erd.dbml # Entity-Relationship Diagram (ERD) file
├── knexfile.ts # Knex.js configuration file
├── next.config.ts # Next.js configuration files
├── tailwind.config.ts # Tailwind CSS configuration file
└── tsconfig.json # TypeScript configuration file

```

## Core Files Documentation

### Authentication (actions/auth.ts)

Contains server actions for user authentication:

- `signup()`: Handles new user registration with email validation and password hashing
- `signin()`: Manages user login with credential verification
- `logout()`: Handles user session termination
- Error handling for duplicate emails, password processing, and general errors
- Automatic redirection after successful authentication

### Profile Management (actions/profile.ts)

Manages user profile operations:

- `updateProfile()`: Updates user information including name, email, password, and phone number
- `getProfile()`: Retrieves user profile information
- Handles email uniqueness validation
- Secure password updates with bcrypt hashing
- Transaction-based updates for data integrity

### Data Access Layer (lib/dal.ts)

Session verification and user authentication:

- `verifySession()`: Cached function to verify user sessions
- Handles both header and cookie-based sessions (X-User-Session and x-auth-session)
- Automatic redirection for unauthenticated users
- Database integration for session validation
- Support for third-party API access via x-auth-session header

### Middleware (middleware.ts)

Global route protection and authentication:

- Protected routes configuration
- Public routes handling
- Session verification for both header and cookie-based authentication
- Automatic redirects based on authentication status
- Route matching configuration for static and dynamic paths
- Support for third-party API authentication via x-auth-session header

### Third-Party API Integration

ArgoNext can be used as a backend service for third-party applications. To integrate with external services:

#### Authentication Header

All API requests from third-party applications must include the session token in the header:

```http
X-User-Session: <session-token>
```

#### API Endpoints

1. **Verify Authentication Status**

   ```http
   GET /api
   Headers:
     X-User-Session: <session-token>

   Response (200 OK):
   {
     "userId": "user-id",
     "isAuth": true
   }

   Response (401 Unauthorized):
   {
     "message": "Not authenticated",
     "isAuth": false
   }
   ```

#### Implementation Notes

- Session tokens must be obtained through the standard authentication process
- The `verifySession()` function in `lib/dal.ts` automatically validates the X-User-Session header
- No cookies are required when using header-based authentication
- All protected API routes will verify the session token before processing requests
- Failed authentication attempts return 401 Unauthorized responses

## Technologies Used

### Frontend

- **React 19.0.0**
- **Next.js 15.1.3**
- **TypeScript**
- **Tailwind CSS 3.4.1**
- **Lucide React 0.469.0**
- **React Icons 5.4.0**

### Backend

- **Next.js API Routes**
- **Better SQLite3 11.7.0**
- **Knex Query Builder 3.1.0**
- **JWT Authentication**
- **Bcrypt 5.1.1**
- **Multer 1.4.5-lts.1**
- **Jose 5.9.6**
- **UUID 11.0.3**
- **Zod 3.24.1**

### Development Tools

- **TypeScript 5**
- **ESLint 9**
- **PostCSS 8**
- **Tailwind CSS 3.4.1**
- **DaisyUI 4.12.23**

## Documentation

- **[Next.js Documentation](https://nextjs.org/docs)**
- **[React Documentation](https://react.dev/)**
- **[Knex Documentation](https://knexjs.org/)**
- **[SQLite Documentation](https://sqlite.org/docs.html)**
- **[Tailwind CSS Documentation](https://tailwindcss.com/docs)**
- **[Lucide React Documentation](https://lucide.dev/)**

## License

This project is **Open Source** and licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Author

**arghoritma**

## Version

Current version: **0.1.0**
