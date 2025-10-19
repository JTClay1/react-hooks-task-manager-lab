// The SearchBar controls live search functionality for our Task Manager app
// It uses useRef to hold the latest input value without forcing re-renders
// and useState to actually trigger re-renders when we want to filter the list.

import React, { useRef, useState } from "react";
import TaskList from "./TaskList"; // displays filtered list of tasks

function SearchBar() {
  // useRef → stores a mutable value that doesn’t trigger re-renders when changed.
  // Perfect for input values you just want to read or cache.
  const searchRef = useRef("");

  // useState → keeps track of the search query to actually re-render TaskList.
  const [query, setQuery] = useState("");

  // Called every time the user types into the search bar
  function handleChange(e) {
    // Update the ref value (does NOT cause a re-render)
    searchRef.current = e.target.value;

    // Update local state (this DOES re-render TaskList with new query)
    setQuery(searchRef.current);
  }

  return (
    <div>
      {/* Input for typing search terms */}
      <input
        type="text"
        placeholder="Search tasks..."
        defaultValue={searchRef.current}  // controlled only at initialization
        onChange={handleChange}           // update query + ref as user types
      />

      {/* TaskList re-renders every time query changes */}
      <TaskList query={query} />
    </div>
  );
}

export default SearchBar;
