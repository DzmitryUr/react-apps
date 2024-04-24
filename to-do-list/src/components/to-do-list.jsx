import { useEffect, useState } from "react";
import "./to-do-list.css";

function TaskRow({
  task,
  completed,
  index,
  handleCompleteTask,
  handleDeleteTask,
}) {
  return (
    <div className={`task-row ${completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => handleCompleteTask(index)}
      />
      <div className="task-text" onClick={() => handleCompleteTask(index)}>
        {task}
      </div>
      <button className="delete-btn" onClick={() => handleDeleteTask(index)}>
        x
      </button>
    </div>
  );
}

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (!savedTasks || !savedTasks.length) return;

    setTasks(JSON.parse(savedTasks));
  }, []);

  const handleAddTask = () => {
    if (!inputValue) {
      alert("Please enter a valid task!");
      return;
    }

    const newTasks = [...tasks, { task: inputValue, completed: false }];
    setTasks(newTasks);
    storeTasks(newTasks);
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCompleteTask = (index) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(newTasks);
    storeTasks(newTasks);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((task, i) => i !== index);

    setTasks(newTasks);
    storeTasks(newTasks);
  };

  const storeTasks = (newTasks) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  return (
    <div className="container">
      <h2>To Do List</h2>
      <div className="row-add-taks">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map((task, index) => (
          <TaskRow
            key={index}
            task={task.task}
            completed={task.completed}
            index={index}
            handleCompleteTask={handleCompleteTask}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default ToDoList;
