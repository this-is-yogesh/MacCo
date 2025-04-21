import "./style.css";

interface Task {
  taskName: string;
  taskCompleted: boolean;
}
let tasks: Task[] = [];
document.addEventListener("DOMContentLoaded", loadDOMContent);
function loadDOMContent() {
  const boxContainer = document.querySelector<HTMLDivElement>(".boxContainer");

  //+add task
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
  inputContainer?.append(inputTaskElement, plusAddTask);
  //+add task

  //task list
  const showTaskElementContainer = document.createElement("div");
  showTaskElementContainer.classList.add("showTaskElementContainer");
  //task list

  //+add task and task list added to boxContainer
  const orderedList = document.createElement("ol");
  orderedList.setAttribute("type", "a");
  const orderedListFragment = document.createDocumentFragment();
  new Array(21).fill(0).forEach((_, index) => {
    const childList = document.createElement("li");
    childList.innerText = index.toString();
    orderedListFragment.append(childList);
  });
  orderedList.append(orderedListFragment);
  boxContainer?.append(orderedList, inputContainer, showTaskElementContainer);
  //+add task and task list added to boxContainer

  //create Input and replace it with "+ add" task on click
  function createTask(): void {
    plusAddTask.style.display = "none";
    inputTaskElement.style.display = "block";
    inputTaskElement.value = "";
    inputTaskElement.focus();
  }

  function addTask(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      //on press enter will add current task to tasks
      const valueInput: string = inputTaskElement.value.trim();
      if (!valueInput) return;
      const obj: Task = {
        taskName: valueInput,
        taskCompleted: false,
      };

      //add task to existing array
      tasks.push(obj);
      if (inputTaskElement) inputTaskElement.style.display = "none";
      plusAddTask.style.display = "block";
      showtasks(obj);
    }
  }

  function attachIcons(task: Task): HTMLDivElement {
    const iconsContainer = document.createElement("div");
    iconsContainer.classList.add("iconsContainer");
    const deleteImg = document.createElement("img");
    deleteImg.addEventListener("click", () => {
      const index = tasks.indexOf(task);
      if (index !== -1) {
        tasks.splice(index, 1);
        showTaskElementContainer.removeChild(
          showTaskElementContainer.children[index]
        );
      }
    });
    deleteImg.style.cursor = "pointer";
    deleteImg.classList.add("deleteIcon");
    deleteImg.src = "./assests/delete.svg";
    deleteImg.alt = "Delete";
    deleteImg.width = 20;
    deleteImg.height = 20;
    const editImg = document.createElement("img");
    editImg.classList.add("editIcon");
    editImg.style.cursor = "pointer";
    editImg.classList.add("deleteIcon");
    editImg.src = "./assests/edit.svg";
    editImg.alt = "Edit";
    editImg.width = 20;
    editImg.height = 20;
    iconsContainer.append(deleteImg, editImg);
    return iconsContainer;
  }

  function createTaskElement(task: Task): HTMLDivElement {
    const showTaskElement = document.createElement("div");
    showTaskElement.classList.add("showTaskElement");

    const checkOffElement = document.createElement("input");
    checkOffElement.classList.add("checkOffElement");
    checkOffElement.setAttribute("type", "checkbox");
    checkOffElement.checked = task?.taskCompleted;

    const labelElement = document.createElement("input");
    labelElement.classList.add("labelElement");
    labelElement.value = task?.taskName;
    const iconsContainer = attachIcons(task);
    const editIcon = iconsContainer.querySelector(".editIcon");
    editIcon?.addEventListener("click", () => {
      labelElement.focus();
      labelElement.addEventListener("input", event => {
        const currentValue = (event.target as HTMLInputElement).value;
        const currentTask = tasks.indexOf(task);
        tasks[currentTask].taskName = currentValue;
        event.stopPropagation();
      });
    });
    checkOffElement.addEventListener("change", e => {
      const isChecked = checkOffElement.checked;
      const selectedTask = tasks.indexOf(task);
      tasks[selectedTask].taskCompleted = isChecked;
      console.log(e.target, "target*", tasks);
      if (isChecked) {
        labelElement.classList.add("strike-through");
        iconsContainer.classList.add("strike-through");
      } else {
        labelElement.classList.remove("strike-through");
        iconsContainer.classList.remove("strike-through");
      }
    });
    showTaskElement.append(checkOffElement, labelElement, iconsContainer);
    return showTaskElement;
  }
  function showtasks(task: Task) {
    const fragment = document.createDocumentFragment();
    const taskElement = createTaskElement(task);
    fragment.append(taskElement);
    showTaskElementContainer.append(fragment);
  }

  inputContainer?.addEventListener("click", createTask);
  inputTaskElement.addEventListener("keydown", addTask);
}
