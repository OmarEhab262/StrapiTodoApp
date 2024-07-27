# To-Do Website

## Overview

This To-Do website is a project built using Strapi for managing user data and APIs, and React for the frontend. The application allows users to manage their to-do items with a focus on user authentication and data validation.

## Features

- **User Authentication**: Users can register, log in, and manage their to-do items. If a user is not logged in, they cannot access the to-do functionality.
- **Data Management**: The app uses Strapi to handle user data and to-do items.
- **Data Validation**: Validation is implemented to ensure data integrity and accuracy.
- **Routing and Protection**: React Router DOM is used for navigation, with protected routes that prevent unauthorized access.
- **Custom Hooks**: Custom hooks are created to avoid code repetition, simplifying API calls and data handling.
- **TypeScript Interfaces**: Interfaces are used to enforce data structure and types for better code quality and maintainability.

## Technologies Used

- **Frontend**: React, React Router DOM
- **Backend**: Strapi
- **Validation**: Yup
- **API Requests**: Axios
- **TypeScript**: For defining interfaces
- **Custom Hooks**: For managing API calls and state

## Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/OmarEhab262/StrapiTodoApp.git
   ```

2. **Install Dependencies**

   Navigate to the project directory and install dependencies:

   ```bash
   cd <project-directory>
   npm install
   ```

3. **Set Up Strapi**

   Follow the Strapi documentation to set up and configure the Strapi backend. Ensure you have the necessary collections and permissions configured for user authentication and to-do management.

4. **Run the Development Server**

   Start the React development server:

   ```bash
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:1337/api` to see the application in action.

## Usage

- **Registration and Login**: Access the registration and login pages to create or access your account.
- **To-Do Management**: Once logged in, you can add, edit, and delete your to-do items.
- **Protected Routes**: If you are not logged in, you will be redirected to the login page when attempting to access the to-do functionality.

## Custom Hooks

- **useApi**: A custom hook for making API requests using Axios.
- **useAuth**: A custom hook for managing authentication and user state.

## Conclusion

This To-Do website project demonstrates a full-stack application using React for the frontend and Strapi for the backend. With features such as user authentication, data validation, and protected routes, the app provides a robust and secure platform for managing to-do items.

The project is organized with separate repositories for the frontend and backend, ensuring clear separation of concerns and easier maintenance. The React app handles user interactions and displays to-do items, while Strapi manages the backend operations and data storage.

Feel free to explore, contribute, and customize this project to suit your needs. Whether you’re looking to enhance your skills with full-stack development or build upon this foundation, this project offers a solid starting point.

Thank you for checking out this project!
