import React, { useContext } from 'react'
import { Context } from "./Context";

export default function TodoItem({ title, id, completed }) {
  const { toggleTodoCompleted, removeTodo } = useContext(Context);
  const cls = ['todo'];
  if (completed) {
    cls.push('completed');
  }
  return (
    <li className={cls.join(' ')}>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => {
            console.log(id, 'id')
            toggleTodoCompleted(id)
          }}
        />
        <span>{title}</span>
        <i
          className="material-icons red-text"
          onClick={() => removeTodo(id)}
        >
          delete
        </i>
      </label>
    </li>
  )
}