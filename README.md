# Task Board App

A simple full-stack task management app with drag-and-drop functionality.

Built using:
- FastAPI (Backend)
- TypeScript (Frontend logic)
- HTML/CSS (UI)
- SQLite (Database)

---

## Features

- Create tasks
- Move tasks between columns (To Do, In Progress, Done, Trash)
- Drag and drop interface
- Persistent storage using SQLite

---

## Project Structure

```
project/
│
├── backend/
|  ├── venv/
│  ├── main.py
│  ├── models.py
│  ├── database.py
│  └── tasks.db
│
├── frontend/
│  ├── dist/
│  │  └── index.js
│  │
│  ├── public/
│  │  └── index.html
│  │  
│  ├── src/
│  │  ├── index.ts
│  │  └── style.css
│  │ 
│  ├── package.json
│  └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

## How It Works

Frontend (TypeScript) sends requests to FastAPI backend.

FastAPI handles:
- Creating tasks
- Updating task status
- Deleting tasks

All data is stored in SQLite (tasks.db).

---

## API Endpoints

- GET / → Loads frontend
- GET /tasks → Get all tasks
- POST /tasks → Create task
- PUT /tasks/{id} → Update task
- DELETE /tasks/{id} → Delete task

--- 

## Data Flow

User Action (drag/drop task)
1. Frontend (TypeScript)
2. Fetch request
3. FastAPI backend
4. SQLite database update
5. Response sent back to frontend
6. UI updates

---

## How To Run Project

### 1. Backend Setup

- Install Virtual Environment
  ```bash
  python -m venv venv
  ```
- Activate Virtual Environment
  Windows
  ```bash
  venv\Scripts\activate
  ```
  Mac/Linux
  ```bash
  source venv\bin\activate
  ```
- Install Dependencies
  ```bash
  pip install -r requirements.txt
  ```
- Run Backend
  ```bash
  uvicorn main:app --reload
  ```

### 2. Frontend Setup

- Install Dependencies
  ```bash
  npm install
  ```
- Compile TypeScript
  ```bash
  npm run build
  ```

## Limitations

- Mouse wheel scrolling is unreliable during drag-and-drop interactions.
- Custom wheel handling will be added to improve scrolling behavior.
