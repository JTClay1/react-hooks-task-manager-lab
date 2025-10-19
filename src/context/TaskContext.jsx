// Creates global state for managing tasks (add, toggle, fetch)
// useContext gives every component access to these shared values
// useEffect loads initial data, useCallback prevents unnecessary re-renders

import React, { createContext, useEffect, useState, useCallback } from "react";

// Create a context object that can be shared across components
export const TaskContext = createContext();

// API URL for our local JSON-server backend
const API = "http://localhost:6001/tasks";

export function TaskProvider({ children }) {
  // Global state for all tasks
  const [tasks, setTasks] = useState([]);

  // useEffect runs once on mount to fetch initial tasks from the backend
  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        // Merge fetched tasks with any existing ones (prevents overwriting optimistic adds)
        setTasks((prev) => {
          const seenIds = new Set(prev.map((t) => t.id));
          return [...prev, ...data.filter((t) => !seenIds.has(t.id))];
        });
      })
      .catch(() => {
        // If server fetch fails, keep current state instead of crashing
      });
  }, []);

  // Adds a new task to global state + POSTs it to backend
  const addTask = useCallback((title) => {
    const clean = String(title || "").trim();
    if (!clean) return;

    // Create a temporary optimistic version (shows instantly)
    const optimistic = {
      id: Date.now(),
      title: clean,
      completed: false,
    };

    // Immediately display it in the UI
    setTasks((prev) => [...prev, optimistic]);

    // Send it to backend
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: clean, completed: false }),
    }).catch(() => {
      // ignore failure; UI already shows optimistic add
    });
  }, []);

  // Toggles a task’s completion state (both in UI and backend)
  const toggleComplete = useCallback((id) => {
    let nextCompleted = false;

    // Update UI immediately (optimistic)
    setTasks((prev) => {
      const target = prev.find((t) => t.id === id);
      nextCompleted = target ? !target.completed : true;
      return prev.map((t) =>
        t.id === id ? { ...t, completed: nextCompleted } : t
      );
    });

    // Persist the change to backend
    fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: nextCompleted }),
    }).catch(() => {
      // Rollback if the server call fails
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: !nextCompleted } : t
        )
      );
    });
  }, []);

  // Provide the global data + functions to any nested components
  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
}
