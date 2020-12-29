import React, { useState } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App(props) {

  const [tasks, setTasks] = useState(props.tasks);

  const [filter, setFilter] = useState("All");

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
      });
      setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function addTask(name) {
    const newTask = {id: "todo-" + nanoid(), name: name, completed: false};
    setTasks([...tasks, newTask]);
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => 
  <Todo id={task.id} name={task.name} completed={task.completed} key={task.id} toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask} editTask={editTask} />
  );

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';

  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="wrapper">
      <h1>Task List</h1>
      <Form addTask={addTask} />
      <div className="filter-btns">
        {filterList}
      </div>
      <br></br>
      <h2>{headingText}</h2>
      <ul role="list" aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}
