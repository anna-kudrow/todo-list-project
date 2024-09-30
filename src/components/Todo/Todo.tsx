import {ChangeEvent, useState} from 'react';
import Button from '../Button/Button';
import './Todo.css';
import TodoItem from '../TodoItem/TodoItem';
import {TodoItemType} from '../../types/TodoItem.type';

function Todo() {
    const [todoList, setTodoList] = useState<TodoItemType[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [id, setId] = useState(1);

    function incrementId() {
        setId(id => id + 1);
    }

    function updateInput(e: ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value);
    }

    function handleClickAdd(): void {
        if (inputValue && inputValue.trim() !== '') {
            const newItem: TodoItemType = {
                id: id,
                text: inputValue,
                done: false,
            };
            incrementId();
            const newList = [...todoList, newItem];
            setTodoList(newList);
            setInputValue('');
        }
    }
    function handleDelete(id: number): void {
        setTodoList(todoList.filter(task => task.id !== id));
    }

    function handleOnChangeItem(newItem: TodoItemType) {
        const newList = todoList.map(item => {
            if (item.id === newItem.id) {
                return newItem;
            }
            return item;
        });
        setTodoList(newList);
    }

    return (
        <>
            <h1 className="todo-title">Todo list</h1>
            <div className="todo-box">
                <div className="todo-field">
                    <input
                        type="text"
                        autoFocus
                        className="todo-input"
                        onChange={updateInput}
                        placeholder="add a task"
                        value={inputValue}
                    />
                    <Button onClick={handleClickAdd}>ADD</Button>
                </div>
                <ul className="todo-list">
                    {todoList.map(item => (
                        <TodoItem
                            item={item}
                            key={item.id}
                            onDelete={handleDelete}
                            onItemChange={handleOnChangeItem}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Todo;
