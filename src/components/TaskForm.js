import React, { useContext, useState, useEffect } from 'react';
import { TaskListContext } from '../context/TaskListContext';

const TaskForm = () => {
  const {
    addTask, clearList, editTask, updateTask,
  } = useContext(TaskListContext);

  const [title, setTitle] = useState('');

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTask) {
      updateTask(title, editTask.id);
    } else {
      addTask(title);
      setTitle('');
    }
  };

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
    } else {
      setTitle('');
    }
  }, [editTask]);

  return (
    <form onSubmit={handleSubmit} className="form">
      <input value={title} onChange={handleChange} type="text" className="task-input" placeholder="Add Task..." required />
      <div className="buttons">
        <button className="btn add-task-btn" type="submit">{editTask ? 'Edit Task' : 'Add Task'}</button>
        <button onClick={clearList} className="btn clear-btn">Clear</button>
      </div>
    </form>
  );
};

export default TaskForm;
