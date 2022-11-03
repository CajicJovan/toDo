window.addEventListener("load", () => {
  const form = document.querySelector("#taskForm");
  const textInput = document.getElementById("newTaskInput");
  const listEl = document.getElementById("task");

  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if(!tasks){
    tasks=[]
  }

  /* for (let i = 0; i < tasks.length; i++) {
    addTaskHtml(tasks[i])
  } */
  if(tasks.length){
    tasks.map(function(task){
      addTaskHtml(task)
    })
  }
  
  function removeFromTasks(item){
    const index = tasks.findIndex(function(task){
      return task.text == item.text;
    })
    tasks.splice(index,1)
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  function addToTasks(item){
    tasks.push(item)
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  function updateTask(item) {  
    
    tasks[index] = {text: tasks}
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  function addTaskHtml(item){
    const taskEl = document.createElement("div");
    taskEl.classList.add("task");

    const taskContent = document.createElement("div");
    taskContent.classList.add("content");

    taskEl.appendChild(taskContent);

    const taskInput = document.createElement("input");
    taskInput.classList.add("text");
    taskInput.type = "text";
    taskInput.value = item.text;
    taskInput.setAttribute("readonly", "readonly");

    taskContent.appendChild(taskInput);

    const taskAction = document.createElement("div");
    taskAction.classList.add("action");

   /*  const taskEdit = document.createElement("button");
    taskEdit.classList.add("edit");
    taskEdit.innerText = "Edit"; */

    const taskDelete = document.createElement("button");
    taskDelete.classList.add("delete");
    taskDelete.innerText = "Delete";

    
    taskAction.appendChild(taskDelete);
    /* taskAction.appendChild(taskEdit); */

    taskEl.appendChild(taskAction);

    listEl.appendChild(taskEl);
    
   /*  taskEdit.addEventListener("click", (e) => {
      if (taskEdit.innerText.toLowerCase() == "edit") {
        taskEdit.innerText = "Save";
        taskInput.removeAttribute("readonly");
        taskInput.focus();
        updateTask(item)
      } else {
        taskEdit.innerText = "Edit";
        taskInput.setAttribute("readonly", "readonly");
      }
    }); */
    taskDelete.addEventListener("click", (e) => {
      listEl.removeChild(taskEl);
      removeFromTasks(item)
    });
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = textInput.value;
    if (!text) {
      alert("Please fill out the to do task");
      return;
    }
    const task = { text: text }
    addToTasks(task)
    addTaskHtml(task)
    textInput.value = "";
   
  });
});

