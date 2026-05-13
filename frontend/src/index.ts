async function loadTasks() {
    const res = await fetch("http://127.0.0.1:8000/tasks");
    const tasks = await res.json();

    toDoTaskZone.innerHTML = "";
    progressTaskZone.innerHTML = "";
    doneTaskZone.innerHTML = "";
    trashTaskZone.innerHTML = "";

    tasks.forEach((task: any) => {
        const box = createBox(task.text, task.id, task.color);
        box.id = task.id;

        if (task.status === "todo") {
            toDoTaskZone.appendChild(box);
        }
        else if (task.status === "progress") {
            progressTaskZone.appendChild(box);
        }
        else if (task.status === "done") {
            doneTaskZone.appendChild(box);
        }
        else if (task.status === "trash") {
            trashTaskZone.appendChild(box);
        }
    });

    updateTrashHint();
}

/* ---------------- DOM ZONES ---------------- */

const toDoTaskZone = document.querySelector("#to-do .task-zone") as HTMLElement;
const progressTaskZone = document.querySelector("#in-progress .task-zone") as HTMLElement;
const doneTaskZone = document.querySelector("#done .task-zone") as HTMLElement;
const trashTaskZone = document.querySelector("#trash-bin .task-zone") as HTMLElement;

const toDoZone = document.getElementById("to-do") as HTMLElement;
const progressZone = document.getElementById("in-progress") as HTMLElement;
const doneZone = document.getElementById("done") as HTMLElement;
const trashBin = document.getElementById("trash-bin") as HTMLElement;

const hint = document.querySelector(".trash-hint") as HTMLElement;

/* ---------------- TRASH HINT ---------------- */

function updateTrashHint() {
    const hasBoxes = trashTaskZone.children.length > 0;

    hint.style.display = hasBoxes ? "none" : "block";
}

/* ---------------- CREATE BOX ---------------- */

function createBox(text: string, id: string, color:string) {
    const box = document.createElement("div");
    const p = document.createElement("p");

    p.textContent = text;

    box.classList.add("box");
    box.draggable = true;
    box.appendChild(p);

    box.style.backgroundColor = color;

    box.addEventListener("dragstart", (e: DragEvent) => {
        e.dataTransfer?.setData("text/plain", box.id);
    });

    return box;
}

/* ---------------- DROP ZONES ---------------- */

function enableDropZone(zone: HTMLElement) {

    zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        zone.classList.add("drag-over");
    });

    zone.addEventListener("dragleave", () => {
        zone.classList.remove("drag-over");
    });

    zone.addEventListener("drop", async (e) => {
        e.preventDefault();
        zone.classList.remove("drag-over");

        const id = e.dataTransfer?.getData("text/plain");
        if (!id) return;

        const newStatus = zone.dataset.status;                 

        console.log("DROP RESULT:", { id, newStatus });

        await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });

        await loadTasks();
    });
}

/* ---------------- INIT ZONES ---------------- */

enableDropZone(toDoZone);
enableDropZone(progressZone);
enableDropZone(doneZone);
enableDropZone(trashBin);

/* ---------------- ADD TASK ---------------- */

const addButton = document.getElementById("add-button") as HTMLButtonElement;

addButton.addEventListener("click", async () => {
    const taskName = prompt("Enter task");
    if (!taskName) return;

    const task = {
        id: "box-" + Date.now(),
        text: taskName,
        status: "todo"
    };

    await fetch("http://127.0.0.1:8000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });

    loadTasks();
});

/* ---------------- DELETE TRASH ---------------- */

const deleteButton = document.getElementById("delete-button") as HTMLButtonElement;

deleteButton.addEventListener("click", async () => {
    await fetch("http://127.0.0.1:8000/tasks", {
        method: "DELETE"
    });

    await loadTasks();
});

/* ---------------- INIT ---------------- */

loadTasks();