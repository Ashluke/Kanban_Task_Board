from fastapi import FastAPI, Depends
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
import uvicorn
import random

from database import SessionLocal, Base, engine
import models

# ---------------- DATABASE INIT ----------------
Base.metadata.create_all(bind=engine)

# ---------------- APP SETUP ----------------
app = FastAPI()

app.mount("/static", StaticFiles(directory="frontend"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- DB DEPENDENCY ----------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- UTILS ----------------
def get_random_color():
    r = random.randint(180, 255)
    g = random.randint(180, 255)
    b = random.randint(180, 255)
    return f"rgb({r}, {g}, {b})"

# ---------------- ROUTES ----------------

@app.get("/")
def dashboard():
    return FileResponse("frontend/public/index.html")


# Get all tasks
@app.get("/tasks")
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(models.Task).all()
    return [
        {
            "id": t.id,
            "text": t.text,
            "status": t.status,
            "color": t.color
        }
        for t in tasks
    ]


# Create new task
@app.post("/tasks")
def create_task(task: dict, db: Session = Depends(get_db)):
    new_task = models.Task(
        id=task["id"],
        text=task["text"],
        status=task.get("status", "todo"),
        color=task.get("color", get_random_color())
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return {
        "id": new_task.id,
        "text": new_task.text,
        "status": new_task.status,
        "color": new_task.color
    }


# Update task status (drag & drop)
@app.put("/tasks/{taskId}")
def update_task(taskId: str, data: dict, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == taskId).first()

    if not task:
        return {"error": "not found"}

    if "status" in data:
        task.status = data["status"]

    db.commit()

    return {
        "id": task.id,
        "text": task.text,
        "status": task.status,
        "color": task.color
    }


# Delete all trashed tasks
@app.delete("/tasks")
def delete_trash(db: Session = Depends(get_db)):
    deleted = db.query(models.Task).filter(models.Task.status == "trash").delete()
    db.commit()
    return {"deleted": deleted}


# ---------------- RUN SERVER ----------------
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)