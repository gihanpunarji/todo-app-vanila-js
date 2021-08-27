// Sellectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todolist = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners

document.addEventListener("DOMContentLoaded", getItems);

todoButton.addEventListener("click", function addTodo(event) {
  // Prevent Default from submitting
  event.preventDefault();
  if (!todoInput.value == "") {
    // Create todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Save to local storage declaration
    savetoLocalStorage(todoInput.value);

    // Check mark button 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-button');
    todoDiv.appendChild(completedButton);

    // Check mark button 
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add('delete-button');
    todoDiv.appendChild(deleteButton);

    // Append to main list
    todolist.appendChild(todoDiv);

    // Clear Input value after submitted

    todoInput.value = "";
  }
});

// Delete checked
todolist.addEventListener("click", function deleeteChecked(e) {
  let item = e.target;
  if (item.classList[0] === "delete-button") {
    let todoItem = item.parentElement;
    todoItem.classList.add("fall");

    // Remove from local storage declaration

    removeFromStorage(todoItem);

    // Anijmation of delete
    todoItem.addEventListener("transitionend", function () {
      todoItem.remove();
    })

  }
  if (item.classList[0] === "complete-button") {
    let todoItem = item.parentElement;
    todoItem.classList.toggle("completed");
  }
});

// // Filter todos

filterOption.addEventListener("change", function (e) {
  const todos = todolist.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
});


// Save to local storage

function savetoLocalStorage(item) {
  // Check if already has in local storage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(item);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getItems() {
  let items;
  // Check if already has in local storage
  if (localStorage.getItem("todos") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("todos"));
  }

  items.forEach(function (item) {
    // Create todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    const newTodo = document.createElement('li');
    newTodo.innerText = item;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Check mark button 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-button');
    todoDiv.appendChild(completedButton);

    // Check mark button 
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add('delete-button');
    todoDiv.appendChild(deleteButton);

    // Append to main list
    todolist.appendChild(todoDiv);
  })
}

function removeFromStorage(item) {
  let items;
  // Check if already has in local storage
  if (localStorage.getItem("todos") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("todos"));
  }
  const indexOfitem = item.children[0].innerText;
  items.splice(items.indexOf(indexOfitem), 1);
  localStorage.setItem("todos", JSON.stringify(items));
}

function displayTime() {
  let date = new Date();
  labelTime = document.querySelector(".time");
  labelTime.innerText = date.toLocaleString("en", "UK");
}

displayTime();