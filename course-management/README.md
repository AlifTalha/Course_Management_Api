# 📚 Course Management API

A Course Management REST API built. 
This API supports **user authentication, role-based access control, course management, and course purchases**.

---

## 🚀 Features
- **User Authentication**
  - JWT-based authentication
  - Password hashing with bcrypt
  - Roles: `user` and `admin`
- **Course Management**
  - Admin can **create** and **delete** courses
  - Users can **view** all courses or a single course
- **Purchase System**
  - Users can purchase courses
  - Store purchase history (userId, courseId, amount, date)
  - View purchased courses
- **Validation & Error Handling**
  - Request body validation
  - Centralized error handling middleware

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT (jsonwebtoken)**
- **bcrypt**
- **dotenv**
- **nodemon** 
---

## ⚙️ Setup & Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/AlifTalha/Course_Management_Api.git
   cd course-management-api


### npm install
npm run dev   # development 
npm start   


PORT=5000
MONGO_URI=mongodb://localhost:27017/CourseManage
JWT_SECRET=yourSuperSecretKey


## Route 
## Always use token inside Authorization in Bearer Token

###  http://localhost:5000/api/auth/register

{
  "name": "Altab",
  "email": "altab@gmail.com",
  "password": "123456",
  "role": "admin"
}


### http://localhost:5000/api/auth/login
{
  "email": "altab@gmail.com",
  "password": "123456"
}

### http://localhost:5000/api/courses (get all )
### http://localhost:5000/api/courses (post method)
{
  "title": "Physisc Course",
  "description": "LearnPhysiscs from scratch",
  "price": 29.99,
  "instructor": "John "
}

### http://localhost:5000/api/courses/68be850d2fc25c1f85d1d262    (get course by id)
### http://localhost:5000/api/purchases/68be850d2fc25c1f85d1d262    
### http://localhost:5000/api/purchases/me  

show details about purchases

### http://localhost:5000/api/courses/68be91fd2fc25c1f85d1d276   (delete course by ID)

### http://localhost:5000/api/auth/me  (verify the role)



## Roles

### User

Can register/login

Can view courses

Can purchase courses

### Admin

Can create/delete courses

Can also view and purchase courses