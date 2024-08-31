import { fetchTodos, fetchTodo, deleteTodo, updateTodo } from './data';
import $ from 'jquery';

// Render function to retrieve data from the server and render it to the page
export const render = async () => {
  const todos = await fetchTodos();
  $("#todoList").empty();
  todos.forEach(function (todo) {
    let todoItem = `<li class="list-group-item d-flex justify-content-between align-items-center">
                      <span class="todo-text ${todo.completed ? "completed" : ""}">${todo.text}</span>
                      <div>
                          <button class="btn btn-sm btn-secondary editTodo" data-index="${todo.id}">Edit</button>
                          <button class="btn btn-sm btn-success toggleTodo" data-index="${todo.id}">${todo.completed ? "Incomplete" : "Complete"}</button>
                          <button class="btn btn-sm btn-danger deleteTodo" data-index="${todo.id}">Delete</button>
                      </div>
                  </li>`;
    $("#todoList").append(todoItem);
  });
};

// Add event listener to the delete button
$(document).on("click", ".deleteTodo", async function () {
  const id = $(this).data("index");
  await deleteTodo(id);
  render();
});

// Add event listener to the toggleTodo button
$(document).on("click", ".toggleTodo", async function () {
  const id = $(this).data("index");
  const todo = await fetchTodo(id);
  await updateTodo(id, { ...todo, completed: !todo.completed });
  render();
});

// Add event listener to the editTodo button
$(document).on("click", ".editTodo", async function () {
  const id = $(this).data("index");
  const todo = await fetchTodo(id);
  const newText = prompt("Edit your to-do:", todo.text);
  if (newText !== null) {
    await updateTodo(id, { ...todo, text: newText });
    render();
  }
});
