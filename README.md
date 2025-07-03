# 📚 Bookstore API - Backend System

A comprehensive RESTful API for managing a bookstore with user authentication, book management, and secure CRUD operations.

## 🚀 Features

- **JWT Authentication** - Secure token-based authentication
- **User Management** - Register, login, logout, and delete accounts
- **Book Management** - Full CRUD operations for books
- **User-Specific Data** - Users can only modify their own books
- **Advanced Filtering** - Search by genre, pagination support
- **File-Based Storage** - JSON file persistence for data
- **Comprehensive Error Handling** - Detailed error messages and status codes
- **Request Logging** - All API requests are logged with timestamps

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **UUID** - Unique identifier generation
- **File System** - JSON-based data storage

## 📁 Project Structure

```
bookstore-api/
├── controllers/
│   ├── authController.js      # User authentication logic
│   └── booksController.js     # Book management logic
├── middleware/
│   └── auth.middleware.js     # JWT authentication middleware
├── routes/
│   ├── user.route.js         # User authentication routes
│   └── books.route.js        # Book management routes
├── src/
│   ├── app.js                # Express app configuration
│   ├── data.js               # File operations utilities
│   └── index.js              # Server entry point
├── data/
│   ├── users.json            # User data storage
│   └── books.json            # Books data storage
├── .env                      # Environment variables
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd bookstore-api
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment File
Create a `.env` file in the root directory:
```env
PORT=3000
TOKEN_SECRET=your-super-secret-jwt-key-here
TOKEN_SECRET_EXPIRY=24h
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### Step 4: Create Data Directory
```bash
mkdir data
```

### Step 5: Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## 📋 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication
All book-related endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Authentication Endpoints

### 1. Register User
**POST** `/user/signup`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User Registered successfully"
}
```

**Postman Setup:**
- Method: `POST`
- URL: `http://localhost:3000/api/v1/user/signup`
- Headers: `Content-Type: application/json`
- Body: Raw JSON (see above)

---

### 2. Login User
**POST** `/user/login`

Login with existing credentials to receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-uuid-here",
    "email": "user@example.com"
  }
}
```

**Postman Setup:**
- Method: `POST`
- URL: `http://localhost:3000/api/v1/user/login`
- Headers: `Content-Type: application/json`
- Body: Raw JSON (see above)
- **Important:** Copy the token from response for subsequent requests

---

### 3. Logout User
**POST** `/user/logout`

Logout and invalidate the current token.

**Headers Required:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200):**
```json
{
  "message": "Logged out"
}
```

**Postman Setup:**
- Method: `POST`
- URL: `http://localhost:3000/api/v1/user/logout`
- Headers: `Authorization: Bearer <your-token>`

---

### 4. Delete User Account
**POST** `/user/delete`

Delete the current user account and all associated data.

**Headers Required:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200):**
```json
{
  "message": "User deleted"
}
```

---

## 📖 Books Management Endpoints

### 1. List Books
**GET** `/books`

Get books with filtering and pagination options.

**Query Parameters:**
- `all` (boolean): Set to `true` to see all books, otherwise shows only user's books
- `page` (number): Page number for pagination (default: 1)
- `limit` (number): Number of books per page (default: 10)
- `genre` (string): Filter books by genre

**Headers Required:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200):**
```json
{
  "books": [
    {
      "id": "book-uuid-here",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Classic Literature",
      "publishedYear": 1925,
      "userId": "user-uuid-here",
      "createdAt": "2024-01-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalBooks": 1,
    "hasNext": false,
    "hasPrev": false
  },
  "meta": {
    "showingAllBooks": false,
    "userId": "user-uuid-here",
    "totalSystemBooks": 5,
    "filteredBooks": 1
  }
}
```

**Postman Setup Examples:**

**Get Your Books:**
- Method: `GET`
- URL: `http://localhost:3000/api/v1/books`
- Headers: `Authorization: Bearer <your-token>`

**Get All Books:**
- Method: `GET`
- URL: `http://localhost:3000/api/v1/books?all=true`
- Headers: `Authorization: Bearer <your-token>`

**Get Books with Pagination:**
- Method: `GET`
- URL: `http://localhost:3000/api/v1/books?page=1&limit=5`
- Headers: `Authorization: Bearer <your-token>`

**Filter by Genre:**
- Method: `GET`
- URL: `http://localhost:3000/api/v1/books?genre=fiction`
- Headers: `Authorization: Bearer <your-token>`

---

### 2. Get Book by ID
**GET** `/books/:id`

Get a specific book by its ID.

**Headers Required:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200):**
```json
{
  "id": "book-uuid-here",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Classic Literature",
  "publishedYear": 1925,
  "userId": "user-uuid-here",
  "createdAt": "2024-01-01T10:00:00.000Z"
}
```

**Postman Setup:**
- Method: `GET`
- URL: `http://localhost:3000/api/v1/books/book-uuid-here`
- Headers: `Authorization: Bearer <your-token>`

---

### 3. Add New Book
**POST** `/books`

Add a new book to your collection.

**Headers Required:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Classic Literature",
  "publishedYear": 1925
}
```

**Response (201):**
```json
{
  "id": "generated-uuid-here",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Classic Literature",
  "publishedYear": 1925,
  "userId": "your-user-id",
  "createdAt": "2024-01-01T10:00:00.000Z"
}
```

**Postman Setup:**
- Method: `POST`
- URL: `http://localhost:3000/api/v1/books`
- Headers: 
  - `Authorization: Bearer <your-token>`
  - `Content-Type: application/json`
- Body: Raw JSON (see above)

**Required Fields:**
- `title` (string) - Book title
- `author` (string) - Author name
- `genre` (string) - Book genre

**Optional Fields:**
- `publishedYear` (number) - Publication year

---

### 4. Update Book
**PUT** `/books/:id`

Update an existing book. Only the book owner can update it.

**Headers Required:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "The Great Gatsby - Updated",
  "author": "F. Scott Fitzgerald",
  "genre": "Classic Literature",
  "publishedYear": 1925
}
```

**Response (200):**
```json
{
  "id": "book-uuid-here",
  "title": "The Great Gatsby - Updated",
  "author": "F. Scott Fitzgerald",
  "genre": "Classic Literature",
  "publishedYear": 1925,
  "userId": "your-user-id",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T11:00:00.000Z"
}
```

**Postman Setup:**
- Method: `PUT`
- URL: `http://localhost:3000/api/v1/books/book-uuid-here`
- Headers: 
  - `Authorization: Bearer <your-token>`
  - `Content-Type: application/json`
- Body: Raw JSON (see above)

---

### 5. Delete Book
**DELETE** `/books/:id`

Delete a book from your collection. Only the book owner can delete it.

**Headers Required:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200):**
```json
{
  "message": "Book deleted successfully"
}
```

**Postman Setup:**
- Method: `DELETE`
- URL: `http://localhost:3000/api/v1/books/book-uuid-here`
- Headers: `Authorization: Bearer <your-token>`

---

## 🔧 Complete Postman Testing Workflow

### Step 1: Setup Postman Environment
1. Create a new environment in Postman
2. Add these variables:
   - `baseUrl`: `http://localhost:3000/api/v1`
   - `token`: (leave empty, will be set after login)

### Step 2: Register and Login
1. **Register a new user:**
   - POST `{{baseUrl}}/user/signup`
   - Body: `{"email": "test@example.com", "password": "password123"}`

2. **Login:**
   - POST `{{baseUrl}}/user/login`
   - Body: `{"email": "test@example.com", "password": "password123"}`
   - Copy the token from response
   - Set the `token` environment variable

### Step 3: Test Book Operations
1. **Add a book:**
   - POST `{{baseUrl}}/books`
   - Headers: `Authorization: Bearer {{token}}`
   - Body: `{"title": "Test Book", "author": "Test Author", "genre": "Fiction"}`

2. **List your books:**
   - GET `{{baseUrl}}/books`
   - Headers: `Authorization: Bearer {{token}}`

3. **Get specific book:**
   - GET `{{baseUrl}}/books/book-id-from-previous-response`
   - Headers: `Authorization: Bearer {{token}}`

4. **Update the book:**
   - PUT `{{baseUrl}}/books/book-id`
   - Headers: `Authorization: Bearer {{token}`
   - Body: `{"title": "Updated Test Book", "author": "Test Author", "genre": "Fiction"}`

5. **Delete the book:**
   - DELETE `{{baseUrl}}/books/book-id`
   - Headers: `Authorization: Bearer {{token}}`

### Step 4: Test Advanced Features
1. **Pagination:**
   - GET `{{baseUrl}}/books?page=1&limit=2`

2. **Genre filtering:**
   - GET `{{baseUrl}}/books?genre=fiction`

3. **View all books:**
   - GET `{{baseUrl}}/books?all=true`

---

## 🚨 Error Handling

The API returns appropriate HTTP status codes and error messages:

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "Email and password are required"
}
```

**401 Unauthorized:**
```json
{
  "message": "No token provided",
  "error": "MISSING_TOKEN"
}
```

**403 Forbidden:**
```json
{
  "message": "Not authorized to update this book"
}
```

**404 Not Found:**
```json
{
  "message": "Book not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```

---

## 🔒 Security Features

- **Password Hashing:** All passwords are hashed using bcrypt
- **JWT Tokens:** Secure token-based authentication
- **Token Blacklisting:** Logout invalidates tokens
- **User Isolation:** Users can only access their own data
- **Input Validation:** All inputs are validated before processing

---

## 📊 Data Models

### User Model
```json
{
  "id": "uuid",
  "email": "string",
  "password": "hashed_string",
  "createdAt": "ISO_date_string"
}
```

### Book Model
```json
{
  "id": "uuid",
  "title": "string",
  "author": "string", 
  "genre": "string",
  "publishedYear": "number",
  "userId": "uuid",
  "createdAt": "ISO_date_string",
  "updatedAt": "ISO_date_string"
}
```

---

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] User registration with valid data
- [ ] User registration with invalid data (missing fields, weak password)
- [ ] User login with correct credentials
- [ ] User login with incorrect credentials
- [ ] Access protected routes without token
- [ ] Access protected routes with invalid token
- [ ] Logout functionality
- [ ] Token blacklisting after logout

**Book Management:**
- [ ] Add book with valid data
- [ ] Add book with missing required fields
- [ ] List books (user-specific)
- [ ] List all books with ?all=true
- [ ] Get book by valid ID
- [ ] Get book by invalid ID
- [ ] Update own book
- [ ] Try to update another user's book
- [ ] Delete own book
- [ ] Try to delete another user's book

---

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production` in environment variables
2. Use a strong, random JWT secret
3. Configure proper CORS origins
4. Set up proper logging
5. Use a real database instead of JSON files

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3000
TOKEN_SECRET=your-super-secure-production-secret
TOKEN_SECRET_EXPIRY=24h
CORS_ORIGIN=https://your-frontend-domain.com
```

---

## 📝 API Response Examples

### Successful Book Creation
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Classic Literature",
  "publishedYear": 1925,
  "userId": "user-123-456-789",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```


---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

---


---

## 📞 Support

For questions or issues, please create an issue in the GitHub repository.

---

## ✅ Features Implemented

- [x] JWT Authentication
- [x] User Registration/Login
- [x] Book CRUD Operations
- [x] User-specific book access
- [x] Error handling
- [x] Request logging
- [x] Token blacklisting
- [x] Input validation
- [x] File-based storage

---

*Built with ❤️ using Node.js and Express*