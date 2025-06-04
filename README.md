# 📘 Course Management System – Backend

This project is a backend API built with **Node.js**, **Express.js**, and **MongoDB** that allows authenticated users to create, view, update, and delete online courses. It also enables users to organize multiple courses into named packages.

The system follows the MVC (Model-View-Controller) architectural pattern and uses Mongoose for database modeling. Data validation is handled at the schema level. All core features are implemented in a modular, scalable manner, ready for production-level enhancement.

---
## Postman Collection 

https://www.postman.com/bold-space-685722/workspace/course-management-public

---

## ✅ Features

- Create, read, update, and delete courses
- Group multiple courses into custom packages
- MongoDB with Mongoose models
- Modular code structure for scalability
- Basic validation for request data

---

## 🌐 API Endpoints

### Courses

- `POST /course/create`  
  → Add a new course for the logged-in user

- `GET /course/view/all`  
  → View all courses created by the logged-in user

- `GET /course/view/:courseId`  
  → View details of a single course by its ID

- `PATCH /course/edit/:courseId`  
  → Update specific fields of a course (e.g. title, price, description, image)

- `DELETE /course/delete/:courseId`  
  → Permanently delete a course by ID

---

### Packages

- `POST /package/create`  
  → Create a package by grouping multiple course IDs

- `DELETE /package/:id`  
  → Delete a package by its ID

---

This backend is fully tested using **Postman** . Each route assumes that the user is authenticated via a middleware that sets `req.user`. The system is designed for easy integration with real authentication and frontend interfaces.

---
