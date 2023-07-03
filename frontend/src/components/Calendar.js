import React, { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, addYears, isSameMonth, isSameDay } from "date-fns";
import "../style/Calendar.css";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import TaskDetails from "./TaskDetails";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { tasks, dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isFadeIn, setIsFadeIn] = useState(false);

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

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = [];
  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const getTasksForDay = (day) => {
    const tasksForDay = tasks.filter((task) => isSameDay(new Date(task.deadline), day));
    return tasksForDay;
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsPopupVisible(true);
    setIsFadeIn(true);
  };

  const closePopup = () => {
    setIsFadeIn(false);

    setTimeout(() => {
      setIsPopupVisible(false);
      setIsFadeIn(false);
    }, 300); // Delay of 300 milliseconds to match the CSS transition duration
  };

  const navigateToPrev = () => {
    setCurrentDate(addMonths(currentDate, -1));
  };

  const navigateToNext = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
  };

  const navigateToDate = (date) => {
    const selectedDate = new Date(date);
    if (!isNaN(selectedDate)) {
      setCurrentDate(selectedDate);
    }
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="calendar-nav" onClick={navigateToPrev}>
          Prev
        </button>
        <h2 className="calendar-title">{format(currentDate, "MMMM yyyy")}</h2>
        <button className="calendar-nav" onClick={navigateToNext}>
          Next
        </button>
        <button className="calendar-nav" onClick={navigateToToday}>
          Today
        </button>
        <div className="calendar-date-picker">
          <label htmlFor="datepicker">Go to Date:</label>
          <input
            type="date"
            id="datepicker"
            value={format(currentDate, "yyyy-MM-dd")}
            onChange={(e) => navigateToDate(new Date(e.target.value))}
          />
        </div>
      </div>
      <div className="calendar-grid">
        {days.map((day) => (
          <div
            key={day.toString()}
            className={`calendar-day ${!isSameMonth(day, monthStart) ? "disabled" : ""}`}
          >
            <div className="calendar-day-label">{format(day, "EEE")}</div>
            <div className="calendar-day-number">{format(day, "d")}</div>
            <div className="calendar-tasks">
              {getTasksForDay(day).map((task) => (
                <button
                  key={task._id}
                  className={`calendar-task ${task.isCompleted ? "completed" : ""} ${isFadeIn ? "fade-in" : ""}`}
                  onClick={() => handleTaskClick(task)}
                >
                  {task.title}
                  {task.isCompleted && <span className="material-icons"></span>}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {isPopupVisible && (
        <div className={`task-popup ${isFadeIn ? "fade-in" : "fade-out"}`}>
          <TaskDetails task={selectedTask} onClose={closePopup} />
          <button className="popup-close" onClick={closePopup}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
