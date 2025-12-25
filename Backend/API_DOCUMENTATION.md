# Travel Management System - API Documentation

This document provides details for the authentication and resource APIs to be used by the frontend.

**Base URL:** `http://localhost:5000/api`

---

## Authentication APIs

### 1. Register User
- **Route:** `/auth/register`
- **Method:** `POST`
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "03001234567",
  "password": "password123",
  "role": "USER" // Optional: "USER", "ADMIN", "MINI_ADMIN". Default is "USER"
}
```
- **Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "JWT_TOKEN_HERE",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

### 2. Login User
- **Route:** `/auth/login`
- **Method:** `POST`
- **Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response (200):**
```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

### 3. Get Current User Profile
- **Route:** `/auth/me`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <TOKEN>`
- **Response (200):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "03001234567",
  "role": "USER",
  "status": "ACTIVE",
  "profileImage": null,
  "address": null,
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## Resource APIs (Locations, Hotels, Flights, etc.)

**Note:**
- `GET` requests are **Public** (No token needed).
- `POST`, `PUT`, `DELETE` requests require **Auth Token** and **Admin/Mini-Admin** role.

### 1. Locations
- **GET All:** `/locations`
- **GET One:** `/locations/:id`
- **POST Create:** `/locations`
- **Body:**
```json
{
  "cityName": "Islamabad",
  "country": "Pakistan",
  "description": "Capital city of Pakistan",
  "bestTimeToVisit": "October to March",
  "coordinates": "33.6844, 73.0479",
  "thumbnail": "image_url_here"
}
```

### 2. Hotels
- **GET All:** `/hotels`
- **GET One:** `/hotels/:id`
- **POST Create:** `/hotels`
- **Body:**
```json
{
  "name": "Serena Hotel",
  "address": "Khayaban-e-Suhrwardy, Islamabad",
  "description": "5-star luxury hotel",
  "starCategory": "5_STAR", // Options: "1_STAR", "2_STAR", "3_STAR", "4_STAR", "5_STAR"
  "pricePerNight": 25000,
  "amenities": "Pool, Gym, Free WiFi, Breakfast",
  "rating": 4.8,
  "contactNumber": "051-1111333",
  "website": "www.serena.com",
  "image": "image_url_here",
  "ViewPointId": 1 // Link to a viewpoint
}
```

### 3. Airlines & Flights
#### Airlines
- **GET All:** `/airlines`
- **POST Create:** `/airlines`
- **Body:**
```json
{
  "name": "Pakistan International Airlines",
  "code": "PIA",
  "logo": "logo_url",
  "country": "Pakistan",
  "website": "www.piac.com.pk",
  "contactEmail": "info@piac.com"
}
```

#### Flights
- **GET All:** `/flights`
- **POST Create:** `/flights`
- **Body:**
```json
{
  "flightNumber": "PK-301",
  "fromCity": "Karachi",
  "toCity": "Islamabad",
  "departureTime": "2025-12-30T10:00:00Z",
  "arrivalTime": "2025-12-30T12:00:00Z",
  "duration": "2h 0m",
  "price": 15000,
  "class": "ECONOMY", // "ECONOMY", "BUSINESS", "FIRST"
  "status": "SCHEDULED",
  "AirlineId": 1
}
```

### 4. ViewPoints
- **GET All:** `/viewpoints`
- **POST Create:** `/viewpoints`
- **Body:**
```json
{
  "name": "Monal Resturant / Margalla Hills",
  "description": "Beautiful hill view point in Islamabad",
  "bannerImage": "banner_url",
  "openingHours": "9:00 AM - 11:00 PM",
  "entryFee": 0,
  "LocationId": 1
}
```

---

## Error Responses
- **401 Unauthorized:** Invalid or missing token.
- **403 Forbidden:** User doesn't have the required role (Admin/Mini-Admin).
- **404 Not Found:** Resource not found.
- **400 Bad Request:** Validations failed or missing required fields.
