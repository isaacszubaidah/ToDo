// Get tasks from localStorage 
const storedTasks = localStorage.getItem("tasks");
const taskList = storedTasks ? JSON.parse(storedTasks) : [];
const inputToAddTask = document.getElementById("inputToAddTask");
const addTaskItemButton = document.getElementById("addTaskItem");
const listContainer = document.getElementById("taskList");
const errorSpan = document.getElementById("error");
const sortButton = document.getElementById("sortButton");

//  Clear the error when the user types again
inputToAddTask.addEventListener("input", function () {
    errorSpan.innerText = ""; // Clear the error message when the user types
});

addTaskItemButton.addEventListener("click", addTaskItem);
sortButton.addEventListener("click", sortTasks); // Event listener for sort button

function addTaskItem() {
    const taskName = inputToAddTask.value.trim();
    if (isValidTask(taskName)) {
        const task = {
            id: generateId(),
            name: taskName.charAt(0).toUpperCase() + taskName.slice(1),
            createdDate: new Date().toLocaleDateString(),
            completed: false,
        };
        taskList.push(task);
        saveTasksToLocalStorage(); // Save tasks to localStorage after addition
        renderTasks();
        inputToAddTask.value = "";
    } else {
        errorSpan.innerText = "Please enter a valid task name!";
    }
}

///Check if task is valid
const isValidTask = (name) => {
    return name !== "" && name.length > 3;
}

/// Generate a new ID for every task so it is unique
const generateId = () => {
    return Math.random().toString(36);
}

/// Mark  task as complete and set Boolean of completed to true in  localStorage
function toggleTaskCompletion(id) {
    const task = taskList.find((task) => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasksToLocalStorage(); // Save tasks to localStorage after completion status change
        renderTasks();
    }
}

/// Remove task and remove from localStorage
function removeTask(id) {
    const tasks = taskList.findIndex((task) => task.id === id);
    if (tasks !== -1) {
        // Remove only one task from the given id being passed into the fuction
        taskList.splice(tasks, 1);
        saveTasksToLocalStorage(); // Save tasks to localStorage after task removal
        renderTasks();
    }
}

//  Save tasks to localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

// Sorting the tasks
let isSorted = false;

function sortTasks() {
    isSorted = !isSorted;
    if (isSorted) {
        taskList.sort((a, b) => (a.name > b.name ? 1 : -1)); // Sort alphabetically
    } else {
        taskList.sort((a, b) => (a.name < b.name ? 1 : -1)); //  reverse alphabetical order
    }
    renderTasks();
}

///Rending the task on the DOM so that user can see
function renderTasks() {
    const tasksHTML = taskList
        .map((task) => {
            let checkbox = `<input type="checkbox" ${task.completed ? "checked" : ""
                } onChange="toggleTaskCompletion('${task.id}')"/>`;
            let text = `<span class="${task.completed ? "completed" : ""} taskName">${task.name
                } - Created: ${task.createdDate}</span>`;
            let removeButton = `<button class="remoreItmeBtn" onclick="removeTask('${task.id}')">Remove</button>`;
            return `<div class="theTask">
      <div>${checkbox}${text}</div>
      <div>${removeButton}</div></div>`;
        })
        .join("");

    listContainer.innerHTML = tasksHTML;
}

// Initial render of tasks
renderTasks();