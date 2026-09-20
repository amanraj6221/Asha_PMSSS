# PMSSS Scholarship Portal (Asha_PMSSS) — Smart India Hackathon (SIH'24) 🎓

A modern, production-grade **Full-Stack MERN Application** engineered with **TypeScript**, rigid structural schema validations, real-time event streaming, and a decoupled architecture. Originally prototyped as a legacy PHP/MySQL app, this repository documents a complete architectural overhaul to eliminate administrative overhead, accelerate multi-tier document verification, and enforce strict type safety across all data pipelines.

---

## 🛠️ System Architecture & Engineering Stack

The platform is designed as a decoupled client-server architecture to optimize performance, scalability, and structural separation of concerns.

### Frontend Client Layer
* **Core Runtime Engine:** **React 18** bootstrapped via **Vite** with strict **TypeScript** configurations for robust compile-time safety.
* **Declarative Client Routing:** **React Router DOM** executing nested routing structures and role-based path authentication.
* **Data Fetching & Interceptors:** Asynchronous backend polling layers powered cleanly through configured **Axios** modules.
* **Form Submissions & Validation:** Structurally sound form parsing built by coupling **React Hook Form** with **Zod** to catch layout mismatches before network requests hit the server.
* **Real-Time Synchronous Gateway:** Persistent, bi-directional telemetry layers mapped over the native **Socket.IO Client**.
* **Modular Styling & Component System:** Styled via **Tailwind CSS** guidelines and managed efficiently through customizable utility frameworks (`components.json`).
* **Analytical Telemetry UI:** Dynamic system audit visualizers designed directly with **Recharts**.

### Backend Services & Database Infrastructure (`ashavriti-backend`)
* **Package Management & Script Engine:** Orchestrated over **Node.js** leveraging the high-speed **Bun** platform runtime engine (`bun.lockb`).
* **Web Server Framework:** **Express.js** handling custom API middleware routers, cross-origin communication policies, and endpoint handling hooks.
* **Persistent Database Tier:** **MongoDB** utilized to design schema properties optimized for concurrent tracking actions.
* **Automated Code Linting:** Unified code quality criteria configured modularly inside a modern configuration file (`eslint.config.js`).

---

## 🚀 Key Strategic Capabilities Deployed

* **Legacy Infrastructure Migration:** Successfully moved away from monolithic PHP code, refactoring features into independent client components and an agile API backend server (`ashavriti-backend`).
* **Automated Verification State Machine:** Programmed transactional state tracking handlers that eliminate manual document workflows by coordinating instant asynchronous data evaluations.
* **Secure Enterprise API Access:** Engineered clean external integration bindings for identity verification tasks (such as government Aadhaar e-KYC schemas) along with automated SMS and Gmail message dispatchers.
* **End-to-End Type Security:** Blocked potential invalid data submissions or parameters by strictly validating payloads over client-side schemas coupled with matching database rules.
* **Live Operations Tracking:** Configured real-time analytics dashboards that instantly broadcast administrative alerts over active WebSocket streams.

---

## 📂 Project Structure Directory

```text
├── ashavriti-backend/          # Node.js + Express API backend service & database models
├── public/                     # Static UI assets, baseline styling, and iconography
├── src/                        # Modular React frontend source folder
│   ├── assets/                 # Unified graphical assets
│   ├── components/             # Reusable modular UI building blocks
│   ├── hooks/                  # Custom async API and state observation tools
│   ├── pages/                  # Role-based workspace screens (Student/Admin layouts)
│   ├── utils/                  # Shared utility methods and Zod schema properties
│   ├── App.tsx                 # Core client router definitions
│   └── main.tsx                # Client application mounting and bootstrap file
├── .env                        # System variables blueprint file
├── Ashavriti.postman_collection# Pre-configured validation schema tests for API verification
├── components.json             # Asset path rules for style configurations
├── tailwind.config.ts          # Global design system theme variables and layouts
├── vite.config.ts              # TypeScript compilation pipeline setup instructions
└── package.json                # Frontend package scripts and dependencies
```

---

## ⚙️ Local Installation & Setup

### Technical System Requirements
* **Node.js** (LTS Version) or the **Bun** runtime engine installed locally.
* An active **MongoDB database** cluster instance (local daemon or MongoDB Atlas cloud connector).

### 1. Launching the Backend API Environment
```bash
cd ashavriti-backend
npm install   # Alternately: bun install
npm start     # Fires up the API microservice on the target local port
```

### 2. Launching the Frontend Asset Compiler
```bash
# Return to the primary application root directory
npm install   # Alternately: bun install
npm run dev   # Deploys the local Vite dev server with instant hot module replacement
```

---

## 📈 Quality Assurance & API Verification
To ensure seamless network requests, an extensive Postman workspace blueprint file (`Ashavriti.postman_collection.json`) is included in the project root folder. Importing this profile into your testing software allows you to instantly inspect routing definitions, request payloads, secure authorization headers, and parameter validation responses.
