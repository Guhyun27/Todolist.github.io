const toDoFrom = document.getElementById("todo-form");
const toDoInput = toDoFrom.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveTodo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveTodo();
}

function coolFilter(item) {
  return item !== 3;
}

function paintTodo(newTodo) {
  const ListofTodo = document.createElement("li");
  ListofTodo.id = newTodo.id;

  const SpanofTodo = document.createElement("span");
  SpanofTodo.innerText = newTodo.text;
  const button = document.createElement("button");

  button.innerText = "X";
  button.addEventListener("click", deleteTodo);
  ListofTodo.appendChild(SpanofTodo);
  ListofTodo.appendChild(button);
  toDoList.appendChild(ListofTodo);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodo();
}

toDoFrom.addEventListener("submit", handleToDoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

// function sayHello(item) {
//   console.log("this is the turn of", item);
// }

if (savedTodos !== null) {
  const parsedToDos = JSON.parse(savedTodos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintTodo);
}

[1, 2, 3, 4].filter(coolFilter);
