const BASE_URL = "http://localhost:3000"; // Corrected variable name and added protocol

// Define Todo type
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

// Get all todos from DB
export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${BASE_URL}/todos`);
  const data: Todo[] = await response.json();
  return data;
};

// Get a todo by its ID
export const fetchTodo = async (id: number): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/todos/${id}`);
  const data: Todo = await response.json();
  return data;
};

// Add a new todo to the server
export const addTodo = async (text: string): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, completed: false }),
  });
  const data: Todo = await response.json();
  return data;
};

// Delete a todo from the server
export const deleteTodo = async (id: number): Promise<void> => {
  await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });
};

// Update a todo on the server
export const updateTodo = async (id: number, todo: Todo): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const data: Todo = await response.json();
  return data;
};
