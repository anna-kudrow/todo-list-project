// import { useState } from "react";
import './TodoItem.css'
// import {TodoItem} from "../../types/TodoItem.type";

interface TodoItemProps {
    id: number;
    text: string;
    isDone: boolean;
    onDelete: (item: string) => void;
    onStatusChange: React.Dispatch<React.SetStateAction<boolean>>;
}

function TodoItem({ text, isDone, onDelete, onStatusChange}: TodoItemProps) {  



    function changeTaskStatus () {
       // eslint-disable-next-line @typescript-eslint/no-unused-expressions
       isDone ? onStatusChange(true) : onStatusChange(false);
       console.log(isDone);
    }

    return ( 
        <li className="todo-item"> 
            <div>
                <input type="checkbox" onChange={changeTaskStatus} />
                <span className={isDone ? 'task-text done' : 'task-text'}>{text}</span>
            </div>
            <div className="todo-tools">
                <button className="item-btn edit-btn"  type="button" onClick={() => {}}></button>
                <button className="item-btn delete-btn" type="button" onClick={()=>onDelete(text)}></button>
            </div>
        </li>
     );
}

export default TodoItem;