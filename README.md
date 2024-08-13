# Gallry

Gallry is a web application that allows users to store, organize, and manage their images in groups. Users can easily upload images, group them by categories, and delete or download them whenever needed.

## Features

- **Image Grouping**: Organize your images into different groups for easy management.
- **Upload & Storage**: Securely upload and store images in the cloud.
- **Download Images**: Download individual images or entire groups.
- **Delete Images**: Remove images or entire groups from your gallery.
- **User Authentication**: Secure access to your gallery with user authentication via Clerk.
- **Responsive Design**: Accessible on both desktop and mobile devices.

## Technologies Used

- **Frontend**: 
  - [React](https://react.dev/)
  - [Next.js](https://nextjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Radix UI](https://www.radix-ui.com/)
  - [Lucide Icons](https://lucide.dev/)

- **Backend**:
  - [Neon.tech](https://neon.tech/) (Postgres database)
  - [Drizzle ORM](https://drizzle.team/)
  - [Cloudinary](https://cloudinary.com/) (Image storage and management)

- **Authentication**:
  - [Clerk](https://clerk.dev/)

- **Other Tools**:
  - [TypeScript](https://www.typescriptlang.org/)
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
  - [Drizzle Kit](https://drizzle.team/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x)
- [PNPM](https://pnpm.io/) (v9.7.0)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/domkarv/gallry.git
   cd gallry
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   Copy `.env.example` into `.env` file or add following in `.env` file at root of your project.

   ```bash
   POSTGRES_URL=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
   NEXT_PUBLIC_CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   ```

4. Run database migrations:

   ```bash
   pnpm db:push
   ```

### Development

To start the development server, run:

```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Production

To build the app for production, run:

```bash
pnpm build
```

Then, start the production server:

```bash
pnpm start
```

## Scripts

- `pnpm clean`: Clean up the build and node_modules directories.
- `pnpm build`: Build the application for production.
- `pnpm dev`: Start the development server.
- `pnpm start`: Start the production server.
- `pnpm lint`: Run ESLint to check for code issues.
- `pnpm format`: Format code using Prettier.
- `pnpm db:push`: Push the latest migrations to the database.
- `pnpm db:introspect`: Introspect the database schema.
- `pnpm db:generate`: Generate TypeScript types from the database schema.
- `pnpm db:migrate`: Run database migrations.
- `pnpm db:studio`: Open the Drizzle Studio for database management.
- `pnpm db:drop`: Drop the database schema.
