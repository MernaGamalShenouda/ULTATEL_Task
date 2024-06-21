# Student Management System

A comprehensive Student Management System built with Angular for the frontend and NestJS for the backend, using MySQL as the database.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Features](#features)

## Technologies Used

- **Frontend:**
  - Angular
  - Bootstrap
  - ng-bootstrap
  - ng-select
  - sweetalert2
  - ngx-pagination

- **Backend:**
  - NestJS
  - TypeORM
  - Passport.js for Authentication
  - JWT (JSON Web Tokens)
  
- **Database:**
  - MySQL

## Setup Instructions

### Backend Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/MernaGamalShenouda/ULTATEL_Task.git
   cd ULTATEL_Task/backend

2. **Install the dependencies:**
   ```sh
   npm install

3. **Set up the environment variables:**
   ```sh
   Create a .env file in the backend directory and configure your MySQL database connection and JWT secret.

   
4. **Run the application:**
   ```sh
   npm run start

   

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```sh
   cd ../frontend


2. **Install the dependencies:**
   ```sh
   npm install

3. **Serve the application:**
   ```sh
   ng serve

   
4. **Open your browser:**
   ```sh
   Navigate to http://localhost:4200 to see the application in action.

## Features

### User Authentication
- **User Registration and Login**: Allows users to create new accounts and log into existing ones.
- **Secure Password Storage**: Passwords are securely stored using hashing techniques.
- **JWT-based Authentication**: JSON Web Tokens (JWT) are used for secure user authentication.

### Student Management
- **CRUD Operations for Students**:
  - **Create**: Add new student records.
  - **Read**: View details of student records.
  - **Update**: Modify existing student records.
  - **Delete**: Remove student records.
- **Search Functionality**:
  - Filters available for:
    - **Name**
    - **Gender**
    - **Country**
    - **Age**
- **Pagination and Sorting**: Efficiently navigate through large lists of students with pagination and sorting options.

### Responsive Design
- **Bootstrap for Responsive UI**: Ensures the user interface is responsive across various devices.
- **ng-bootstrap Components**:
  - **Modals**: Used for dialogs and popups.
  - **Datepickers**: User-friendly date selection tool.
- **sweetalert2**: Enhanced alerts and notifications for a better user experience.




