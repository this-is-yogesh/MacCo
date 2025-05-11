import TasKElement from "./components/TaskElement";
function App() {
  return (
    <div>
      <header className="header_app">To Do List Application</header>
      <main className="main_app">
        <div className="tab_bar">
          <TasKElement />
        </div>
      </main>
    </div>
  );
}

export default App;
