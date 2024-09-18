import {ChangeEvent, useState} from 'react';
import Button from '../Button/Button';
import './Todo.css';
import TodoItem from '../TodoItem/TodoItem';
import {TodoItemType} from '../../types/TodoItem.type';
import {useRef} from 'react';
import {useEffect} from 'react';

function Todo() {
    const [todoList, setTodoList] = useState<TodoItemType[]>([]);

    const [inputValue, setInputValue] = useState('');

    const [editingInputValue, setEditingInputValue] = useState('');

    const [id, setId] = useState(1);

    const [editingItemId, setEditingItemId] = useState<null | number>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    let editMode = editingItemId !== null;

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    function incrementId() {
        setId(id => id + 1);
    }

    function updateInput(e: ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value);
    }
    function updateEditingInput(e: ChangeEvent<HTMLInputElement>): void {
        setEditingInputValue(e.target.value);
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
            if (inputRef.current) inputRef.current.focus();
        }
    }

    function handleClickEdit() {
        const newList = todoList.map(item => {
            if (item.id === editingItemId) {
                return {...item, text: editingInputValue};
            }
            return item;
        });
        setTodoList(newList);
        setEditingInputValue('');
        editMode = false;
        setEditingItemId(null);
        if (inputRef.current) inputRef.current.focus();
    }

    function handleDelete(id: number): void {
        setTodoList(todoList.filter(task => task.id !== id));
        if (inputRef.current) inputRef.current.focus();
    }

    function handleUpdateStatus(id: number): void {
        const newList = todoList.map(item => {
            if (item.id === id) item.done = !item.done;
            return item;
        });
        setTodoList(newList);
    }

    function handleEdit(id: number): void {
        todoList.forEach(item => {
            if (item.id === id) setEditingInputValue(item.text);
        });
        editMode = true;
        setEditingItemId(id);
        if (inputRef.current) inputRef.current.focus();
    }

    return (
        <>
            <h1 className="todo-title">Todo list</h1>
            <div className="todo-box">
                <div className="todo-field">
                    <input
                        type="text"
                        ref={inputRef}
                        className="todo-input"
                        onChange={updateInput}
                        placeholder="add a task"
                        value={inputValue}
                    />
                    {editMode ? (
                        <Button onClick={handleClickEdit}>EDIT</Button>
                    ) : (
                        <Button onClick={handleClickAdd}>ADD</Button>
                    )}
                </div>
                <ul className="todo-list">
                    {todoList.map(item => (
                        <TodoItem
                            item={item}
                            key={item.id}
                            onDelete={handleDelete}
                            onStatusChange={handleUpdateStatus}
                            onEdit={handleEdit}
                            editMode={editMode}
                            updateInput={updateEditingInput}
                            inputValue={editingInputValue}
                            editingItemId={editingItemId}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Todo;
