import "./style.css";

interface Task {
  taskName: string;
  taskCompconsted: boolean;
}
const tasks: Task[] = [];
const boxContainer = document.querySelector<HTMLDivElement>(".boxContainer");
const inputContainer = document.createElement("div");
const plusAddTask = document.createElement("div");
const buttonplus = document.createElement("button");
const addTaskLabel = document.createElement("label");

plusAddTask.classList.add("plusAddTask");
buttonplus.classList.add("addItemButton");
addTaskLabel.setAttribute("id", "addTask");

buttonplus.innerText = "+";
addTaskLabel.innerText = "Add task";

const inputTaskElement = document.createElement("input");
inputTaskElement.setAttribute("class", "inputTaskElement");

plusAddTask.append(buttonplus, addTaskLabel);
//inputcontainer has two children - inputTaskElement and plusAddTask
inputContainer?.append(inputTaskElement, plusAddTask);
//boxcontainer is having one child - inputContainer
boxContainer?.append(inputContainer);

//create Input and replace it with "+ add" task on click

function createTask(): void {
  plusAddTask.style.display = "none";
  inputTaskElement.style.display = "block";
  inputTaskElement.value = "";
  inputTaskElement.focus();
}

function addTask(event: KeyboardEvent): void {
  if (event.key === "Enter") {
    //on press enter will add current task to tasks and;
    const valueInput: string = inputTaskElement.value.trim();
    if (!valueInput) return;
    const obj: Task = {
      taskName: valueInput,
      taskCompconsted: true,
    };

    //add task to existing array and render list again
    tasks.push(obj);
    if (inputTaskElement) inputTaskElement.style.display = "none";
    plusAddTask.style.display = "block";
    showtasks(tasks);
  }
}

function createTaskElement(task: Task): HTMLDivElement {
  const showTaskElement = document.createElement("div");
  showTaskElement.setAttribute("class", "showTaskElement");

  const checkOffElement = document.createElement("input");
  checkOffElement.setAttribute("type", "checkbox");
  checkOffElement.checked = task?.taskCompconsted;

  const labelElement = document.createElement("label");
  labelElement.innerText = task?.taskName;
  showTaskElement.style.padding = "10px";
  showTaskElement.append(checkOffElement, labelElement);
  return showTaskElement;
}
function showtasks(tasks: Task[]) {
  if (boxContainer) {
    const fragment = document.createDocumentFragment();

    tasks.forEach(task => {
      const taskElement = createTaskElement(task);
      fragment.append(taskElement);
    });
    boxContainer.innerHTML = "";
    boxContainer.append(inputContainer, fragment);
  }
}

inputContainer?.addEventListener("click", createTask);
inputTaskElement.addEventListener("keydown", addTask);
