# 🚀 Node.js Fundamentals Challenge: Tasks Manager

A robust and minimalistic **Tasks Manager** application built with **Node.js** and **TypeScript** — with no frameworks involved. Designed to demonstrate core Node.js concepts like custom routing, middleware, file streaming, and in-memory JSON persistence.

---

## ✨ Features

- ✅ Basic CRUD operations (Create, Read, Update, Delete)
- ✅ Mark tasks as complete (toggle)
- 📥 Bulk upload tasks via CSV file (with import script)
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

### ✅ Mark Task as Complete (Toggle)

```
PATCH /tasks/:id/complete
```

- If the task is incomplete, it will be marked as complete.
- If the task is already complete, it will be marked as incomplete.

---

### ❌ Delete Task

```
DELETE /tasks/:id
```

---

## 📤 Bulk Upload Tasks (CSV)

You can import multiple tasks at once using a CSV file and the provided import script.

- **CSV file:** [`src/streams/tasks.csv`](src/streams/tasks.csv)
- **Script:** [`src/streams/import-csv.ts`](src/streams/import-csv.ts)

### 📥 How to Import Tasks from CSV

1. Make sure your server is running (`npm run dev` or `npm start`).
2. Edit `src/streams/tasks.csv` to add your tasks (see format below).
3. In a new terminal, run:
   ```bash
   npx tsx src/streams/import-csv.ts
   ```
   This will POST each row as a new task to your running server.

**CSV Format:**

```csv
title,description
Task 1,Description 1
Task 2,Description 2
...etc
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
│   ├── middlewares/         # Custom middleware
│   ├── routes.ts            # API route handlers
│   ├── streams/             # CSV import script & tasks.csv
│   │   ├── import-csv.ts    # CSV import script
│   │   └── tasks.csv        # CSV data for import
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   └── server.ts            # Application entry point
└── package.json
```

---

## 📝 Notes

- Data is saved to `db.json` in the project root.
- This project does **not** include authentication.
- No third-party frameworks or libraries.
- You can customize the upload file by editing `src/streams/tasks.csv`.
- To import tasks, use the import script as described above.

---

## 📄 License

Licensed under [ISC](LICENSE)

---

## 👨‍💻 Author

**Ivan Lucci**
