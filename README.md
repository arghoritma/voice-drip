
# ArgoNext - Fullstack Web Application

A modern fullstack web application built with Next.js 15, React 19, and SQLite.

## Features

- Next.js 15 for server-side rendering and API routes
- React 19 with TypeScript support
- SQLite database with Knex query builder
- Authentication using JWT and bcrypt
- File upload capabilities with Multer
- Modern UI components with Tailwind CSS
- Charts and data visualization using Recharts
- Icons from Lucide React and React Icons
- Date handling with date-fns and dayjs
- Toast notifications with react-hot-toast

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn package manager

## Installation

1. Clone the repository:
```
git clone https://github.com/arghoritma/argonext.git
cd argonext
```



2. Install dependencies:
```
npm install
# or
yarn install
```

3. Run the development server:
```
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code linting

## Project Structure

argonext/
├── .git/              # Directory for Git version control
├── app/               # React components
├── components/        # Reusable UI components
├── config/            # Application configuration files
├── db/                # Database configuration and access files
├── hooks/             # Custom hooks for reusable logic
├── lib/               # Utility functions or custom libraries
├── migrations/        # Database migration files
├── public/            # Static assets such as images and icons
├── types/             # TypeScript type definitions
├── .gitignore         # Defines files/folders to ignore in Git
├── erd.dbml           # Entity-Relationship Diagram (ERD) file
├── eslint.config.mjs  # ESLint configuration for JavaScript/TypeScript
├── knexfile.ts        # Knex.js configuration for the database
├── middleware.ts      # Middleware for Next.js
├── next.config.ts     # Next.js configuration file
├── package.json       # Node.js project description and dependencies
├── package-lock.json  # Dependency lock file for consistent installs
├── postcss.config.mjs # PostCSS configuration
├── README.md          # Project documentation or description
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration file

## Technologies Used

### Frontend
- React 19
- Next.js 15
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React
- React Hot Toast

### Backend
- Next.js API Routes
- Better SQLite3
- Knex Query Builder
- JWT Authentication
- Bcrypt
- Multer

### Development Tools
- TypeScript
- ESLint
- PostCSS
- Tailwind CSS

## License

This project is private and not available for public use.

## Author

arghoritma

## Version

Current version: 0.1.0
