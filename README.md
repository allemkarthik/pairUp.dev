# PairUp.dev Backend

Backend API for **PairUp.dev**, a developer networking platform inspired by modern matching applications. The backend provides authentication, profile management, connection requests, developer discovery, and secure user interactions.

---

## 🚀 Features

* User Authentication (JWT + Cookies)
* User Registration & Login
* Profile Management
* Developer Feed API
* Send/Accept/Reject Connection Requests
* View Connections
* View Pending Requests
* Pagination Support
* Secure Protected Routes
* Password Hashing using bcrypt
* MongoDB Database Integration

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* Cookie Parser
* CORS

---

## 📁 Project Structure

```
src/
│
├── config/
├── middlewares/
├── models/
├── routes/
├── utils/
├── app.js
└── database.js
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
PORT=7777

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173
```

---

## 📦 Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Start production server:

```bash
npm start
```

---

## 🔐 Authentication APIs

| Method | Endpoint | Description   |
| ------ | -------- | ------------- |
| POST   | /signup  | Register user |
| POST   | /login   | Login user    |
| POST   | /logout  | Logout user   |

---

## 👤 Profile APIs

| Method | Endpoint      | Description    |
| ------ | ------------- | -------------- |
| GET    | /profile/view | Get profile    |
| PATCH  | /profile/edit | Update profile |

---

## 🤝 Connection APIs

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| POST   | /request/send//         | Send request             |
| POST   | /request/review//       | Accept or reject request |
| GET    | /user/requests/received | Received requests        |
| GET    | /user/connections       | User connections         |

---

## 🔍 Feed API

```http
GET /feed?page=1&limit=10
```

### Query Parameters

| Parameter | Description              |
| --------- | ------------------------ |
| page      | Page number              |
| limit     | Number of users per page |

Example:

```http
GET /feed?page=2&limit=10
```

---

## 🔒 Security Features

* JWT Authentication
* HTTP Only Cookies
* Password Hashing
* Protected Routes
* Request Validation
* CORS Configuration

---

## 🌐 Frontend Repository

The frontend application is built using React, Redux Toolkit, Tailwind CSS, and DaisyUI.

---

## 🚀 Future Enhancements

* Real-time Chat
* Socket.io Notifications
* Swipe-based Matching
* Push Notifications
* AI Developer Recommendations
* Developer Compatibility Scoring

---

## 👨‍💻 Author

**Allem Sai Karthik**

Master's in Computer Science
Saint Francis College, New York

##
