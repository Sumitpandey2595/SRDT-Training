
// Get saved projects and tasks from browser storage

let projects = JSON.parse(localStorage.getItem("campusProjects")) || [];

let tasks = JSON.parse(localStorage.getItem("campusTasks")) || [];

// Save data in browser storage

function saveData() {
    localStorage.setItem("campusProjects", JSON.stringify(projects));
    localStorage.setItem("campusTasks", JSON.stringify(tasks));
}

// Display projects

function displayProjects() {
    let projectList = document.getElementById("projectList");

    projectList.innerHTML = "";

    projects.forEach(function(project) {
        projectList.innerHTML += `
            <div class="project-card">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <button class="delete-button"
                    onclick="deleteProject(${project.id})">
                    Delete
                </button>
            </div>
        `;
    });

    updateDashboard();
}

// Add a new project

document.getElementById("projectForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("projectName").value;
    let description = document.getElementById("projectDescription").value;

    let newProject = {
        id: Date.now(),
        name: name,
        description: description
    };

    projects.push(newProject);

    saveData();
    displayProjects();

    document.getElementById("projectForm").reset();
});

// Delete a project

function deleteProject(id) {
    projects = projects.filter(function(project) {
        return project.id !== id;
    });

    saveData();
    displayProjects();
}

// Display tasks

function displayTasks() {
    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        taskList.innerHTML += `
            <tr>
                <td>${task.name}</td>
                <td>${task.deadline}</td>
                <td>
                    <select onchange="changeStatus(${task.id}, this.value)">
                        <option value="Pending" ${task.status === "Pending" ? "selected" : ""}>Pending</option>
                        <option value="In Progress" ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
                        <option value="Completed" ${task.status === "Completed" ? "selected" : ""}>Completed</option>
                    </select>
                </td>
                <td>
                    <button class="delete-button"
                        onclick="deleteTask(${task.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

    updateDashboard();
}

// Add a new task

document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("taskName").value;
    let deadline = document.getElementById("taskDeadline").value;

    let newTask = {
        id: Date.now(),
        name: name,
        deadline: deadline,
        status: "Pending"
    };

    tasks.push(newTask);

    saveData();
    displayTasks();

    document.getElementById("taskForm").reset();
});

// Change task status

function changeStatus(id, newStatus) {
    tasks.forEach(function(task) {
        if (task.id === id) {
            task.status = newStatus;
        }
    });

    saveData();
    updateDashboard();
}

// Delete a task

function deleteTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    saveData();
    displayTasks();
}

// Update dashboard numbers

function updateDashboard() {
    document.getElementById("projectCount").textContent = projects.length;

    document.getElementById("taskCount").textContent = tasks.length;

    let completed = tasks.filter(function(task) {
        return task.status === "Completed";
    }).length;

    let pending = tasks.filter(function(task) {
        return task.status === "Pending";
    }).length;

    document.getElementById("completedCount").textContent = completed;

    document.getElementById("pendingCount").textContent = pending;
}

// Load saved data when website opens

displayProjects();
displayTasks();
updateDashboard();
