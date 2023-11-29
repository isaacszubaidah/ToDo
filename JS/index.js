document.addEventListener('DOMContentLoaded', function () {
    const addBtn = document.getElementById('addBtn');
    const taskInput = document.getElementById('value1');
    const taskList = document.getElementById('taskList');

    addBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const newTask = document.createElement('li');
            newTask.style.listStyle = 'none'; // Remove default bullet point style

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

            const taskLabel = document.createElement('label');
            taskLabel.textContent = taskText;

            newTask.appendChild(checkbox);
            newTask.appendChild(taskLabel);
            taskList.appendChild(newTask);
            taskInput.value = '';
        } else {
            alert('Please enter a task!');
        }
    });
});



