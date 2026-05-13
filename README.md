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

## How to Run

### 1. Setup Virtual Environment

Create Virtual Environment
```bash
python -m venv venv
```

Activate Virtual Environment
- Windows
  ```bash
  venv\Scripts\activate
  ```
- Mac/Linux
  ```bash
  source venv/bin/activate
  ```

### 2. Install Dependancies
```bash
pip install -r requirements.txt
```

### 3. Compile TypeScript

```bash
tsc --watch 
```

### 4. Start Backend

```bash
python backend/main.py
```

backend runs locally at:
http://127.0.0.1:8000 (or http://localhost:8000)

---

## Limitations

- Mouse wheel scrolling is unreliable during drag-and-drop interactions.
- Custom wheel handling will be added to improve scrolling behavior.
