// Renders all tasks on screen
// Pulls global task data + toggle function from Context
// Filters tasks by query (live search)

import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskList({ query }) {
  const { tasks, toggleComplete } = useContext(TaskContext);

  // Filter task list based on search input
  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes((query || "").toLowerCase())
  );

  return (
    <ul>
      {filtered.map((task) => (
        <li key={task.id}>
          {/* Strike-through completed tasks visually */}
          <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </span>

          {/* Each task has a button that toggles completion state */}
          <button
            data-testid={task.id}                // used by tests to identify elements
            onClick={() => toggleComplete(task.id)}
          >
            {task.completed ? "Undo" : "Complete"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
