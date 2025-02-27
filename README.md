# Real-Time Event Ticketing System

This repository contains the implementation of the **Real-Time Event Ticketing System**, a project developed as part of the 2nd-year Object-Oriented Programming (OOP) coursework at the University of Westminster. This system provides seamless functionality for managing event ticketing operations with a focus on scalability, reliability, and efficiency.

## Project Components

The project is divided into three main components:

### 1. Command-Line Interface (CLI)
The CLI provides basic interactions with the system, allowing users to perform operations such as booking tickets, viewing available events, and checking booking statuses directly from the command line.

**Features:**
- User-friendly text-based interface.
- Support for core functionalities such as adding events and managing bookings.
- Easy-to-use commands for efficient navigation.

### 2. Backend
The backend forms the core of the application, built using **Spring Boot** for a robust and scalable architecture. It handles all business logic, data persistence, and API management.

**Key Technologies:**
- **Spring Boot:** Framework for creating RESTful APIs and managing application logic.
- **MongoDB:** NoSQL database for storing and managing event and user data.
- **Multi-threading:** Applied OOP concepts for efficient handling of concurrent operations.

**Features:**
- RESTful API endpoints for ticketing operations.
- Real-time data management and event handling.
- Secure and reliable data storage.

### 3. Frontend
The frontend is built using **React js**, offering an intuitive and interactive user experience for end-users. It connects to the backend to retrieve and display data dynamically.

**Key Features:**
- Modern user interface for browsing events and managing tickets.
- Responsive design ensuring compatibility across devices.
- Real-time updates for event and booking statuses.

## Installation and Setup

### Prerequisites
Ensure the following software is installed:
- **Java Development Kit (JDK) 11 or later**
- **Node.js and npm**
- **MongoDB**

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/real-time-ticketing-system.git
   cd real-time-ticketing-system
   ```
2. Setup the backend:
   - Navigate to the backend directory.
   - Configure the MongoDB connection in `application.properties`.
   - Run the Spring Boot application:
     ```bash
     ./mvnw spring-boot:run
     ```
3. Setup the frontend:
   - Navigate to the frontend directory.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the Angular development server:
     ```bash
     ng serve
     ```
4. Run the CLI:
   - Navigate to the CLI directory.
   - Compile and run the program:
     ```bash
     javac Main.java
     java Main
     ```

## Features and Functionality
- Event Management: Add, update, and delete events.
- Ticket Booking: Real-time booking and availability checks.
- User Authentication: Secure login and registration (backend support).
- Multi-threading: Ensures fast and concurrent ticket processing.

## Contribution
Contributions are welcome! Please fork the repository and create a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments
- University of Westminster for guidance and resources.
- Mentors and peers for their support throughout the coursework.

---

Developed by: **Yashith Chandeepa**
