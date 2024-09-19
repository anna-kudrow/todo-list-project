/* eslint-disable @typescript-eslint/no-unused-expressions */
import {ChangeEvent} from 'react';
import './TodoItem.css';
import {TodoItemType} from '../../types/TodoItem.type';

interface TodoItemProps {
    item: TodoItemType;
    editMode: boolean;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    onChange: (item: TodoItemType) => void;
    // updateInput: (e: ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
    editingItemId: number | null;
    setEditingInputValue: (text: string) => void;
}

function TodoItem({
    item,
    editMode,
    onDelete,
    onEdit,
    onChange,
    inputValue,
    editingItemId,
    setEditingInputValue,
}: TodoItemProps) {
    function handleUpdateStatus(item: TodoItemType): void {
        item.done = !item.done;
        onChange(item);
    }

    // function handleUpdateText(item: TodoItemType): void {
    //     setEditingInputValue(e.target.value);
    //     onChange(item);
    // }

    return (
        <li className="todo-item">
            <div className="task-field-box">
                <input
                    type="checkbox"
                    onChange={() => handleUpdateStatus(item)}
                    value={inputValue}
                />
                {editMode && item.id === editingItemId ? (
                    <input
                        className="edit-input"
                        type="text"
                        onChange={handleUpdateText(item)}
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
