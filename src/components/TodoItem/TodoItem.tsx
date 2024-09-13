// import { useState } from "react";
import './TodoItem.css';
// import {TodoItem} from "../../types/TodoItem.type";

interface TodoItemProps {
    id: number;
    text: string;
    isDone: boolean;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    onStatusChange: (id: number) => void;
}

function TodoItem({
    text,
    isDone,
    id,
    onDelete,
    onEdit,
    onStatusChange,
}: TodoItemProps) {
    return (
        <li className="todo-item">
            <div>
                <input type="checkbox" onChange={() => onStatusChange(id)} />
                <span className={isDone ? 'task-text done' : 'task-text'}>
                    {text}
                </span>
            </div>
            <div className="todo-tools">
                <button
                    className="item-btn edit-btn"
                    type="button"
                    onClick={() => onEdit(id)}
                ></button>
                <button
                    className="item-btn delete-btn"
                    type="button"
                    onClick={() => onDelete(id)}
                ></button>
            </div>
        </li>
    );
}

export default TodoItem;
