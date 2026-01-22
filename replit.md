# Developer Portfolio

## Overview

A personal developer portfolio website built as a full-stack application. The project showcases projects, skills, and provides a contact form for visitors. It features a modern dark-themed UI with smooth animations and a single-page application design with section-based navigation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **Styling**: Tailwind CSS with custom design tokens defined in CSS variables
- **UI Components**: Shadcn/ui component library (New York style) built on Radix UI primitives
- **Animations**: Framer Motion for page transitions and scroll reveals
- **Navigation**: React-scroll for smooth scrolling to sections

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/`
- Reusable components in `client/src/components/`
- Custom hooks in `client/src/hooks/`
- UI primitives in `client/src/components/ui/`

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ES modules
- **API Pattern**: REST endpoints defined in `shared/routes.ts` with Zod validation
- **Build Tool**: Vite for development with HMR, esbuild for production bundling

The server uses a modular structure:
- `server/routes.ts` - API endpoint definitions
- `server/storage.ts` - Data access layer with DatabaseStorage class
- `server/db.ts` - Database connection pool
- `server/static.ts` - Static file serving for production
- `server/vite.ts` - Vite dev server integration

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` using Drizzle's table definitions
- **Validation**: Drizzle-zod for generating Zod schemas from table definitions
- **Database**: PostgreSQL via `node-postgres` (pg) driver

Database tables:
- `projects` - Portfolio projects with title, description, image, URL, and tags
- `skills` - Technical skills with category and proficiency level
- `messages` - Contact form submissions

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts` - Database table definitions and TypeScript types
- `routes.ts` - API route definitions with input/output schemas

### Build System
- Development: Vite dev server with HMR, proxied through Express
- Production: Vite builds client to `dist/public`, esbuild bundles server to `dist/index.cjs`
- Database migrations: Drizzle Kit with `db:push` command

## External Dependencies

### Database
- PostgreSQL database (requires `DATABASE_URL` environment variable)
- Connection managed via `pg` Pool with Drizzle ORM

### UI/Animation Libraries
- Radix UI - Accessible component primitives
- Framer Motion - Animation library
- React Scroll - Smooth scrolling navigation
- Lucide React & React Icons - Icon libraries

### Form Handling
- React Hook Form with Zod resolver for form validation

### Development Tools
- Replit-specific Vite plugins for error overlays and dev banners
- TypeScript with strict mode enabled