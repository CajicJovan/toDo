window.addEventListener("load", () => {
  const form = document.querySelector("#taskForm");
  const taskInput = document.getElementById("newTaskInput");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (tasks.length) {
    tasks.forEach(task => addTaskHtml(tasks, task))
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskText = taskInput.value;
    if (!taskText) {
      alert("Please fill out the to do task");
      return;
    }
    const task = { text: taskText }
    addToTasks(tasks, task)
    addTaskHtml(tasks, task)
    taskInput.value = "";
  });
});

function addToTasks(tasks, item){
  tasks.push(item)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function updateTask(tasks, item) {
  const index = tasks.findIndex(function(task){
    return task.text === item.text;
  })
  const updatedTodo = document.getElementById('edit-todo')
  tasks[index] = {text: updatedTodo.value}
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeFromTasks(tasks, item) {
  const index = tasks.findIndex(function(task){
    return task.text === item.text;
  })
  tasks.splice(index,1)
  console.log(tasks);
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function addTaskHtml(tasks, item){
  const listEl = document.getElementById("task");
  const taskEl = document.createElement("div");
  taskEl.classList.add("task");

  const taskContent = document.createElement("div");
  taskContent.classList.add("content");

  taskEl.appendChild(taskContent);

  const taskInput = document.createElement("input");
  taskInput.classList.add("text");
  taskInput.type = "text";
  taskInput.value = item.text;
  taskInput.id = 'edit-todo';
  taskInput.setAttribute("readonly", "readonly");

  taskContent.appendChild(taskInput);

  const taskAction = document.createElement("div");
  taskAction.classList.add("action");

  const taskEdit = document.createElement("button");
  taskEdit.classList.add("edit");
  taskEdit.innerText = "Edit";

  const taskDelete = document.createElement("button");
  taskDelete.classList.add("delete");
  taskDelete.innerText = "Delete";


  taskAction.appendChild(taskDelete);
  taskAction.appendChild(taskEdit);

  taskEl.appendChild(taskAction);

  listEl.appendChild(taskEl);

  taskEdit.addEventListener("click", (e) => {
     if (taskEdit.innerText.toLowerCase() === "edit") {
       taskEdit.innerText = "Save";
       taskInput.removeAttribute("readonly");
       taskInput.focus();
     } else {
       updateTask(tasks, item)
       taskEdit.innerText = "Edit";
       taskInput.setAttribute("readonly", "readonly");
     }
   });
  taskDelete.addEventListener("click", (e) => {
    listEl.removeChild(taskEl);
    removeFromTasks(tasks, item)
  });
}


