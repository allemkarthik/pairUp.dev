# 🚀 PairUp.dev Backend

Backend API for **PairUp.dev**, a full-stack developer networking platform that helps developers connect, chat, and build professional relationships. Inspired by modern networking applications, PairUp.dev includes secure authentication, developer discovery, real-time messaging, premium memberships, automated email notifications, and scalable backend architecture.

---

# ✨ Features

## 👤 Authentication & User Management
- JWT Authentication using HTTP-only Cookies
- User Registration & Login
- Secure Password Hashing with bcrypt
- Protected API Routes
- Profile Management
- Cloudinary Profile Image Uploads
- Date of Birth Support for Birthday Notifications

---

## 🤝 Networking Features

- Developer Feed with Pagination
- Send Connection Requests
- Accept / Reject Requests
- View Pending Requests
- View Accepted Connections
- Prevent Duplicate Requests
- Mutual Connection Validation

---

## 💬 Real-Time Chat

- Socket.IO powered real-time messaging
- Private one-to-one chat rooms
- Persistent chat history stored in MongoDB
- Connection validation before allowing chat
- Automatic room generation using user IDs

---

## 💳 Premium Membership

- Razorpay Payment Gateway Integration
- Premium Membership Purchase
- Premium Pro Membership
- Payment Verification
- Payment Records Stored in MongoDB
- Secure Signature Verification using Razorpay Webhooks

---

## 📧 Email Automation

AWS SES Integration

Automated emails for:

- Welcome Emails
- Pending Connection Reminder Emails
- Birthday Wishes
- Future Marketing Emails

Cron Jobs powered by **node-cron**

---

## 🎂 Birthday System

- Stores user's Date of Birth
- Daily Cron Job
- Automatically wishes users on their birthday using AWS SES

---

## 🔒 Security

- JWT Authentication
- HTTP-only Cookies
- Password Hashing (bcrypt)
- Request Validation
- Protected APIs
- CORS Configuration
- MongoDB Injection Protection
- Environment Variables

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication

- JWT
- bcrypt
- Cookie Parser

## Real-time

- Socket.IO

## Payments

- Razorpay

## Cloud

- AWS EC2
- AWS SES
- Nginx

## Storage

- Cloudinary

## Scheduling

- node-cron

---

# 📁 Project Structure

```text
src/
│
├── config/
├── middleware/
├── models/
├── routes/
├── utils/
├── cronJobs/
├── socket/
├── app.js
└── database.js
```

---

# ⚙️ Environment Variables

Create a `.env` file.

```env
PORT=3000

MONGO_URI=

JWT_SECRET=

CLIENT_URL=

COOKIE_DOMAIN=

####################################
# Cloudinary
####################################

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

####################################
# AWS SES
####################################

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_SES_FROM_EMAIL=

####################################
# Razorpay
####################################

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
WEBHOOK_SECRET=
```

---

# 📦 Installation

Clone repository

```bash
git clone https://github.com/yourusername/pairupdev-backend.git
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 🔑 Authentication APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /signup | Register User |
| POST | /login | Login |
| POST | /logout | Logout |

---

# 👤 Profile APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /profile/view | Get Profile |
| PATCH | /profile/edit | Edit Profile |

---

# 🤝 Connection APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /request/send/:status/:userId | Send Connection Request |
| POST | /request/review/:status/:requestId | Accept / Reject Request |
| GET | /user/requests/received | Pending Requests |
| GET | /user/connections | Connections |

---

# 🌐 Feed API

```http
GET /feed?page=1&limit=10
```

Example

```http
GET /feed?page=2&limit=10
```

---

# 💬 Chat APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /chat/:targetUserId | Fetch Chat History |

Real-time communication is handled using **Socket.IO** events.

---

# 💳 Payment APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /payment/create | Create Razorpay Order |
| POST | /payment/webhook | Verify Razorpay Payment |
| GET | /premium/verify | Check Premium Status |

---

# 📧 Scheduled Jobs

### Daily Birthday Emails

Runs every morning to send birthday wishes.

### Pending Connection Reminder

Automatically reminds users about pending connection requests.

Future scheduled jobs include:

- Weekly Activity Reports
- Monthly Developer Digest
- Premium Expiration Reminder

---

# 🚀 Deployment

Backend deployed on:

- AWS EC2
- Nginx Reverse Proxy
- MongoDB Atlas
- AWS SES
- Cloudinary

---

# 🔒 Security Features

- JWT Authentication
- HTTP-only Cookies
- bcrypt Password Hashing
- Secure Environment Variables
- CORS Protection
- Input Validation
- Protected Routes
- Payment Signature Verification

---

# 🚀 Future Roadmap

- AI Developer Recommendations
- Developer Compatibility Score
- Group Chats
- Typing Indicators
- Read Receipts
- Online/Offline Presence
- Push Notifications
- Video Calling
- Resume Parsing
- AI Icebreaker Messages

---

# 👨‍💻 Author

**Sai Karthik Allem**

Master's in Computer Science  
St. Francis, NewYork

🔗 LinkedIn: www.linkedin.com/in/karthik-allem

🌐 PairUp.dev