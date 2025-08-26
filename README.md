# 🎫 Real-Time Event Ticketing System

An **end-to-end ticketing platform** combining a **Spring Boot backend**, a **React frontend**, and a **Java CLI**, designed to simulate and manage real-time ticket booking, releasing, and monitoring.

---

## 📂 Project Structure

```
REAL-TIME-EVENT-TICKETING-SYSTEM-MAIN/
│
├── Backend/                      # Spring Boot backend (REST API + MongoDB)
│   ├── Ticketing-System/
│   │   └── src/main/java/com/example/TicketingSystem/
│   │       ├── controller/       # REST Controllers
│   │       ├── model/            # Domain models (Ticket, TicketingLog, etc.)
│   │       ├── repository/       # Spring Data MongoDB Repositories
│   │       ├── service/          # Business logic
│   │       ├── thread/           # Customer & Vendor simulation
│   │       └── utils/            # Helpers (TicketIdGenerator)
│   ├── src/main/resources/application.properties
│   ├── pom.xml
│   └── Dockerfile
│
├── CLI/                          # Java CLI Simulation
│   └── src/
│       ├── Main.java
│       ├── Customer.java
│       ├── Vendor.java
│       ├── Ticket.java
│       ├── TicketPool.java
│       ├── TicketIdGenerator.java
│       └── ticket_details.txt
│
├── Frontend/                     # React Frontend
│   ├── src/
│   │   ├── components/           # UI Components (forms, charts, logs, etc.)
│   │   ├── services/             # API integration (Axios)
│   │   ├── styles/               # CSS (theme + layouts)
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
│
├── docker-compose.yml            # Orchestration file
└── README.md                     # Documentation
```

---

## 🌟 Features

### Backend (Spring Boot + MongoDB)

- RESTful APIs for tickets & logs
- Thread-safe ticket allocation
- MongoDB persistence
- Swagger/OpenAPI for API docs

### Frontend (React + Recharts + Axios)

- Responsive dashboard
- Configuration forms
- Real-time transaction logs
- Ticket progress bar & charts

### CLI (Java)

- Console simulation of Vendors & Customers
- Multi-threaded concurrency
- Logs written to `ticket_details.txt`

### Dockerized Deployment

- Backend, Frontend, and MongoDB services in containers
- One-command startup with Docker Compose

---

## 🚀 Installation Guide

### Prerequisites

- **Java** 17+
- **Maven** 3.9+
- **Node.js** ≥ 18.x & **npm**
- **MongoDB** (local or containerized)
- **Docker** & **Docker Compose** (for containerized setup)

> Default ports:
>
> - Backend → `http://localhost:8081`
> - Frontend → `http://localhost:3000`
> - MongoDB → `mongodb://localhost:27017/ticketing_db`

---

## 🧭 Running Locally (Without Docker)

### 1) Backend

```bash
cd Backend/Ticketing-System
mvn spring-boot:run
```

Backend → [http://localhost:8081](http://localhost:8081)

### 2) Frontend

```bash
cd Frontend
npm install
npm start
```

Frontend → [http://localhost:3000](http://localhost:3000)

### 3) CLI

```bash
cd CLI/src
javac Main.java
java Main
```

---

## 🐳 Running with Docker Compose

```bash
docker-compose up --build
```

- Frontend → [http://localhost:3000](http://localhost:3000)
- Backend → [http://localhost:8081](http://localhost:8081)
- MongoDB → `mongodb://localhost:27017/ticketing_db`

> To stop and remove containers:

```bash
docker-compose down
```

---

## 🖥️ Usage Instructions

### 1) Configure the System

1. Open the frontend: [http://localhost:3000](http://localhost:3000)
2. Enter:
   - **Total Tickets**
   - **Ticket Release Rate**
   - **Customer Retrieval Rate**
   - **Maximum Ticket Capacity**
3. Click **Submit**

### 2) Add Vendors & Customers

Use the **Vendor & Customer Manager** panel and add:

- **Vendors**
- **Standard Customers**
- **VIP Customers**

### 3) Start the System

- Click **Start**
- Vendors begin releasing tickets at the configured rate
- Customers begin retrieving tickets
- Logs and progress update in real time

### 4) Stop the System

- Click **Stop**
- The transaction log records the stop event

### 5) View Logs

- Transaction logs appear on the right panel
- Use **Clear Logs** to empty the visible log list

---
<video controls src="Video Demo - Made with Clipchamp-1.mp4" title="Title"></video>

## 📊 Performance

- Multi-threaded vendors & customers
- Ticket pool concurrency using **ReentrantLocks** & **Conditions**
- Optimized MongoDB queries

---

## 🔒 Security

- Unique ticket IDs
- Thread-safe ticket pool
- Input validation
- CORS-enabled APIs

---

---

## ⚙️ Configuration Notes

- `Backend/src/main/resources/application.properties` should define MongoDB connection (e.g., `spring.data.mongodb.uri` and database name).
- The frontend `services` layer uses Axios; ensure the base URL matches your backend port.
- `docker-compose.yml` should map the backend and frontend ports and create a MongoDB service/volume for persistence.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🎓 Academic Context

Developed as part of the **Object-Oriented Programming Coursework** — *University of Westminster*.

