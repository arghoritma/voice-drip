
# ArgoNext - Fullstack Web Application

ArgoNext is a modern template for fullstack web application development using Next.js, React, and SQLite. The template is flexible and supports changing the database driver to MySQL, PostgreSQL, and others.  

## Features

- **Next.js 15**: Server-side rendering and API routes for efficient backend and frontend development.  
- **React 19**: Supports TypeScript for modern UI component development.  
- **Knex Query Builder**: Database query abstraction with support for multiple drivers, including SQLite, MySQL, and PostgreSQL.  
- **Authentication**: Token-based authentication using JWT and password hashing with bcrypt.  
- **File Upload**: Supports file uploads using Multer.  
- **Tailwind CSS**: Modern UI components with responsive design.  
- **Icon Libraries**: Includes Lucide React and React Icons for modern iconography.  

## Prerequisites

- **Node.js**: (LTS version recommended)  
- **npm** or **yarn** as the package manager.  

## Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/arghoritma/argonext.git
   cd argonext
   ```

2. Install dependencies:  
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:  
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.  

## Scripts

- `npm run dev` - Starts the development server  
- `npm run build` - Builds the application for production  
- `npm run start` - Starts the production server  
- `npm run lint` - Runs ESLint for code linting  

## Project Structure

```
argonext/
├── app/               # Main React components
├── components/        # Reusable UI components
├── config/            # Application configuration files
├── db/                # Database configuration and access
├── migrations/        # Database migration files
├── public/            # Static assets like images and icons
├── types/             # TypeScript type definitions
├── erd.dbml           # Entity-Relationship Diagram (ERD) file
├── knexfile.ts        # Knex.js configuration file
├── middleware.ts      # Middleware for Next.js
├── next.config.ts     # Next.js configuration file
├── tailwind.config.ts # Tailwind CSS configuration file
├── tsconfig.json      # TypeScript configuration file
```

## Technologies Used

### Frontend
- **React 19**  
- **Next.js 15**  
- **TypeScript**  
- **Tailwind CSS**  
- **Lucide React**  

### Backend
- **Next.js API Routes**  
- **Better SQLite3** (Supports MySQL, PostgreSQL, etc., via Knex)  
- **Knex Query Builder**  
- **JWT Authentication**  
- **Bcrypt**  
- **Multer**  

### Development Tools
- **TypeScript**  
- **ESLint**  
- **PostCSS**  
- **Tailwind CSS**  

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
