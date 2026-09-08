# Task Manager Node API

A simple Express + MongoDB task management API built with Node.js and Mongoose. It supports user registration, authentication, task creation, task listing, and task updates/deletions.

## Features

- User signup and login
- JWT-based authentication
- Logout and logout from all sessions
- Fetch authenticated user profile
- Create, read, update, and delete tasks
- Task filtering by completion status
- Password hashing with bcrypt
- MongoDB data persistence with Mongoose

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Validator

## Project Structure

```bash
.
├── src/
│   ├── db/
│   │   └── mongoose.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── task.js
│   │   └── user.js
│   ├── routers/
│   │   ├── task.js
│   │   └── user.js
│   └── index.js
├── package.json
├── playground/
│   ├── promiseChaining1.js
│   └── promiseChaining2.js
└── README.md
```

## Requirements

- Node.js installed
- MongoDB running locally on port 27017
- npm

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd task-manager-node
```

2. Install dependencies:

```bash
npm install
```

3. Start MongoDB locally.

4. Run the app:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## Environment

This project uses a local MongoDB database connection in [src/db/mongoose.js](src/db/mongoose.js):

```js
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
```

## API Endpoints

### User Routes

#### Create user

```http
POST /users
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "MyPassword123"
}
```

#### Login user

```http
POST /users/login
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "MyPassword123"
}
```

#### Get authenticated profile

```http
GET /users/me
```

Headers:

```http
Authorization: Bearer <token>
```

#### Update current user

```http
PATCH /users/me
```

#### Delete current user

```http
DELETE /users/me
```

#### Logout

```http
POST /users/logout
```

#### Logout all sessions

```http
POST /users/logoutAll
```

### Task Routes

#### Create task

```http
POST /tasks
```

Headers:

```http
Authorization: Bearer <token>
```

Request body:

```json
{
  "description": "Finish project report",
  "completed": false
}
```

#### Get all tasks

```http
GET /tasks
```

Optional filter:

```http
GET /tasks?completed=true
```

#### Get task by ID

```http
GET /tasks/:id
```

#### Update task

```http
PATCH /tasks/:id
```

#### Delete task

```http
DELETE /tasks/:id
```

## Authentication

Requests that need user identity should include a bearer token in the Authorization header:

```http
Authorization: Bearer <token>
```

The token is generated on signup or login and verified by the auth middleware in [src/middleware/auth.js](src/middleware/auth.js).

## Notes

- The app runs on port 3000 by default.
- MongoDB must be running before starting the server.
- This is a learning project for building a REST API with Node.js and MongoDB.

## License

ISC
