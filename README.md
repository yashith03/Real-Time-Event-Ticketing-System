# Real-Time Event Ticketing System

## 🎫 Project Overview

The **Real-Time Event Ticketing System** is an innovative, multi-component application designed to optimize event ticket management through advanced technology and user-focused design.

## 🌟 Key Features

- **Real-time ticket allocation** with concurrent user handling.
- **Multi-threaded processing** for performance optimization.
- **Microservices architecture** ensuring modularity and scalability.
- **Secure and unique ticket ID generation** for authenticity.
- **Cross-platform accessibility** through CLI and a responsive web frontend.

## 🏗️ System Architecture

The system consists of three primary components:

### 1. Backend (Spring Boot)

- **Framework:** Spring Boot
- **Database:** MongoDB
- **Responsibilities:**
  - Manages business logic and RESTful API services.
  - Ensures secure and concurrent ticket processing.
  - Handles data persistence efficiently.

#### Core Backend Components:

- `TicketingSystemProjectApplication` – Main application entry point.
- `TicketService` – Ticket management logic.
- `TicketRepository` – Database interaction.
- `TicketingLogController` – API endpoints.
- Multi-threading support through `Customer` and `Vendor` classes.

### 2. Command-Line Interface (CLI)

- **Lightweight text-based interaction** for direct ticket management.
- **Supports core functionalities:**
  - Ticket booking
  - Event management
  - Booking status tracking

#### CLI Core Components:

- `Main.java` – Application entry point.
- `Customer.java` – Handles customer operations.
- `Vendor.java` – Manages vendor interactions.
- `TicketPool.java` – Allocates tickets efficiently.

### 3. Frontend (React.js)

- **Modern, responsive user interface** with interactive elements.
- **Real-time data visualization** for better user engagement.
- **Dynamic UI components** enhancing user experience.

#### Frontend Core Components:

- `App.js` – Main application component.
- `VendorCustomerManager.jsx` – User management.
- `ConfigurationForm.jsx` – System settings.
- `LineChart.jsx` – Data visualization.
- `LogDisplay.jsx` – Transaction logging.

## 🚀 Installation Guide

### Prerequisites

- Java Development Kit (JDK) 11+
- Node.js & npm
- MongoDB
- Maven

### Setup Instructions

#### Clone the Repository:

```bash
git clone https://github.com/your-username/real-time-ticketing-system.git
cd real-time-ticketing-system
```

#### Backend Setup:

```bash
cd Backend/Ticketing-System
mvn clean install
mvn spring-boot:run
```

#### Frontend Setup:

```bash
cd Frontend
npm install
npm start
```

#### CLI Setup:

```bash
cd CLI
javac Main.java
java Main
```

## 🔧 Configuration

### Backend Configuration

- Set up MongoDB connection in `application.properties`.
- Adjust thread pool settings in `application.yml`.

### Frontend Configuration

- Modify API endpoints in `ticketingService.js`.
- Customize UI components as needed.

## 📊 Performance Optimization

- **Multi-threaded processing** for high-performance ticketing.
- **Efficient MongoDB queries** to enhance database response time.
- **Minimal latency design** ensuring seamless user experience.

## 🔒 Security Considerations

- **Secure ticket ID generation** to prevent duplication.
- **Concurrent access protection** ensuring data integrity.
- **MongoDB encryption** securing sensitive data.
- **Input validation** to prevent security vulnerabilities.

## 🧪 Testing Strategy

### Backend Tests:

- Unit tests for services.
- Integration tests for repositories.
- Concurrency scenario testing.

### Frontend Tests:

- Component rendering tests.
- User interaction simulations.
- API call mocking.

## 📝 Logging and Monitoring

- **Comprehensive transaction logging** for transparency.
- **Real-time event tracking** for analytics.
- **Performance metric collection** to optimize efficiency.

## 🤝 Contributing

Want to contribute? Follow these steps:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to your branch.
5. Create a Pull Request.

## 📜 License

This project is licensed under the **[Specify License Here]**.

##

---

### Developed as part of the **Object-Oriented Programming Coursework** at the University of Westminster.



