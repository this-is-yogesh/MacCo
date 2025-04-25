import { KeyboardEvent, useState, useRef, useEffect, ChangeEvent } from "react";
import "./styles/App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import deleteSvg from "../public/assests/delete.svg";
import editSvg from "../public/assests/edit.svg";

interface Task {
  taskName: string;
  taskCompleted: boolean;
}
function App() {
  const [hidePlusAdd, sethidePlusAdd] = useState<boolean>(false);
  const inputElement = useRef<HTMLInputElement>(null);
  const [getValueFromLocalStorage, saveToStorage] = useLocalStorage<Task>();
  const items: Task[] = getValueFromLocalStorage("key");
  const [tasks, setTasks] = useState<Task[]>(items);
  const [currentTaskValue, setCurrentTaskValue] = useState<string>("");
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  useEffect(() => {
    if (hidePlusAdd && inputElement.current) {
      inputElement.current.focus();
    }
  }, [hidePlusAdd]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      console.log(currentTaskValue.length, "length");
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

  function showPlusAddTask(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const presentStateTask: Task[] = tasks;
      const newTaskAdded = [
        ...presentStateTask,
        {
          taskName: currentTaskValue,
          taskCompleted: false,
        },
      ];
      saveToStorage("key", newTaskAdded);
      setTasks(prev => [
        ...prev,
        {
          taskName: currentTaskValue,
          taskCompleted: false,
        },
      ]);
      setCurrentTaskValue("");
      sethidePlusAdd(false);
    }
  }

  function addTask() {
    setCurrentTaskValue("");
    sethidePlusAdd(true);
  }

  function onMouseEnterFunction(index: number) {
    console.log(index, "event*8");
    setHoveredIndex(index);
  }

  function onMouseLeaveFunction() {
    console.log("mouseleave");
    setHoveredIndex(-1);
  }

  function addInputToTask(event: ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    setCurrentTaskValue(value);
  }

  return (
    <div>
      <header className="header_app">To Do List Application</header>
      <main className="main_app">
        <div className="tab_bar">
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
                  ref={inputElement}
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
                  />
                  <label>{item?.taskName}</label>
                  {hoveredIndex === index && (
                    <>
                      <img
                        src={deleteSvg}
                        height={15}
                        width={15}
                        alt="deleteIcon"
                      />
                      <img
                        src={editSvg}
                        height={15}
                        width={15}
                        alt="editIcon"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div id="tab_element_2">
            <h3>Liked Task</h3>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
