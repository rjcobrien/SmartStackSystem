# Smart Stack System™

## Overview

Smart Stack System™ is an AI-powered supplement guidance platform specifically designed for women aged 35+ who are navigating hormonal changes, sleep issues, and supplement overwhelm. The application serves as a content-driven wellness funnel that combines educational content with interactive tools to help users make informed decisions about their supplement stacks.

The platform targets health-conscious women experiencing perimenopause, fatigue, anxiety, weight gain, and sleep disturbances. It focuses on simplifying the complex world of supplements through personalized recommendations, evidence-based guidance, and curated product selections.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built using React with TypeScript and follows a modern component-based architecture:

- **UI Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system variables and shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized production builds

The application uses a page-based routing structure with dedicated pages for home, quiz, stack guides, blog, products, and stack audit functionality.

### Backend Architecture
The server-side follows a REST API pattern built on Node.js:

- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript throughout the stack
- **API Design**: RESTful endpoints for leads, quiz functionality, products, and blog content
- **Middleware**: Express middleware for request logging, JSON parsing, and error handling
- **Build Process**: ESBuild for server-side bundling and production deployment

### Data Storage Solutions
The application uses a hybrid storage approach with plans for PostgreSQL integration:

- **Database**: PostgreSQL configured via Drizzle ORM with connection to Neon Database
- **Schema Management**: Drizzle Kit for database migrations and schema evolution
- **Development Storage**: In-memory storage implementation for development and testing
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple

The database schema includes tables for users, leads, quiz questions/responses, products, blog posts, and stack audit requests with proper relationships and JSON fields for flexible data storage.

### Content Management System
The platform manages various types of content:

- **Quiz System**: Dynamic quiz questions with categorized responses and personalized recommendations
- **Product Catalog**: Curated supplement recommendations with affiliate links, ratings, and detailed information
- **Blog System**: Educational content with categories, featured posts, and SEO-optimized structure
- **Lead Magnets**: Email capture forms integrated with multiple entry points

### Email and Communication
Email functionality is integrated for lead nurturing and communication:

- **Email Service**: SendGrid integration for transactional emails and marketing sequences
- **Lead Management**: Comprehensive lead capture and segmentation based on user interactions
- **Automated Sequences**: Email sequences triggered by quiz completions and content downloads

## External Dependencies

### Database and Infrastructure
- **Neon Database**: Serverless PostgreSQL database for production data storage
- **Drizzle ORM**: Type-safe database access layer with schema management
- **Connect-pg-simple**: PostgreSQL session store for user session management

### Email and Marketing
- **SendGrid**: Email delivery service for transactional emails and marketing campaigns
- **Email Templates**: Custom email templates for lead magnets and automated sequences

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Radix UI**: Headless UI components for accessibility and consistent behavior
- **shadcn/ui**: Pre-built component library built on Radix UI primitives
- **Lucide React**: Icon library for consistent iconography

### Development and Build Tools
- **Vite**: Frontend build tool with hot module replacement
- **TypeScript**: Static type checking across the entire stack
- **ESBuild**: Fast JavaScript bundler for production builds
- **TanStack Query**: Data fetching and caching library for API interactions

### Analytics and Monitoring
- **Replit Integration**: Development environment with built-in deployment capabilities
- **Error Handling**: Comprehensive error boundaries and API error management