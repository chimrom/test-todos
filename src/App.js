import React, { useState, useEffect } from "react";
import { Task } from "./Components/Task/Task";
import { Button } from "./Components/UI/Button/Button";
import "./Components/styles/main.css";
const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const localStorageTasks = JSON.parse(localStorage.getItem("tasks"));
    if (localStorageTasks) {
      setTasks(localStorageTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
    }
  };
  const ChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };
  const deleteTask = (id) => {
    setTasks((prevState) =>
      prevState
        .filter((el) => id !== el.id)
        .map((el, index) => ({ ...el, order: index + 1 }))
    );
  };
  const toggleCheck = (id) => {
    setTasks((prevState) =>
      prevState.map((el) =>
        el.id === id ? { ...el, isChecked: !el.isChecked } : el
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
  };

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

    setTasks((prevState) =>
      prevState.map((el) => {
        if (el.id === task.id) {
          return { ...el, order: currentTask.order };
        }
        if (el.id === currentTask.id) {
          return { ...el, order: task.order };
        }
        return el;
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
