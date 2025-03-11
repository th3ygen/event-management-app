# Dreamory Event Management App - Test Cases

This document outlines the test cases for the Dreamory Event Management application, covering both backend and frontend components.

## 1. Backend Test Cases

### 1.1. Authentication (auth Module)

* **1.1.1. User Registration:**
    * Verify successful registration with valid credentials.
    * Verify error handling for duplicate email registration.
    * Verify password hashing.
    * Verify validation of input data.
* **1.1.2. User Login:**
    * Verify successful login with valid credentials.
    * Verify error handling for invalid credentials.
    * Verify JWT token generation.
    * Verify refresh token generation and usage (bonus).
* **1.1.3. AuthGuard:**
    * Verify protected endpoints are inaccessible without a valid JWT.
    * Verify access to protected endpoints with a valid JWT.

### 1.2. Events (events Module)

* **1.2.1. Create Event:**
    * Verify successful event creation with valid data.
    * Verify error handling for invalid data.
    * Verify file upload of event poster.
* **1.2.2. Read Events:**
    * Verify retrieval of all events.
    * Verify retrieval of a single event by ID.
    * Verify filtering, sorting, and searching functionality.
    * Verify pagination (bonus).
* **1.2.3. Update Event:**
    * Verify successful event update with valid data.
    * Verify error handling for invalid data.
    * Verify file update of event poster.
    * Verify event status changing.
* **1.2.4. Delete Event:**
    * Verify successful event deletion.
    * Verify error handling for non-existent event.
    * Verify password validation for delete action.

### 1.3. Users (users Module)

* **1.3.1. User Repository:**
    * Verify user retrieval by ID.
    * Verify user retrieval by email.

### 1.4. Common (common Module)

* **1.4.1. Error Handling:**
    * Verify custom error handling for specific scenarios.
    * Verify http exception filter.
* **1.4.2. Guards:**
    * Verify role based access control.
* **1.4.3. Interceptors:**
    * Verify data transformation.

## 2. Frontend Test Cases

### 2.1. Admin Portal

* **2.1.1. Authentication:**
    * Verify successful login and registration.
    * Verify error handling for invalid credentials.
    * Verify successful navigation after login.
* **2.1.2. Event List:**
    * Verify display of events in a table format.
    * Verify filtering, sorting, and searching functionality.
    * Verify pagination.
* **2.1.3. Event Form (Create/Update):**
    * Verify successful event creation and update.
    * Verify form validation.
    * Verify file upload functionality.
    * Verify event status changing.
* **2.1.4. Event Detail:**
    * Verify event detail display.
* **2.1.5. Event Deletion:**
    * Verify event deletion.
    * Verify password validation.

### 2.2. User Portal

* **2.2.1. Event Gallery:**
    * Verify display of events in a thumbnail gallery.
    * Verify correct display of image thumbnails.
* **2.2.2. Event Detail:**
    * Verify display of event details.

### 2.3. Common Components

* **2.3.1. Reusable Components:**
    * Verify functionality of buttons, inputs, and other reusable components.

### 2.4. Routing

* **2.4.1. Navigation:**
    * Verify correct navigation between pages.
    * Verify URL parameter handling.

### 2.5. Data Fetching and State Management

* **2.5.1. API Integration:**
    * Verify successful data fetching from the backend API.
    * Verify caching of API responses.
    * Verify data synchronization.

### 2.6. Form Handling

* **2.6.1. Form Validation:**
    * Verify form validation works correctly.

**Testing Strategies:**

* Unit tests for backend services and repositories.
* Integration tests for API endpoints.
* Component tests for React components.
* End-to-end (E2E) tests for critical user flows (if time allows).
* Use Jest and React Testing Library for frontend testing.
* Use Jest for backend testing.
* Use supertest for backend integration testing.