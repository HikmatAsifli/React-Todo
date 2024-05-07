const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <div className="todo-item">
      <div className="todo-check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
      </div>
      <button onClick={() => onDelete(todo.id)}>X</button>
    </div>
  );
};

export default TodoItem