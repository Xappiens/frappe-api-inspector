# 🚀 Frappe & ERPNext DocType Inspector

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Frappe](https://img.shields.io/badge/Frappe-ERPNext-orange)
![Author](https://img.shields.io/badge/Author-Javier_Rodriguez_Fernandez-blueviolet)

A powerful and intelligent **Single Page Application (SPA)** designed to interact with Frappe/ERPNext REST APIs. It greatly simplifies the workflow for developers and consultants by allowing them to inspect `DocType` structures, generate JSON payloads for integrations, run automated API tests, and capture Webhooks locally.

## 🌟 Key Features

1. **Smart Permission Scanner**: Even if your server blocks direct API Schema queries for regular users, the application utilizes a brute-force scanner based on UI Workspaces and a comprehensive ERPNext dictionary to precisely extract only the DocTypes you have explicit read permissions for—100% automatic and "Admin-Free".
2. **Deep Schema Inspection**: Explore mandatory fields, hidden properties, and Select/Link options of any core or custom document directly, without relying on the official Frappe desk frontend.
3. **Schema Diff Visualizer**: Take local "Snapshots" of a DocType's current structure. Modify your server (or switch to a DEV environment) and easily spot added, modified, or removed fields visually using the integrated Diffing tool.
4. **Automated API Test Runner**: Build your own suite of manual tests (GET, POST, PUT, DELETE) against the Frappe API, verify results with a single click, and seamlessly ensure mandatory field payloads are accepted.
5. **JSON Payload Generator**: Instant "Copy Payload" button that generates the exact mandatory data structure, ready to be pasted into Postman, Bruno, or external integration backends.
6. **Local Webhook Listener**: The application features a dedicated NodeJS proxy scanner listening at `localhost:3000/api/webhook-listener`. Configure Frappe to send events to this endpoint and instantly debug incoming payloads in real-time through the Webhooks UI.
7. **Light / Dark Theme**: Eye-friendly development interface with a 🌛 / 🌞 toggle.
8. **Global Search (Ctrl+K / Cmd+K)**: Instantly search and access any locally cached DocType property via a VS Code style omnibar.

## ⚙️ Technologies

- **Frontend:** Vanilla JavaScript, Tailwind CSS, HTML5. Engineered for sub-millisecond rendering without bulky framework overhead.
- **Proxy/Backend:** NodeJS, Express, HTTP-Proxy-Middleware (used exclusively to bypass Frappe CORS policies natively and catch incoming webhooks).

---

## 🛠️ Installation & Usage

Make sure you have [Node.js v14 or higher](https://nodejs.org/) installed on your machine.

1. Clone the repository:
   ```bash
   git clone https://github.com/Xappiens/frappe-api-inspector.git
   cd frappe-api-inspector
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Start the local proxy server:
   ```bash
   npm start
   ```
   *(Hint: On Windows, you can effortlessly double-click `start.bat`)*

4. The web application will launch automatically at **[http://localhost:3500](http://localhost:3500)**. 

---

## 🔐 Frappe API Key Configuration

To connect the Inspector to your Frappe ERP:
1. Log in to your company's Frappe/ERPNext portal normally.
2. Navigate to your User Profile (`My Settings`).
3. Generate new **API Key** and **API Secret**.
4. Paste your credentials and your instance's base URL (e.g., `https://erp.yourcompany.com`) into the tool's connection sidebar.

---

## 👨‍💻 Author

Designed and developed with ♥ by **Javier Rodriguez Fernandez**.
