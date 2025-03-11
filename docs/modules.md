# Dreamory Event Management App - Module Breakdown

This document outlines the key modules and their crucial functionalities for the Dreamory Event Management application, as per the technical assessment requirements.

## 1. Backend (Server/API/Event-Management)

The backend is built using NestJS (preferred) or Express.js, providing the API and core logic.

### 1.1. Authentication (auth Module)

* **Functionality:**
    * User registration (admin portal).
    * User login (admin portal).
    * JWT authentication for API security.
    * Password encryption (bcrypt).
    * AuthGuard implementation.
    * Refresh token mechanism (bonus).
* **Crucial Aspects:**
    * Secure password storage.
    * Robust JWT handling.
    * Protection of admin-only endpoints.

### 1.2. Events (events Module)

* **Functionality:**
    * Create events (admin portal).
    * Read events (admin and user portals).
    * Update events (admin portal).
    * Delete events (admin portal, with password validation).
    * File upload for event posters.
    * Filtering, sorting, and searching (admin portal).
    * Pagination (bonus).
    * Change event status (Ongoing/Completed).
* **Crucial Aspects:**
    * Data validation (class-validator).
    * Efficient data retrieval.
    * Secure file handling.
    * Correct Status management.

### 1.3. Users (users Module)

* **Functionality:**
    * User management, mainly used by the auth module.
    * User repository access.
* **Crucial Aspects:**
    * Data integrity.
    * Abstraction of database operations.

### 1.4. Common (common Module)

* **Functionality:**
    * Reusable components (filters, guards, interceptors).
    * Error handling.
    * Data transformation.
* **Crucial Aspects:**
    * Centralized error handling.
    * Consistent API responses.
    * Role based Access Control.

### 1.5. Database (prisma)

* **Functionality:**
    * Database schema definition using Prisma.
    * Database migrations.
    * Database access layer.
* **Crucial Aspects:**
    * Data integrity.
    * Efficient database queries.

## 2. Frontend (Client/UI/Portal)

The frontend is built using ReactJS with TypeScript, Material UI, React Hook Form, and TanStack Query.

### 2.1. Admin Portal (admin Module within components and pages)

* **Functionality:**
    * User authentication (login, registration).
    * Event listing (table format).
    * Event creation, updating, and deletion.
    * File upload for event posters.
    * Filtering, sorting, and searching.
    * Change event status.
* **Crucial Aspects:**
    * Form validation (React Hook Form).
    * Data fetching and caching (TanStack Query).
    * Responsive design.
    * Clear User Interface.

### 2.2. User Portal (user Module within components and pages)

* **Functionality:**
    * Event listing (thumbnail gallery).
    * Event detail view.
* **Crucial Aspects:**
    * Efficient data fetching.
    * User-friendly interface.
    * Image optimization.

### 2.3. Common Components (common Module within components)

* **Functionality:**
    * Reusable UI components (buttons, inputs, etc.).
* **Crucial Aspects:**
    * Consistent UI.
    * Maintainability.

### 2.4. Routing (routes Module)

* **Functionality:**
    * Client-side routing using React Router.
* **Crucial Aspects:**
    * Navigation.
    * URL parameter handling.

### 2.5. Data Fetching and State Management (hooks and TanStack Query)

* **Functionality:**
    * Data fetching from the backend API.
    * Caching of API responses.
    * State management.
* **Crucial Aspects:**
    * Performance optimization.
    * Data synchronization.

### 2.6. Form Handling (React Hook Form)

* **Functionality:**
    * Form validation and handling.
* **Crucial Aspects:**
    * User experience.
    * Data integrity.

This breakdown serves as a high-level overview of the application's modular structure and core functionalities.