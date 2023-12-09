let titleInp = document.querySelector(".title");
let descInp = document.querySelector(".desc");
let addTaskBtn = document.querySelector(".addTask");
let taskBody = document.querySelector(".todoTasks");

let titleVal = "";
let descVal = "";

let tasks = [];

window.onload = () => {
  tasks = getData() || [];
  // if (tasks.length > 1) {
  //   displayTasks(tasks);
  // }
  displayTasks(tasks);
};

titleInp.addEventListener("keyup", (e) => {
  titleVal = e.target.value;
  if (e.key == "Enter") {
    descInp.focus();
  }
});
descInp.addEventListener("keyup", (e) => {
  descVal = e.target.value;
  if (e.key == "Enter") {
    addTaskFunction();
  }
});

// console.log(tasks);
addTaskBtn.addEventListener("click", (e) => {
  addTaskFunction();
});

function addTaskFunction() {
  setData();
  tasks = getData();

  if (titleVal == "" && descVal == "") {
    alert("add Something first !");
  } else {
    tasks.push({ title: titleVal, desc: descVal, done: false });
    console.log(tasks);

    setData();

    displayTasks(tasks);
    titleInp.value = "";
    descInp.value = "";
    titleVal = "";
    descVal = "";
  }
}

function displayTasks(data) {
  if (data.length < 1) {
    taskBody.innerHTML = "<h3>No Todo's Available</h3>";
  } else {
    let displayItems = data.map((d, i) => {
      let item = `<div class="taskI">
<input type="checkbox" name="" id="${i}" onchange='toggleStrike(this,${i})' ${
        d.done ? "checked" : ""
      }>
<div class="task">
    <p class="titleTxt">${d.title}</p>
    <p class="descTxt">${d.desc}</p>
    
</div>
<button class="delTask" onclick=delF(${i})>Delete</button>
</div>`;
      return item;
    });

    taskBody.innerHTML = displayItems.join("");
  }
}

function toggleStrike(cb, i) {

  let sb = cb.nextElementSibling;
  tasks = getData();
  if (i in tasks) {
    tasks[i].done = !tasks[i].done;
  }
  if (cb.checked) {
    sb.style.textDecoration = "line-through";
  } else {
    sb.style.textDecoration = "none";
  }
  setData();
}

function delF(i) {

  tasks = getData();

  tasks.splice(i, 1);

  setData();

  displayTasks(tasks);
}

function delCompTasks() {
  tasks = getData();

  if (tasks.length == 0) {
    alert("No tasks to delete");
  }

  tasks = tasks.filter((t) => t.done == false);

  displayTasks(tasks);

  setData();
}

function getData() {
  return JSON.parse(localStorage.getItem("data"));
}
function setData() {
  localStorage.setItem("data", JSON.stringify(tasks));
}
