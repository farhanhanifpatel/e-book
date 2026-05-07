# Book Management API

A RESTful API built with **Node.js, Express, TypeScript, MongoDB, JWT Authentication, Multer, and Cloudinary**.  
This project allows users to register, log in, and manage books with image uploads.

---

## Features

- User Signup & Login (JWT Authentication)
- HTTP-only Cookie-based auth
- Create Book with Image Upload
- Cloudinary Image Storage
- MongoDB Database Integration
- Middleware-based authentication
- Input validation
- Error handling system

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT (Authentication)
- Multer (File upload)
- Cloudinary (Image storage)
- dotenv

---

## Project Structure

src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── config/
├── server.ts


---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git remote add origin https://github.com/farhanhanifpatel/e-book.git
cd e-book

**2. Install dependencies**
npm install

**3. Create .env file**
# Server
PORT=5000
NODE_ENV=development


MONGO_URI=mongodb+srv://farhanhanifpatel459_db_user:rosuWLBzMlufJ7gI@cluster0.atfsz9b.mongodb.net/?appName=Cluster0

rosuWLBzMlufJ7gI
# JWT
JWT_SECRET=
JWT_EXPIRES_IN=7d
ACCESS_TOKEN_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_URL=
CLIENT_URL=http://localhost:5173

**4. Run in development mode**
npm run dev

**5. Build for production**
npm run build

**6. Run production server**
npm start

