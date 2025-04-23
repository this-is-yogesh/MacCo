import { KeyboardEvent, useState, useRef, useEffect } from "react";
import "./styles/App.css";

function App() {
  const [hidePlusAdd, sethidePlusAdd] = useState<boolean>(false);
  const inputElement = useRef<HTMLInputElement>(null);

  function plusAddTask(): void {
    sethidePlusAdd(true);
    inputElement.current?.focus();
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
                onClick={plusAddTask}
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
                  ref={inputElement}
                  onKeyDown={event => showPlusAddTask(event)}
                />
              </div>
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
