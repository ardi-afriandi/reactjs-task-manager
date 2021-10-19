import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export const TaskListContext = createContext();

const TaskListContextProvider = (props) => {
  const initialState = JSON.parse(localStorage.getItem('tasks')) || [];
  const [tasks, setTask] = useState(initialState);

  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    setTask([...tasks, { title, id: uuid() }]);
  };

  const removeTask = (id) => {
    setTask(tasks.filter((task) => task.id !== id));
  };

  const clearList = () => {
    setTask([]);
  };

  const findTask = (id) => {
    const taskFound = tasks.find((task) => task.id === id);

    setEditTask(taskFound);
  };

  const updateTask = (title, id) => {
    const newTasks = tasks.map((task) => (task.id === id ? { title, id } : task));

    setTask(newTasks);
    setEditTask(null);
  };

  return (
    <TaskListContext.Provider value={{
      tasks, addTask, removeTask, clearList, findTask, editTask, updateTask,
    }}
    >
      {props.children}
    </TaskListContext.Provider>
  );
};

export default TaskListContextProvider;
