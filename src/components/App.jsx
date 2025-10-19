// The main root component of our Task Manager app
// It displays the overall structure of the app’s UI (heading + subcomponents)

import React from "react";
import TaskForm from "./TaskForm";      // Component for adding new tasks
import SearchBar from "./SearchBar";    // Component for searching/filtering tasks

// App itself doesn’t hold state — it just renders subcomponents that talk to global context
export default function App() {
  return (
    <div>
      {/* Page header */}
      <h1>Task Manager</h1>

      {/* Controlled form for submitting new tasks */}
      <TaskForm />

      {/* Input field for searching tasks dynamically */}
      <SearchBar />
    </div>
  );
}
