import {ChangeEvent, useState} from 'react';
import './TodoItem.css';
import {TodoItemType} from '../../types/TodoItem.type';

interface TodoItemProps {
    item: TodoItemType;
    onDelete: (id: number) => void;
    onItemChange: (item: TodoItemType) => void;
}

function TodoItem({item, onDelete, onItemChange}: TodoItemProps) {
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(item.text);

    function handleUpdateStatus(item: TodoItemType): void {
        onItemChange({...item, done: !item.done});
    }

    function handleUpdateText(e: ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value);
    }

    function handleEdit(item: TodoItemType): void {
        setEditMode(true);
        setInputValue(item.text);
    }

    function handleBlur() {
        setEditMode(false);
        onItemChange({...item, text: inputValue});
    }

    return (
        <li className="todo-item">
            <div className="task-field-box">
                <input
                    type="checkbox"
                    onChange={() => handleUpdateStatus(item)}
                />
                {editMode ? (
                    <input
                        className="edit-input"
                        type="text"
                        onChange={handleUpdateText}
                        onBlur={handleBlur}
                        value={inputValue}
                        autoFocus
                    />
                ) : (
                    <span
                        className={item.done ? 'task-text done' : 'task-text'}
                    >
                        {item.text}
                    </span>
                )}
            </div>
            <div className="todo-tools">
                <button
                    className="item-btn edit-btn"
                    type="button"
                    onClick={() => handleEdit(item)}
                ></button>
                <button
                    className="item-btn delete-btn"
                    type="button"
                    onClick={() => onDelete(item.id)}
                ></button>
            </div>
        </li>
    );
}

export default TodoItem;
