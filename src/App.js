import React, { useState, useEffect } from "react";
import { Task } from "./Components/Task/Task";
import { Button } from "./Components/UI/Button/Button";
import "./Components/styles/main.css";
const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const localStorageTasks = JSON.parse(localStorage.getItem("tasks"));

  const createTask = () => {
    const task = {
      text: inputValue,
      isChecked: false,
      id: Date.now(),
      order: tasks.length + 1,
    };
    if (inputValue.trim()) {
      setTasks((prevState) => [...prevState, task]);
      setInputValue("");
      if (!localStorageTasks) {
        localStorage.setItem("tasks", JSON.stringify([task]));
        return;
      }
      localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
    }
  };
  const ChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };
  const deleteTask = (id) => {
    setTasks((prevState) => prevState.filter((el) => id !== el.id));
    localStorage.setItem(
      "tasks",
      JSON.stringify(localStorageTasks.filter((el) => id !== el.id))
    );
  };
  const toggleCheck = (id) => {
    setTasks((prevState) =>
      prevState.map((el) =>
        el.id === id
          ? { text: el.text, id: el.id, isChecked: !el.isChecked }
          : el
      )
    );
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      createTask(inputValue);
    }
  };

  const editTask = (text, id) => {
    setTasks((prevState) =>
      prevState.map((el) => (el.id === id ? { ...el, text } : el))
    );
    localStorage.setItem(
      "tasks",
      JSON.stringify(
        localStorageTasks.map((el) => (el.id === id ? { ...el, text } : el))
      )
    );
  };

  useEffect(() => {
    const localTasks = () => {
      if (localStorageTasks) {
        setTasks(localStorageTasks);
      }
    };
    localTasks();
  }, []);

  const dragStartHandler = (e, task) => {
    setCurrentTask(task);
  };

  const dragEndHandler = (e) => {
    e.target.style.background = "white";
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.background = "lightgray";
  };

  const dropHandler = (e, task) => {
    e.preventDefault();

    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return { ...t, order: currentTask.order };
        }
        if (t.id === currentTask.id) {
          return { ...t, order: task.order };
        }
        return t;
      })
    );
    e.target.style.background = "white";
  };

  const sortTask = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <div className="app">
      <div className="wrapper">
        <input
          type="text"
          className="input"
          value={inputValue}
          onChange={ChangeInputValue}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={createTask} text="Add" className="addBtn" />
      </div>
      {tasks.sort(sortTask).map((task, index) => {
        return (
          <Task
            onDragStart={(e) => dragStartHandler(e, task)}
            onDragLeave={dragEndHandler}
            onDragEnd={dragEndHandler}
            onDragOver={dragOverHandler}
            onDrop={(e) => dropHandler(e, task)}
            draggable
            text={task.text}
            id={task.id}
            isChecked={task.isChecked}
            key={task.id}
            onDelete={deleteTask}
            onCheck={toggleCheck}
            onEdit={editTask}
            index={index + 1}
          />
        );
      })}
    </div>
  );
};

export default App;
