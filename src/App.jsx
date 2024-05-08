import { useState, useEffect } from 'react';
import "./App.css"
import TodoForm from './components/ToDoForm';
import TodoList from './components/ToDoList';
import DarkModeToggle from './components/DarkModeToggle';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  const handleAddTodo = text => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleDeleteTodo = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleToggleTodo = id => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleClearCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };


  const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState(isDarkModeEnabled);

  const saveDarkModeToLocalStorage = (value) => {
    localStorage.setItem('darkMode', value.toString());
  };

  useEffect(() => {
    saveDarkModeToLocalStorage(darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div className={darkMode ? 'App dark-mode' : 'App'}>
        <div className='todo'>
          <div className="todo-app">
            <h1>TODO</h1>
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
          <TodoForm onAdd={handleAddTodo} />
          <TodoList
            todos={todos}
            onDelete={handleDeleteTodo}
            onToggle={handleToggleTodo}
            onClearCompleted={handleClearCompleted}
          />
        </div>
      </div>
      <div className={darkMode ? 'banner' : 'dark-banner'}></div>
    </>
  );
};

export default App;