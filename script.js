const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;
let oldTodoText = "";

// Add todo function
const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("please enter a task");
    return;
  }

  //Edit Todo list
  if (addBtn.value === "Edit") {
    editTodo.target.previousElementSibling.innerHTML = inputText;
    editLocalTodos(oldTodoText, inputText);
    addBtn.value = "Add";
    inputBox.value = "";
  } else {
    // create list item
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    // create edit button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    // create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodos(inputText);
  }
};

// update todo list : (edit and delete)
const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
  }

  if (e.target.innerHTML === "Edit") {
    oldTodoText = e.target.previousElementSibling.innerHTML;
    inputBox.value = oldTodoText;
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;
  }
};

// local storage functions
const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todos);
};

// get todos from local storage
const getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      // create list item
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      // create edit button
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.classList.add("btn", "editBtn");
      li.appendChild(editBtn);

      // create delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Remove";
      deleteBtn.classList.add("btn", "deleteBtn");
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });
  }
  return todos;
};

// Function to delete todo from local storage
const deleteLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoText = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todoText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todoIndex);
};

//Edit todo in local storage
const editLocalTodos = (oldText, newText) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let todoIndex = todos.indexOf(oldText);
  if (todoIndex !== -1) {
    todos[todoIndex] = newText;
  }
  localStorage.setItem("todos", JSON.stringify(todos));
};

document.addEventListener("DOMContentLoaded", getLocalTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
