# 📚 Bookstore API - Backend System

A comprehensive RESTful API for managing a bookstore with secure JWT-based authentication, user-specific book access, and rich filtering options.

---

## 🚀 Features

- 🔐 **JWT Authentication** – Secure token-based login
- 👥 **User Management** – Signup, login, logout, and delete account
- 📚 **Book Management** – Full CRUD with user-specific access
- 🧠 **Advanced Filtering** – Search by genre, pagination support
- 💾 **File-Based Storage** – Data saved in JSON files
- 🛠 **Error Handling** – Clear error messages and status codes
- 📜 **Request Logging** – All API requests are timestamp-logged

---

## 🛠️ Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **JWT** – Authentication
- **bcrypt** – Password hashing
- **uuid** – Unique ID generation
- **fs** – File System module for JSON persistence

---

## 📁 Project Structure

bookstore Rest-api/
├── controllers/
│ ├── authController.js
│ └── booksController.js
├── middleware/
│ └── auth.middleware.js
├── routes/
│ ├── user.route.js
│ └── books.route.js
├── src/
│ ├── app.js
│ ├── data.js
│ └── index.js
├── data/
│ ├── users.json
│ └── books.json
├── .env
├── package.json
└── README.md

PORT=3000
TOKEN_SECRET=your-super-secret-jwt-key-here
TOKEN_SECRET_EXPIRY=24h
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development


# Step 4: Create data directory
mkdir data
echo "[]" > data/users.json
echo "[]" > data/books.json

# Step 5: Start the server
npm run dev      # Development
npm start        # Production


Server runs at: http://localhost:5000


📋 API Documentation
🔐 Authentication Endpoints
1. Register
POST /api/v1/user/signup

json
Copy code
{
  "email": "user@example.com",
  "password": "password123"
}
2. Login
POST /api/v1/user/login

json
Copy code
{
  "email": "user@example.com",
  "password": "password123"
}
3. Logout
POST /api/v1/user/logout

4. Delete Account
POST /api/v1/user/delete

🪪 All routes except signup/login require:

makefile

Authorization: Bearer <jwt-token>
📖 Book Endpoints
1. Get All Books
GET /api/v1/books

Query Parameters:

all=true – show all users’ books

page=1&limit=10 – pagination

genre=fiction – filter by genre

2. Get Book by ID
GET /api/v1/books/:id

3. Add Book
POST /api/v1/books

json
Copy code
{
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "publishedYear": 1949
}
4. Update Book
PUT /api/v1/books/:id

json

{
  "title": "Updated Title",
  "author": "Updated Author"
}
5. Delete Book
DELETE /api/v1/books/:id

🔧 Postman Testing Workflow
Create Postman environment:

baseUrl = http://localhost:5000/

token = (set after login)

Test Endpoints in Order:

Signup ➜ Login ➜ Set token ➜ Add ➜ View ➜ Update ➜ Delete ➜ Advanced filters

🔒 Security
🔑 Passwords hashed with bcrypt

🛡 JWT authentication

🧹 Token blacklisting on logout

🔐 User-specific resource access

✅ Input validation

📊 Data Models
User
json

{
  "id": "uuid",
  "email": "string",
  "password": "hashed_string",
  "createdAt": "ISO_date"
}
Book
json

{
  "id": "uuid",
  "title": "string",
  "author": "string",
  "genre": "string",
  "publishedYear": "number",
  "userId": "uuid",
  "createdAt": "ISO_date",
  "updatedAt": "ISO_date"
}
🧪 Testing Checklist
Authentication:

✅ Signup/Login

✅ Invalid credentials

✅ Token missing/expired

✅ Blacklist on logout

Books:

✅ CRUD

✅ Access control

✅ Pagination

✅ Filtering by genre

✅ Invalid/missing fields

🚀 Deployment
Set NODE_ENV=production

Use strong TOKEN_SECRET

Set CORS to frontend origin

Replace file-based DB with MongoDB/PostgreSQL

Add HTTPS and rate limiting




✅# Built With

❤️ Node.js + Express

🔐 JWT + bcrypt

📄 File system for storage

🧠 Pure logic, no DB!












