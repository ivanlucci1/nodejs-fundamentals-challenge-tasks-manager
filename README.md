# 🚀 Node.js Fundamentals Challenge: Tasks Manager

A robust and minimalistic **Tasks Manager** application built with **Node.js** and **TypeScript** — with no frameworks involved. Designed to demonstrate core Node.js concepts like custom routing, middleware, file streaming, and in-memory JSON persistence.

---

## ✨ Features

- ✅ Basic CRUD operations (Create, Read, Update, Delete)
- ✅ Mark tasks as complete
- 📥 Bulk upload tasks via CSV file
- 🔍 Search tasks by title or description
- 💾 JSON-based in-memory database
- 🧱 Built only with Node.js core modules + TypeScript (no frameworks)

---

## ⚙️ Getting Started

### 📋 Prerequisites

- [Node.js](https://nodejs.org/) **v18+**
- [npm](https://www.npmjs.com/) **v8+**

### 📦 Installation

```bash
npm install
```

### 🧪 Run the App

- **Development (with hot reload):**

  ```bash
  npm run dev
  ```

- **Production:**
  ```bash
  npm start
  ```

🔗 App available at: [http://localhost:3333](http://localhost:3333)

---

## 📡 API Endpoints

### 📌 Create Task

```
POST /tasks
```

**Body:**

```json
{
	"title": "Task title",
	"description": "Task description"
}
```

---

### 📋 List Tasks

```
GET /tasks?search=keyword
```

**Response:**

```json
[
	{
		"id": "uuid",
		"title": "...",
		"description": "...",
		"completed_at": null,
		"created_at": "...",
		"updated_at": "..."
	}
]
```

---

### ✏️ Update Task

```
PUT /tasks/:id
```

**Body:** _(at least one field required)_

```json
{
	"title": "New title",
	"description": "New description"
}
```

---

### ✅ Mark Task as Complete

```
PATCH /tasks/:id/complete
```

---

### ❌ Delete Task

```
DELETE /tasks/:id
```

---

### 📤 Bulk Upload Tasks (CSV)

```
POST /tasks/upload
```

- Reads file from `src/data/example-tasks.csv`
- **CSV Format:**

```csv
title,description
Task 1,Description 1
Task 2,Description 2
```

---

## 🧩 Data Model

```ts
{
	id: string;
	title: string;
	description: string;
	completed_at: Date | null;
	created_at: Date;
	updated_at: Date;
}
```

---

## 📁 Project Structure

```
nodejs-fundamentals-challenge_tasks-manager/
├── db.json                  # Persistent data file
├── src/
│   ├── data/                # Sample CSV data
│   ├── middlewares/        # Custom middleware
│   ├── routes/             # API route handlers
│   ├── streams/            # File stream utilities
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── index.ts            # Application entry point
└── package.json
```

---

## 🗂 Example CSV Upload

Sample file: [`src/data/example-tasks.csv`](src/data/example-tasks.csv)

```csv
title,description
Code Review,Review pull requests and provide feedback.
Sprint Planning,Prepare next sprint agenda and breakdown.
...
```

---

## 📝 Notes

- Data is saved to `db.json` in the project root.
- This project does **not** include authentication.
- No third-party frameworks or libraries.
- You can customize the upload file by editing `src/data/example-tasks.csv`.

---

## 📄 License

Licensed under [ISC](LICENSE)

---

## 👨‍💻 Author

**Ivan Lucci**
