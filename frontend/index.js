const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const errorMessage = document.getElementById("error-message");

function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.style.display =
    navLinks.style.display === "block" ? "none" : "block";
}

// Function to close the navigation menu on small screens
function closeNavMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.style.display = "none";
}

// Add event listeners to each navigation link
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach((link) => {
  link.addEventListener("click", closeNavMenu);
});

// Function to fetch tasks and update the task list
function fetchTasks() {
  fetch("http://localhost:4000/api/v1/all")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      taskList.innerHTML = ""; // Clear existing list
      data.users.forEach((user) => {
        console.log(user.task);
        if (user) {
          appendTaskToList(user);
        }
      });
    })
    .catch((error) => console.error("Error fetching tasks:", error));
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    errorMessage.style.display = "block";
    return;
  }

  errorMessage.style.display = "none"; // Hide error message if it was displayed previously

  fetch("http://localhost:4000/api/v1/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task: taskText }),
  })
    .then((response) => response.json())
    .then((data) => {
      appendTaskToList(data.user);
      taskInput.value = ""; // Clear input field
    })
    .catch((error) => console.error("Error adding task:", error));
}

// Function to enable editing mode for a task
function enableEditMode(taskId) {
  const taskItem = document.getElementById(`${taskId}`);
  const taskTextElement = taskItem.querySelector(".task-text");
  const updateInput = document.getElementById("updateTaskInput");
  const updateModal = document.getElementById("updateModal");

  taskTextElement.style.display = "none";
  console.log(updateInput.value);
  updateInput.value = taskTextElement.innerText;

  const updateButton = document.getElementById("updateButton");
  updateButton.onclick = function () {
    updateTaskApi(taskId);
  };

  // Display the modal
  updateModal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  const updateModal = document.getElementById("updateModal");
  updateModal.style.display = "none";
}

// Function to update a task using API
function updateTaskApi(taskId) {
  console.log(taskId);
  const taskItem = document.getElementById(`${taskId}`);
  const taskTextElement = taskItem.querySelector(".task-text");
  console.log(taskTextElement.innerText);
  const updateInput = document.getElementById("updateTaskInput");

  const updatedText = updateInput.value.trim();
  console.log(updatedText);
  if (updatedText === "") {
    alert("Updated task cannot be empty.");
    return;
  }

  // API call to update the task
  fetch(`http://localhost:4000/api/v1/update/${taskId}`, {
    method: "PUT", // Assuming your API supports PUT for updates
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task: updatedText }),
  })
    .then((response) => {
      if (response.ok) {
        closeModal(); // Close the modal after updating
        taskTextElement.innerText = updatedText;
        console.log(taskTextElement.innerText);
        fetchTasks();
      } else {
        console.error("Error updating task:", response.status);
      }
    })
    .catch((error) => console.error("Error updating task:", error));
}

// Function to delete a task
function deleteTask(taskId) {
  console.log(taskId);
  fetch(`http://localhost:4000/api/v1/delete/${taskId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response) {
        document.getElementById(`${taskId}`).remove();
      }
    })
    .catch((error) => console.error("Error deleting task:", error));
}

// Function to append a task to the task list
function appendTaskToList(task) {
  console.log(task);
  const li = document.createElement("li");
  console.log(task._id);
  li.id = task._id;

  // Check if the task object has a property named 'text'
  const taskText = task.task || "demo";
  li.classList.add("crud-li");

  li.innerHTML = `
      <span class="task-text">${taskText}</span>
      <div>
      <button class='crud-itembutton' onclick="enableEditMode('${task._id}')">Edit</button> 
      <button class='crud-itembutton' onclick="deleteTask('${task._id}')">Delete</button>
      </div>
    `;

  taskList.appendChild(li);
}

// Fetch tasks when the page loads
fetchTasks();
