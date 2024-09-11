import { ChangeEvent, useState } from "react";
import Button from '../Button/Button'
import './Todo.css';
import TodoItem from "../TodoItem/TodoItem";
import { TodoItemType } from "../../types/TodoItem.type";

function Todo() {
    const [todoList, setTodoList] = useState<TodoItemType[]>([])

    const [inputValue, setInputValue] = useState('');

    const [id, setId] = useState(1);

    // const [isDone, setIsDone] = useState(false); 


    function createId () {
        setId(id => id + 1)
    }

    function updateInput (e: ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value)
    }

    function addTodo (): void {
        if (inputValue && inputValue.trim() !== '') {
            createId();
            const newItem:TodoItemType = {id: id, text: inputValue, done: false}
            const newList = [...todoList, newItem];
            setTodoList(newList);
            setInputValue('');
        } 
    }

    function handleDelete(item: string):void {
        setTodoList(todoList.filter(task => task.text !== item))
    }

    function handleUpdateStatus(id: number):void {
        const newList = todoList.map(item => {if (item.id === id) item.done = !item.done;
            return item;
        })
        setTodoList(newList);
        
    }
        

    // function handleEdit () {
    //     console.log('btn edit');
    // }

    return ( 
        <>
            <h1 className="todo-title">Todo list</h1>
            <div className="todo-box">
                <div className="todo-field">
                    <input type="text" className="todo-input" onChange={updateInput} placeholder="add a task" value={inputValue}  />
                    <Button onClick={addTodo}>ADD</Button>
                </div>
                <ul className="todo-list">
                    {todoList.map((item) => <TodoItem id={item.id} text={item.text} isDone={item.done} key={item.id}  onDelete={handleDelete} onStatusChange={handleUpdateStatus} />)}
                </ul>
            </div>
        </>
     );
}


export default Todo;