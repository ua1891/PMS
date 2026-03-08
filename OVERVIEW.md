# TrackFlow Project Overview

## What is TrackFlow?

TrackFlow is an automated notification and tracking system designed for vendors using **TCS Courier Services**. It bridge the gap between courier status updates and vendor awareness by providing a real-time dashboard and automated email alerts for significant shipment events (e.g., Deliveries, Returns, Delays).

## How It Works

TrackFlow operates using a **Three-Layer Architecture**:

### 1. The Backend Engine (Node.js + Express)
The heart of the system is the backend server, which manages data and orchestrates automated tasks:
- **TCS Integration Service**: Handles OAuth 2.0 authentication with TCS APIs and fetches dynamic tracking details for consignments.
- **Automated Poller (Cron Job)**: A background service that runs every 5 minutes. It identifies active (non-delivered/non-returned) orders and checks their status via the TCS API.
- **State Machine**: Analyzes status transitions (e.g., `Pending` -> `Delivered`). If a significant change is detected, it updates the database, creates a system alert, and triggers an email.
- **Email Service (Nodemailer)**: Sends formatted HTML alerts to the vendor's email address when status changes occur.

### 2. The Persistence Layer (Prisma + SQLite)
All data is stored in a lightweight SQLite database, managed through Prisma ORM:
- **Orders Table**: Stores tracking numbers, customer details, and current status.
- **Alerts Table**: Keeps a history of all significant status changes and notifications sent.

### 3. The Frontend Dashboard (React + Vite)
A modern, glassmorphic UI that provides a high-level view of operations:
- **Metrics Bar**: Real-time counts of active orders, today's deliveries, returns, and shipments ready for pickup.
- **Visual Analytics**: A dynamic line chart showing order trends over the last 7 days.
- **Order Management**: A sortable and filterable list of all consignments in the system.
- **Alert Feed**: A smart visual feed showing the latest automated notifications.

## Key Workflows

### Order Lifecycle
1. **Creation**: When an order is added, the system verifies the tracking number with TCS and pulls consignee details automatically.
2. **Monitoring**: The Cron job periodically tracks the order.
3. **Alerting**: If the status becomes `Delivered`, `Returned`, or `Delayed`, an alert is generated and an email is sent.
4. **Completion**: Once an order reaches a terminal state (`Delivered` or `Returned`), it is moved out of the active tracking queue.

## Tech Stack
- **Frontend**: React, Vite, Lucide React (Icons), Recharts (Charts).
- **Backend**: Node.js, Express, Prisma.
- **Database**: SQLite.
- **Automation**: Node-Cron (Scheduling), Axios (API Requests), Nodemailer (Email).
