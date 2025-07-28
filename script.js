// script.js
let tasks = [];

function addTask() {
  const title = document.getElementById("taskTitle").value;
  const dueDate = document.getElementById("dueDate").value;
  const estimateTime = document.getElementById("estimateTime").value;

  if (!title || !dueDate || !estimateTime) {
    alert("Please fill all fields");
    return;
  }

  tasks.push({
    title,
    dueDate,
    estimateTime: Number(estimateTime),
    completed: false,
    priority: null
  });

  renderTasks();
  document.getElementById("taskTitle").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("estimateTime").value = "";
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    let priorityClass = "";
    if (task.priority === "high") priorityClass = "priority-high";
    if (task.priority === "medium") priorityClass = "priority-medium";
    if (task.priority === "low") priorityClass = "priority-low";

    li.innerHTML = `
      <div>
        <strong>${task.title}</strong> 
        <span>📅 ${task.dueDate}</span>
        <span>⏱️ ${task.estimateTime}h</span>
        <span class="${priorityClass}">${task.priority ? `⭐ ${task.priority}` : ""}</span>
      </div>
      <div>
        <button onclick="toggleComplete(${index})">✔️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function suggestPriority() {
  const today = new Date();

  tasks.forEach(task => {
    const due = new Date(task.dueDate);
    const diff = (due - today) / (1000 * 60 * 60 * 24); // days left

    if (diff <= 1 || task.estimateTime >= 5) {
      task.priority = "high";
    } else if (diff <= 3 || task.estimateTime >= 3) {
      task.priority = "medium";
    } else {
      task.priority = "low";
    }
  });

  renderTasks();
}
