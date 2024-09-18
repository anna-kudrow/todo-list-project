// import {useState} from 'react';
import {ChangeEvent} from 'react';
import './TodoItem.css';
import {TodoItemType} from '../../types/TodoItem.type';
// import {TodoItem} from "../../types/TodoItem.type";

interface TodoItemProps {
    item: TodoItemType;
    // id: number;
    // text: string;
    // isDone: boolean;
    editMode: boolean;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    onStatusChange: (id: number) => void;
    updateInput: (e: ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
    editingItemId: number | null;
}

function TodoItem({
    // text,
    // isDone,
    // id,
    item,
    editMode,
    onDelete,
    onEdit,
    onStatusChange,
    updateInput,
    inputValue,
    editingItemId,
}: TodoItemProps) {
    return (
        <li className="todo-item">
            <div>
                <input
                    type="checkbox"
                    onChange={() => onStatusChange(item.id)}
                    value={inputValue}
                />
                {editMode && item.id === editingItemId ? (
                    <input
                        className="edit-input"
                        type="text"
                        onChange={updateInput}
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
                    onClick={() => onEdit(item.id)}
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
