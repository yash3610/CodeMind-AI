# API Documentation - CodeMind AI

Base URL: `http://localhost:5000/api` (Development)

## 📋 Table of Contents

- [Authentication](#authentication)
- [Code Generation](#code-generation)
- [Code History](#code-history)
- [Error Handling](#error-handling)

---

## 🔐 Authentication

### Register User

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": {
      "theme": "dark",
      "defaultLanguage": "javascript",
      "defaultFramework": "react"
    },
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Login User

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": {...},
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Get Current User

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": {...}
  }
}
```

---

### Logout

**Endpoint:** `POST /auth/logout`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Update Preferences

**Endpoint:** `PUT /auth/preferences`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "theme": "dark",
  "defaultLanguage": "python",
  "defaultFramework": "django"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "user": {...}
}
```

---

## 💻 Code Generation

### Generate Code

**Endpoint:** `POST /code/generate`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "prompt": "Create a login form with email and password",
  "language": "react",
  "framework": "react",
  "styling": "tailwind",
  "title": "Login Form Component"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "code": "import React, { useState } from 'react'...",
    "historyId": "507f1f77bcf86cd799439011"
  }
}
```

---

### Fix Code

**Endpoint:** `POST /code/fix`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "code": "const add = (a, b) => { return a + b }",
  "error": "TypeError: Cannot read property 'length' of undefined",
  "language": "javascript",
  "historyId": "507f1f77bcf86cd799439011"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "code": "const add = (a, b) => { if (!a || !b) return 0; return a + b }",
    "errorLogId": "507f1f77bcf86cd799439012"
  }
}
```

---

### Explain Code

**Endpoint:** `POST /code/explain`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "code": "const fibonacci = (n) => n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2)",
  "language": "javascript"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "explanation": "This is a recursive implementation of the Fibonacci sequence..."
  }
}
```

---

### Optimize Code

**Endpoint:** `POST /code/optimize`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "code": "for (var i = 0; i < arr.length; i++) { console.log(arr[i]) }",
  "language": "javascript"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "code": "arr.forEach(item => console.log(item))"
  }
}
```

---

### Convert Code

**Endpoint:** `POST /code/convert`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "code": "def add(a, b):\n    return a + b",
  "fromLanguage": "python",
  "toLanguage": "javascript"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "code": "function add(a, b) {\n  return a + b;\n}"
  }
}
```

---

## 📚 Code History

### Get All History

**Endpoint:** `GET /history`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `language` (optional): Filter by language
- `isFavorite` (optional): Filter favorites (true/false)
- `search` (optional): Search in title/prompt
- `sort` (optional): Sort field (default: -createdAt)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Example:**
```
GET /history?language=javascript&isFavorite=true&page=1&limit=10
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 5,
  "total": 50,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Login Form",
      "language": "react",
      "framework": "react",
      "styling": "tailwind",
      "prompt": "Create a login form...",
      "isFavorite": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "viewCount": 5
    }
  ]
}
```

---

### Get History by ID

**Endpoint:** `GET /history/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Login Form",
    "language": "react",
    "framework": "react",
    "styling": "tailwind",
    "prompt": "Create a login form...",
    "generatedCode": "import React...",
    "editedCode": null,
    "isFavorite": true,
    "tags": ["auth", "form"],
    "errorLogs": [],
    "viewCount": 6,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Create History

**Endpoint:** `POST /history`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "My Code",
  "language": "javascript",
  "framework": "none",
  "styling": "css",
  "prompt": "Create a calculator",
  "generatedCode": "const calc = ...",
  "tags": ["calculator", "math"]
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {...}
}
```

---

### Update History

**Endpoint:** `PUT /history/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "editedCode": "const updated = ...",
  "isFavorite": true,
  "tags": ["updated", "new"]
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {...}
}
```

---

### Delete History

**Endpoint:** `DELETE /history/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Code history deleted successfully"
}
```

---

### Toggle Favorite

**Endpoint:** `PATCH /history/:id/favorite`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "isFavorite": true,
    ...
  }
}
```

---

### Get Statistics

**Endpoint:** `GET /history/stats`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "total": 50,
    "favorites": 10,
    "recentActivity": 5,
    "byLanguage": [
      { "_id": "javascript", "count": 20 },
      { "_id": "python", "count": 15 },
      { "_id": "react", "count": 15 }
    ]
  }
}
```

---

## ⚠️ Error Handling

All endpoints follow consistent error response format:

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `500` - Server Error

**Common Error Messages:**

**Authentication Errors:**
```json
{
  "success": false,
  "message": "Not authorized to access this route. Please login."
}
```

**Validation Errors:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Email is required",
    "Password must be at least 6 characters"
  ]
}
```

**Resource Not Found:**
```json
{
  "success": false,
  "message": "Code history not found"
}
```

---

## 🔒 Security

- All protected endpoints require `Authorization: Bearer <token>` header
- JWT tokens expire after 30 days
- Passwords are hashed using bcrypt (10 rounds)
- Rate limiting: 100 requests per 15 minutes per IP
- CORS enabled for specified frontend URL only

---

## 📊 Rate Limits

- **Default:** 100 requests per 15 minutes
- **Per endpoint:** No additional limits
- **429 Response** when limit exceeded:
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```
