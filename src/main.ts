import './style.css';
import { render } from './utility';
import { addTodo } from './data';
import $ from 'jquery';

$(document).ready(function () {
  // Call the render function when the page loads
  render();

  // Add event listener to the add todo button
  $("#addTodo").click(async function (event) {
    event.preventDefault();
    const text = ($("#newTodo").val() as string).trim();
    if (!text) {
      alert("Please enter a todo");
      return;
    }
    try {
      await addTodo(text);
    } catch (error) {
      console.error('Failed to add todo:', error);
    } finally {
      $("#newTodo").val("");
    }
    render();
  });
  
  });
