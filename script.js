let taskList = JSON.parse(localStorage.getItem('taskList')) || [];

function updateCounter() {
  const counter = document.getElementById("counter");
  counter.textContent = taskList.filter(task => !task.completed).length;
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const errorElement = document.getElementById("error");  // Store this in a variable for easier reference
    const taskText = taskInput.value.trim();
    
    // Validation
    if(taskText === '' || taskText.length < 3) {
      errorElement.innerText = "Invalid task input";
      errorElement.className = "error-message";  // Add the error-message class
      taskInput.style.boxShadow = 'inset 0 -3px 0 0 red';
      return;
    }
    
    taskInput.style.boxShadow = 'inset 0 -3px 0 0 #A683E3';
    errorElement.innerText = '';
    errorElement.className = '';  // Clear the error-message class
    
    const task = {
      text: taskText,
      completed: false
    };
  
    taskList.push(task);
    localStorage.setItem('taskList', JSON.stringify(taskList));
  
    renderTasks();
    taskInput.value = '';
  }
  

function toggleCompletion(index) {
  taskList[index].completed = !taskList[index].completed;
  localStorage.setItem('taskList', JSON.stringify(taskList));
  renderTasks();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  localStorage.setItem('taskList', JSON.stringify(taskList));
  renderTasks();
}

function renderTasks() {
    const taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = '';
  
    taskList.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "item";
      li.innerHTML = `
        <input type="checkbox" id="task${index}" ${task.completed ? 'checked' : ''} onclick="toggleCompletion(${index})">
        <p>${task.text}</p>
        <button class="delete-button" onclick="deleteTask(${index})">-</button>
      `;
      taskListElement.appendChild(li);
    });
    
    updateCounter();
  }
  

// Initialize
window.onload = () => {
  renderTasks();
  updateCounter();
};
