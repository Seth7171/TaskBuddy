import React, { useEffect, useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import "../style/MyTasks.css";

// Components
import TaskDetails from "../components/TaskDetails";
import TaskFrom from "../components/TasksForm";
import NoTasksImage from "../assets/no-tasks-image.png"; // Import the image

const MyTasks = () => {
  const { tasks, dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const [showSortOptions, setShowSortOptions] = useState(false); // State for controlling the visibility of sort options
  const [sortByTitle, setSortByTitle] = useState(""); // State for sorting by title
  const [sortByDeadline, setSortByDeadline] = useState(""); // State for sorting by deadline
  const [selectByPriority, setSortByPriority] = useState(""); // State for sorting by priority
  const [selectByType, setSortByType] = useState(""); // State for sorting by type

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TASKS", payload: json });
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [dispatch, user]);

  const sortedTasks = () => {
    let sorted = [...tasks];

    if (sortByTitle === "title-asc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortByTitle === "title-desc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sortByDeadline === "deadline-nearest") {
      sorted.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (sortByDeadline === "deadline-farthest") {
      sorted.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
    }

    if (selectByPriority) {
      sorted = sorted.filter((task) => task.priority === selectByPriority);
    }

    if (selectByType) {
      sorted = sorted.filter((task) => task.type === selectByType);
    }

    return sorted;
  };

  const clearSearch = () => {
    setSortByTitle("");
    setSortByDeadline("");
    setSortByPriority("");
    setSortByType("");
  };

  return (
    <div className="mytasks">

      {tasks && sortedTasks().filter((task) => !task.isCompleted).length > 0 ? (
        <div className="tasks-container">
          <div className="tasks">
            {sortedTasks().filter((task) => !task.isCompleted).map((task) => (
              <TaskDetails key={task._id} task={task} />
            ))}
          </div>
        </div>
      ) : (
        <div className="no-tasks">
          <img src={NoTasksImage} alt="No tasks" />
        </div>
      )}
         
      <div>
      {tasks && sortedTasks().filter((task) => !task.isCompleted).length > 0 && <button className = "sort-bar-button" onClick={() => setShowSortOptions(!showSortOptions)}>
          {showSortOptions ? "Hide Sort Options" : "Show Sort Options"}
        </button>}
        {showSortOptions && (
          <div className="sort-options">
            <h3>Sort Menu</h3>
            <div>
              <span>Sort By Title:</span>
              <select value={sortByTitle} onChange={(e) => setSortByTitle(e.target.value)}>
                <option value="">-</option>
                <option value="title-asc">A-Z</option>
                <option value="title-desc">Z-A</option>
              </select>
            </div>
            <div>
              <span>Sort By Deadline:</span>
              <select value={sortByDeadline} onChange={(e) => setSortByDeadline(e.target.value)}>
                <option value="">-</option>
                <option value="deadline-nearest">Nearest</option>
                <option value="deadline-farthest">Farthest</option>
              </select>
            </div>
            <div>
              <span>Sort By Priority:</span>
              <select value={selectByPriority} onChange={(e) => setSortByPriority(e.target.value)}>
                <option value="">-</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <span>Sort By Type:</span>
              <select value={selectByType} onChange={(e) => setSortByType(e.target.value)}>
                <option value="">-</option>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="home">Home</option>
                <option value="educational">Educational</option>
              </select>
            </div>
            <button onClick={clearSearch}>Clear Search</button>
          </div>
        )}
        {!showSortOptions && (<TaskFrom />
        )}
      </div>
    </div>
  );
};

export default MyTasks;
