# Dreamory Event Management API Documentation

This document describes the RESTful API endpoints for the Dreamory Event Management application.

## Base URL

`https://your-api-domain.com/api` (Replace with your actual API domain)

## Authentication

* All admin-related endpoints require a valid JWT token in the `Authorization` header.
* Format: `Authorization: Bearer <token>`
* User portal endpoints are generally public.

## Endpoints

### 1. User Authentication

#### 1.1. Register Admin User (`POST /users/register`)

* **Description:** Registers a new admin user.
* **Request Body:**
    ```json
    {
      "email": "[email address removed]",
      "password": "securePassword"
    }
    ```
* **Response (201 Created):**
    ```json
    {
      "message": "User registered successfully"
    }
    ```
* **Response (400 Bad Request):**
    ```json
    {
      "message": "Email already exists"
    }
    ```

#### 1.2. Login Admin User (`POST /users/login`)

* **Description:** Logs in an admin user and returns a JWT token.
* **Request Body:**
    ```json
    {
      "email": "[email address removed]",
      "password": "securePassword"
    }
    ```
* **Response (200 OK):**
    ```json
    {
      "access_token": "your.jwt.token",
      "refresh_token": "your.refresh.token" (bonus)
    }
    ```
* **Response (401 Unauthorized):**
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

### 2. Events

#### 2.1. Get All Events (`GET /events`)

* **Description:** Retrieves a list of all events.
* **Query Parameters:**
    * `search`: Search term (string).
    * `sort`: Sort field (e.g., `startDate`, `eventName`).
    * `order`: Sort order (`asc` or `desc`).
    * `page`: Page number (integer).
    * `limit`: Number of items per page (integer).
    * `status`: filter by status (ongoing, completed)
* **Response (200 OK):**
    ```json
    [
      {
        "id": 1,
        "eventName": "Event 1",
        "startDate": "2024-01-01T10:00:00.000Z",
        "endDate": "2024-01-02T18:00:00.000Z",
        "location": "Location 1",
        "posterUrl": "url/to/poster.jpg",
        "status": "Ongoing"
      },
      // ... more events
    ]
    ```

#### 2.2. Get Event by ID (`GET /events/{id}`)

* **Description:** Retrieves a specific event by ID.
* **Path Parameter:**
    * `id`: Event ID (integer).
* **Response (200 OK):**
    ```json
    {
      "id": 1,
      "eventName": "Event 1",
      "startDate": "2024-01-01T10:00:00.000Z",
      "endDate": "2024-01-02T18:00:00.000Z",
      "location": "Location 1",
      "posterUrl": "url/to/poster.jpg",
      "status": "Ongoing"
    }
    ```
* **Response (404 Not Found):**
    ```json
    {
      "message": "Event not found"
    }
    ```

#### 2.3. Create Event (`POST /events`)

* **Description:** Creates a new event (admin only).
* **Request Body (multipart/form-data):**
    * `eventName`: Event name (string).
    * `startDate`: Start date (ISO 8601 format).
    * `endDate`: End date (ISO 8601 format).
    * `location`: Location (string).
    * `poster`: Event poster file.
* **Response (201 Created):**
    ```json
    {
      "message": "Event created successfully"
    }
    ```
* **Response (400 Bad Request):**
    ```json
    {
      "message": "Invalid data"
    }
    ```

#### 2.4. Update Event (`PUT /events/{id}`)

* **Description:** Updates an existing event (admin only).
* **Path Parameter:**
    * `id`: Event ID (integer).
* **Request Body (multipart/form-data):**
    * `eventName`: Event name (string).
    * `startDate`: Start date (ISO 8601 format).
    * `endDate`: End date (ISO 8601 format).
    * `location`: Location (string).
    * `poster`: Event poster file.
    * `status`: Event status (Ongoing/Completed)
* **Response (200 OK):**
    ```json
    {
      "message": "Event updated successfully"
    }
    ```
* **Response (400 Bad Request):**
    ```json
    {
      "message": "Invalid data"
    }
    ```

#### 2.5. Delete Event (`DELETE /events/{id}`)

* **Description:** Deletes an event (admin only).
* **Path Parameter:**
    * `id`: Event ID (integer).
* **Request Body:**
    ```json
        {
            "password": "adminPassword"
        }
    ```
* **Response (200 OK):**
    ```json
    {
      "message": "Event deleted successfully"
    }
    ```
* **Response (404 Not Found):**
    ```json
    {
        "message": "event not found"
    }
    ```
* **Response (401 Unauthorized):**
    ```json
        {
            "message": "incorrect password"
        }
    ```

## Data Models

* **Event:**
    ```json
    {
      "id": number,
      "eventName": string,
      "startDate": string (ISO 8601),
      "endDate": string (ISO 8601),
      "location": string,
      "posterUrl": string,
      "status": string ("Ongoing" | "Completed")
    }
    ```
* **User:**
    ```json
    {
      "id": number,
      "email": string
    }
    ```

## Error Handling

* Standard HTTP status codes are used to indicate errors.
* Error messages are returned in the response body as JSON.