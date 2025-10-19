// Handles adding a new task to the global task list using Context
// Uses controlled input (useState) + unique ID for accessibility (useId)

import React, { useState, useId, useContext } from "react";
import { TaskContext } from "../context/TaskContext";   // Pull addTask() from global context

function TaskForm() {
  // Access the addTask function from context
  const { addTask } = useContext(TaskContext);

  // Local state to store the current text input value
  const [taskName, setTaskName] = useState("");

  // React’s useId hook gives each input a unique id (good for labels/forms)
  const inputId = useId();

  // Runs when the form is submitted
  function handleSubmit(e) {
    e.preventDefault();           // stops page refresh
    const title = taskName.trim();
    if (!title) return;           // ignore empty input
    addTask(title);               // call global addTask function
    setTaskName("");              // clear input field
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputId}>New Task:</label>
      <input
        id={inputId}
        type="text"
        value={taskName}                       // controlled input
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
