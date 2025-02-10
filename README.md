# Event Ticket Booking System

## Introduction

This is a Node.js-based Event Ticket Booking System that allows users to book event tickets, manages a waiting list when tickets are sold out, and handles ticket cancellations with automatic reassignment.

The project follows Test-Driven Development (TDD) principles and ensures efficient handling of concurrency, error management, and data persistence.


---

## Features

✅ Initialize an event with a set number of tickets
✅ Concurrent ticket booking with race condition handling
✅ Automatic waiting list management for sold-out events
✅ Ticket cancellation with reassignment to waiting list users
✅ RESTful API with structured endpoints
✅ Persistent storage using an RDBMS (e.g., PostgreSQL, MySQL)
✅ Comprehensive error handling and logging
✅ Unit and integration tests


---

## Technologies Used

Node.js with Express.js – Backend framework

RDBMS (MySQL) – Persistent storage

Knex.js – Database migrations

Jest/Supertest – TDD and API testing



---

## API Endpoints

1️⃣ Initialize Event

Endpoint: POST /initialize
Description: Creates a new event with a specified number of tickets.
Request:

{
  "name": "Tech Conference 2025",
  "totalTickets": 100
}

Response:

{
  "eventId": 1,
  "name": "Tech Conference 2025",
  "availableTickets": 100
}

2️⃣ Book Ticket

Endpoint: POST /book
Description: Books a ticket for a user. If tickets are sold out, the user is added to a waiting list.
Request:

{
  "eventId": 1,
  "userEmail": "user1@gmail.com"
}

Response (if ticket is available):

{
  "message": "Ticket booked successfully",
}

Response (if sold out):

{
  "message": "Event sold out, you're added to the waiting list",
}

3️⃣ Cancel Booking

Endpoint: POST /cancel
Description: Cancels a booking. If a waiting list exists, the next user in line gets the ticket.
Request:

{
  "eventId": 1,
  "userEmail": "user1@gmail.com"
}

Response:

{
  "message": "Your booking has been cancelled successfully"
}

4️⃣ Get Event Status

Endpoint: GET /status/:eventId
Description: Retrieves the number of available tickets and waiting list count.
Response:

{
  "id": 1,
  "total_tickets": 10
  "available_tickets": 5,
}


---

## Installation & Setup

### Prerequisites

Node.js (v16+ recommended)

MySQL



Steps to Run Locally

1️⃣ Clone the repository:

git clone https://github.com/jgodwin10/Event-ticket-booking.git  
cd Event-ticket-booking

2️⃣ Install dependencies:

npm install

3️⃣ Set up the environment variables:

Copy .env.example.production to .env

Configure your database connection


4️⃣ Run database migrations:

npx knex migrate:latest

5️⃣ Start the server:

npm run dev

API will be available at http://localhost:5000.


---

## Running Tests

To run unit and integration tests:

npm test


---

## Design Decisions

Used Express.js for lightweight, scalable API development.

Implemented database migrations for schema evolution.

Applied Test-Driven Development (TDD) for reliability.

Handled race conditions using transaction locks.



---

