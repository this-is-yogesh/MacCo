import { useState } from "react";
import "./styles/App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <header className="header_app">To Do List Application</header>
      <main className="main_app">
        <div className="tab_app">
          <div id="tab_element_1">
            <h3>To Do List</h3>
            <div className="task_body_tab_element1">
              <div className="plusAddTask_tab_element1">
                <button>+</button>
                <label>Add Task</label>
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
