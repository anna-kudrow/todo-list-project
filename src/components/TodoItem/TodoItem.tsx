/* eslint-disable @typescript-eslint/no-unused-expressions */
import {ChangeEvent} from 'react';
import './TodoItem.css';
import {TodoItemType} from '../../types/TodoItem.type';

interface TodoItemProps {
    item: TodoItemType;
    editMode: boolean;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    onItemChange: (item: TodoItemType) => void;
    // updateInput: (e: ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
    editingItemId: number | null;
    setEditingItemId: SetStateAction<number | null>;
    setEditingInputValue: (text: string) => void;
}

function TodoItem({
    item,
    editMode,
    onDelete,
    onEdit,
    setEditingItemId,
    onItemChange,
    inputValue,
    editingItemId,
    setEditingInputValue,
}: TodoItemProps) {
    function handleUpdateStatus(item: TodoItemType): void {
        onItemChange({...item, done: !item.done});
    }

    function handleUpdateText(e: ChangeEvent<HTMLInputElement>): void {
        setEditingInputValue(e.target.value);
    }

    function handleEdit(item: TodoItemType): void {
        editMode = true;
        setEditingItemId(item.id);
        setEditingInputValue(item.text);
        // todoList.forEach(item => {
        //     if (item.id === id) setEditingInputValue(item.text);
        // });
    }

    // function handleClickSaveEdit() {
    //     const newList = todoList.map(item => {
    //         if (item.id === editingItemId) {
    //             return {...item, text: editingInputValue};
    //         }
    //         return item;
    //     });
    //     setTodoList(newList);
    //     setEditingInputValue('');
    //     editMode = false;
    //     setEditingItemId(null);
    //     if (inputRef.current) inputRef.current.focus();
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
                        onChange={handleUpdateText}
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
