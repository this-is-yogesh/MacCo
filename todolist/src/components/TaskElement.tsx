import {
  KeyboardEvent,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
} from "react";
import "../styles/App.css";
import useLocalStorage from "../hooks/useLocalStorage";
import deleteSvg from "../../src/assets/delete.svg";
import editSvg from "../../src/assets/edit.svg";

interface Task {
  taskName: string;
  taskCompleted: boolean;
}

export default function TasKElement() {
  const [hidePlusAdd, sethidePlusAdd] = useState<boolean>(false);
  const inputElement = useRef<HTMLInputElement>(null);
  const [getValueFromLocalStorage, saveToStorage] = useLocalStorage<Task[]>();
  const items: Task[] = getValueFromLocalStorage("key");
  const completedItems: Task[] = getValueFromLocalStorage("completed");
  const [tasks, setTasks] = useState<Task[]>(items);
  const [currentTaskValue, setCurrentTaskValue] = useState<string>("");
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [editTask, setEditTask] = useState<number>(-1);
  const [completedTask, setCompletedTask] = useState<Task[]>(completedItems);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputElement.current &&
        !inputElement.current.contains(event.target as Node) &&
        !currentTaskValue.length
      ) {
        sethidePlusAdd(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hidePlusAdd, currentTaskValue]);

  //on Enter click : KeyboardEvent<HTMLInputElement>
  function showPlusAddTask(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      setTasks(prev => {
        const newTaskList = [
          ...prev,
          { taskName: currentTaskValue, taskCompleted: false },
        ];
        saveToStorage("key", newTaskList);
        return newTaskList;
      });
      setCurrentTaskValue("");
      sethidePlusAdd(false);
    }
  }

  function addTask() {
    setCurrentTaskValue("");
    sethidePlusAdd(true);
  }

  function onMouseEnterFunction(index: number) {
    setHoveredIndex(index);
  }

  function onMouseLeaveFunction() {
    setHoveredIndex(-1);
    setEditTask(-1);
  }

  //onChange event : ChangeEvent<HTMLInputElement>
  function addInputToTask(event: ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    setCurrentTaskValue(value);
  }

  function markTaskComplete(index: number): void {
    const currentTask = [...tasks];
    const completedTask = {
      ...currentTask[index],
      taskCompleted: !currentTask[index].taskCompleted,
    };

    const updatedTasks = currentTask.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    if (completedTask) {
      setCompletedTask(prev => {
        const updatedTasks = [...prev, completedTask];
        saveToStorage("completed", updatedTasks);
        return updatedTasks;
      });
    }
  }

  function markTaskInComplete(index: number): void {
    const currentTask = [...completedTask];
    console.log(currentTask, "currentTask",index);
    const incompletedTask = {
      ...currentTask[index],
      taskCompleted: !currentTask[index].taskCompleted,
    };

    const updatedTasks = currentTask.filter((_, i) => i !== index);
    setCompletedTask(updatedTasks);
    if (incompletedTask) {
      setTasks(prev => {
        const updatedTasks = [...prev, incompletedTask];
        return updatedTasks;
      });
    }
  }

  function deleteTask(index: number): void {
    setTasks(prev => {
      const filteredTask = prev.filter((_, i) => (i === index ? false : true));
      saveToStorage("key", filteredTask);
      return filteredTask;
    });
  }

  function editThisTask(index: number): void {
    setEditTask(index);
  }

  function editInputOfTask(event: ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    console.log(value, "value**");
    setTasks(prev => {
      const editedTasks = prev.map((item, index) =>
        index === editTask ? { ...item, taskName: value } : item
      );
      saveToStorage("key", editedTasks);
      return editedTasks;
    });
  }

  return (
    <div id="tab_element_1">
      <h3>To Do List</h3>
      <div className="task_body_tab_element1">
        <div
          className={`plusAddTask_tab_element1 ${
            hidePlusAdd ? "hidden" : "visible"
          } `}
          onClick={addTask}
        >
          <button>+</button>
          <label>Add Task</label>
        </div>
        <div
          className={`input_tab_element1 ${
            hidePlusAdd ? "visible" : "hidden"
          } `}
        >
          <input
            value={currentTaskValue}
            ref={el => {
              if (el) el.focus();
              inputElement.current = el;
            }}
            onChange={event => addInputToTask(event)}
            onKeyDown={event => showPlusAddTask(event)}
          />
        </div>
      </div>
      <div className="task_list">
        {tasks.map((item, index) => (
          <div
            key={index}
            className={`task_item ${
              hoveredIndex === index ? "hoveredItem" : ""
            }`}
            onMouseEnter={() => onMouseEnterFunction(index)}
            onMouseLeave={onMouseLeaveFunction}
          >
            <input
              type="checkbox"
              checked={item?.taskCompleted}
              onChange={() => {}}
              onClick={() => markTaskComplete(index)}
            />
            <input
              ref={el => {
                if (editTask === index && el) {
                  console.log(el, "el**");
                  el.focus();
                }
              }}
              onChange={event => editInputOfTask(event)}
              className="label"
              value={item?.taskName}
              type="text"
              disabled={editTask !== index ? true : false}
            />

            {hoveredIndex === index && (
              <>
                <img
                  src={deleteSvg}
                  height={15}
                  width={15}
                  alt="deleteIcon"
                  onClick={() => deleteTask(index)}
                />
                <img
                  src={editSvg}
                  height={15}
                  width={15}
                  alt="editIcon"
                  onClick={() => editThisTask(index)}
                />
              </>
            )}
          </div>
        ))}
      </div>
      <div className="completed_task_list">
        <h3>Completed Tasks {completedTask?.length > 0 || ""}</h3>
        {completedTask.map((item, index) => (
          <div className="completed_task_item" key={item?.taskName + index}>
            <input
              type="checkbox"
              checked={item?.taskCompleted}
              onClick={() => markTaskInComplete(index)}
            />
            <label>{item?.taskName}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
