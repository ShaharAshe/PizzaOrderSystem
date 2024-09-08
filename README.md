
---

# 🍕 Pizza Ordering System

## Table of Contents

- [About Me](#about-me)
- [Overview](#overview)
- [JavaDoc](#-javadoc)
- [Project Structure](#project-structure)
- [Usage](#usage)

---

# About Me

- 💁 Name: Shahar Asher
- 📫 Email: [shaharas@edu.hac.ac.il](mailto:shaharas@edu.hac.ac.il)

---

## Overview

The Pizza Ordering System is a web application built with React.js and Spring Boot. It allows users to customize and order pizzas online. The system includes features such as managing cart items, handling orders, and displaying order details.

---

## 📚 JavaDoc
To view the generated JavaDoc:

1. Open the [doc](./doc) directory.
2. Locate the [index.html](./doc/index.html) file.
3. Open it with a web browser to explore the documentation.

---
## Project Structure

The project is organized into different modules:

- **Frontend (React.js)**:
    - **Components**: Contains React components for different parts of the application, such as Cart, PizzaBuilder, and HomePage.
    - **Hooks**: Custom hooks for managing form inputs and handling state.
    - **Routes**: Configuration of React Router for navigation.
    - **Images**: Contains images used in the application.

- **Backend (Spring Boot)**:
    - **Controllers**: Spring MVC controllers for handling HTTP requests and responses.
    - **Models**: POJO classes representing entities like OrderData and Ingredient.
    - **Repositories**: Classes responsible for data access and manipulation.
    - **APIs**: RESTful APIs for managing orders, ingredients, and cookies.

- **Utilities**:
    - **HandleCookies**: Utilities for managing cookies in the web application.
    - **IngredientsApi**: API for retrieving pizza ingredients.
    - **Orders**: Classes for managing order-related operations.

---

## Usage

To run the Pizza Ordering System:

1. **Backend (Spring Boot)**:
    - Navigate to the backend directory.
    - Build the project using Maven:
      ```bash
      mvn clean install
      ```
    - Run the Spring Boot application:
      ```bash
      java -jar target/pizza-ordering-system.jar
      ```

2. **Frontend (React.js)**:
    - Navigate to the frontend directory.
    - Install dependencies:
      ```bash
      npm install
      ```
    - Start the development server:
      ```bash
      npm start
      ```

3. **Access the Application**:
    - Open a web browser and go to http://localhost:3000 to access the Pizza Ordering System.

4. **Using the Application**:
    - Navigate through different pages using the navigation links.
    - Customize pizzas, add them to the cart, and proceed to checkout.
    - Fill in the order details and place the order.
    - View order history and details.

**Note**: The backend API is hosted at http://localhost:8080.
