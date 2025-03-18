# Posts CRUD Fullstack Application

### This website focuses on **Backend Services** that use Next.js API routes to handle server-side logic, including authentication, data management, and API integrations.

Welcome to the Posts **CRUD Fullstack Application!** This web-based platform allows users to view, add, edit, and delete posts. It also supports searching for posts, pagination, and managing user authentication using JWT tokens. The app uses a modern tech stack, including Next.js, Prisma, PostgreSQL, and React-Bootstrap, with various integrated features like SweetAlert2, react-hot-toast, and Framer Motion animations.

### Live Demo: [Posts CRUD Fullstack](https://posts-crud-fullstack.vercel.app/)

## Table of Contents

- **Feature**
- **Technologies Used**
- **Usage**
- **Project Structure**
- **Installation**

## Features

- **CRUD Operations**: Create, Read, Update, and Delete posts and comments.
- **JWT Authentication**: Users can only edit or delete their posts and comments.
- **Post Searching**: Filter posts based on search criteria.
- **Pagination**: Efficiently load and display posts page by page.
- **User Feedback**: Toast notifications and SweetAlert2 dialogs for success/error actions.
- **Responsive Design**: Optimized for various device sizes using React-Bootstrap.
- **Animations**: Smooth animations using Framer Motion.
- **Loading States**: User-friendly loading indicators.

## Technologies Used

- **Frontend**: Next.js (React) with TypeScript, React-Bootstrap, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Styling**: React-Bootstrap, Custom CSS
- **State Management**: React hooks and local component state
- **API Calls**: Axios for handling HTTP requests
- **Authentication**: JWT tokens for secure routes
- **Notifications**: SweetAlert2 for dialogs, react-hot-toast for notifications
- **Deployment**: Vercel

## Usage

### Once the application is running, you can:

1. View Posts: Browse all posts on the homepage with pagination.
2. Search Posts: Use the search bar to filter posts by title or content.
3. Add Post: Click on the "Add Post" button to create a new post.
4. Edit Post: You can only edit posts that you have created. Click the "Edit" button next to a post to update it.
5. Delete Post: You can also delete your posts. Confirmation dialogs are used before deletion.
6. Add Comment: Click on the "Add Comment" button to create a new Comment for the specified Post.
7. Edit Comment: You can only edit comments that you have created
8. Delete Comment: You can also delete your Comments. Confirmation dialogs are used before deletion.

## Project Structure

##### ├── components/ # Reusable React components

##### ├── app/ # Next.js page routes

##### │ ├── api/ # API routes for backend (CRUD operations)

##### │ └── page.tsx # Home Page for Route

##### ├── prisma/ # Prisma schema and migration files

##### ├── public/ # Static assets (images, etc.)

##### ├── hooks/ # Custom React hooks

##### ├── styles/ # Global styles

##### ├── utils/ # Utility functions (e.g., Axios instance, types)

##### ├── .env # Environment variables

##### └── README.md # Documentation

## Installation

To set up this project locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/posts-crud-fullstack.git
   cd posts-crud-fullstack
   ```
