# 🌍 Tour Booking Platform

A full-featured backend system for managing users, tours, bookings, and payments for a tour-based travel service.

---

## 📦 Features

- **User Management**: Registration, login, role-based access (Admin/User), profile management, social logins.
- **Tour Listings**: CRUD operations on tours, filtering by type, date, or location.
- **Tour Types**: Organize tours by type (e.g., Adventure, Leisure).
- **Bookings**: Users can book tours with multiple guests.
- **Payments**: Integrated payment structure with gateways, invoice handling, and booking status tracking.

---

## 🏗️ Entity Structure

### 👤 User

| Field      | Type            | Description                      |
| ---------- | --------------- | -------------------------------- |
| name       | String          | Full name                        |
| email      | String (unique) | Email address                    |
| password   | String          | Hashed password                  |
| role       | String          | User role (Admin/User)           |
| phone      | String          | Contact number                   |
| picture    | String          | Profile image URL                |
| address    | String          | User address                     |
| isDeleted  | Boolean         | Soft delete flag                 |
| isActive   | String          | Status (Active/Inactive)         |
| isVerified | Boolean         | Email or KYC verification status |
| auths      | Array           | Auth providers (e.g., Google)    |

---

### 🧭 Tour

| Field       | Type             | Description                  |
| ----------- | ---------------- | ---------------------------- |
| slug        | String (unique)  | SEO-friendly identifier      |
| title       | String           | Tour title                   |
| description | String           | Tour description             |
| images      | Array of Strings | URLs to images               |
| location    | String           | Destination                  |
| costFrom    | Number           | Starting price               |
| startDate   | Date             | Start of tour                |
| endDate     | Date             | End of tour                  |
| tourType    | ObjectId         | Reference to TourType        |
| included    | Array of Strings | Included amenities           |
| excluded    | Array of Strings | Exclusions (e.g., insurance) |
| amenities   | Array of Strings | Facilities and features      |
| tourPlan    | Array of Strings | Day-by-day itinerary         |

---

### 🗂️ TourType

| Field | Type   | Description             |
| ----- | ------ | ----------------------- |
| name  | String | Tour category/type name |

---

### 📅 Booking

| Field      | Type     | Description                        |
| ---------- | -------- | ---------------------------------- |
| user       | ObjectId | Reference to `User`                |
| tour       | ObjectId | Reference to `Tour`                |
| guestCount | Number   | Number of people booked            |
| phone      | String   | Contact number                     |
| address    | String   | Billing address                    |
| status     | String   | Booking status (Pending/Completed) |
| payment    | ObjectId | Reference to `Payment`             |

---

### 💳 Payment

| Field              | Type     | Description                   |
| ------------------ | -------- | ----------------------------- |
| booking            | ObjectId | Reference to `Booking`        |
| transactionId      | String   | Unique transaction identifier |
| status             | String   | Paid/Unpaid/Refunded          |
| amount             | Number   | Payment amount                |
| paymentGatewayData | Any      | Gateway response (metadata)   |
| invoiceUrl         | String   | URL to the invoice document   |

---

## 🔗 Entity Relationships

- `User` ➝ `Booking`: One-to-many
- `Tour` ➝ `Booking`: One-to-many
- `Tour` ➝ `TourType`: Many-to-one
- `Booking` ➝ `Payment`: One-to-one

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v22+)
- MongoDB
- Git

### Installation

```bash
git clone https://github.com/wahednur/tour-management-sys-backend.git
cd tour-booking-platform
npm install
```

### Environment Variables

```
PORT=5000
DB_URI=your_mongoDB_connection_uri
NODE_ENV=development

#JWT
JWT_SECRET =your_secret_token
JWT_EXP_IN=1d
JWT_REFRESH_SECRET=JWT_SECRET
JWT_REFRESH_EXP=30d


#BCRYPT
BCRYPT_SALT=10


# Super admin
SUPER_ADMIN_EMAIL=youradmin@email.com
SUPER_ADMIN_PASSWORD=your_admin_password



Google Login
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback

# Express session
EXPRESS_SESSION_SECRET=express-session

# Frontend URL
FRONTEND_URL=http://localhost:5173


# SSL commerz
SSL_STORE_ID=your_store_ID
SSL_STORE_PASS=Your_store_password
SSL_PAYMENT_API=https://sandbox.sslcommerz.com/gwprocess/v3/api.php
SSL_VALIDATION_API=https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php


# SSL Commerz Frontend API
SSL_SUCCESS_URL="http://localhost:5000/api/v1/payment/success"
SSL_FAIL_URL="http://localhost:5000/api/v1/payment/fail"
SSL_CANCEL_URL="http://localhost:5000/api/v1/payment/cancel"


# CLOUDINARY
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

```

### Folder Structure

```
├── src/
      ├── app/
            ├── config
            ├── errorHelpers
            ├── interfaces
            ├── middlewares
            ├── modules
            ├── routes
            ├── utils
└──   app.js / server.js
```

## 👨‍💻 Author

**Abdul Wahed Nur**  
MERN Stack Developer
✉️: <wahednur@gmail.com>
📞: +88 01917839303
[Portfolio](https://wahednur.vercel.app) | [LinkedIn](https://www.linkedin.com/in/wahednur/)

---

Let me know if you want to add API documentation (like Swagger/OpenAPI), deployment instructions (e.g., Docker), or frontend-related details.
