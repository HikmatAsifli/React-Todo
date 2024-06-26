import { useState } from 'react';
import TodoItem from './ToDoItem';

const TodoList = ({ todos, onDelete, onToggle, onClearCompleted }) => {
    const [filter, setFilter] = useState('all');

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') {
            return !todo.completed;
        } else if (filter === 'completed') {
            return todo.completed;
        } else {
            return true;
        }
    });

    return (
        <div className='todo-lists'>

            {filteredTodos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}

            <div className='todo-list'>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('active')}>Active</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={onClearCompleted}>Clear Completed</button>
            </div>
        </div>
    );
};

export default TodoList;
