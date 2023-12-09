let titleInp = document.querySelector(".title");
let descInp = document.querySelector(".desc");
let addTaskBtn = document.querySelector(".addTask");
let taskBody = document.querySelector(".todoTasks");

let titleVal = "";
let descVal = "";

window.onload = () => {
  let dataGot = JSON.parse(localStorage.getItem("data")) || [];
  if(dataGot.length > 1){
  displayTasks(dataGot);}
};

titleInp.addEventListener("keyup", (e) => {
  titleVal = e.target.value;
  if (e.key == "Enter") {
    // console.log('enter got');
    descInp.focus();
  }
  // console.log(titleVal);
});
descInp.addEventListener("keyup", (e) => {
  descVal = e.target.value;
  if (e.key == "Enter") {
    // console.log('enter got');
    addTaskFunction();
  }
  //   console.log(descVal);
});

let tasks = [];
console.log(tasks);
addTaskBtn.addEventListener("click", (e) => {

  // let dataGot = JSON.parse(localStorage.getItem("data"));
  //   let dataGot = JSON.parse(localStorage.getItem("data"));
  //   console.log(dataGot) || []
  //   tasks = dataGot

  //   tasks.push({ title: titleVal, desc: descVal, done: false });
  //   console.log(tasks);

  //   localStorage.setItem("data", JSON.stringify(tasks));

  addTaskFunction();
  // displayTasks(dataGot)
});

function addTaskFunction() {
  localStorage.setItem("data", JSON.stringify(tasks));
  let dataGot = JSON.parse(localStorage.getItem("data"));
  console.log(dataGot) || [];
  tasks = dataGot;

  tasks.push({ title: titleVal, desc: descVal, done: false });
  console.log(tasks);

  localStorage.setItem("data", JSON.stringify(tasks));

  displayTasks(dataGot);
  titleInp.value = "";
  descInp.value = "";
}

function displayTasks(data) {
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

function toggleStrike(cb, i) {
  let sb = cb.nextElementSibling;
  let dataGot = JSON.parse(localStorage.getItem("data"));
  console.log(dataGot);
  // if(i == dataGot.)
  if (i in dataGot) {
    dataGot[i].done = !dataGot[i].done;
  }
  // if()
  if (cb.checked) {
    sb.style.textDecoration = "line-through";
  } else {
    sb.style.textDecoration = "none";
  }
  // console.log(cb,i);
  console.log(dataGot);
  localStorage.setItem("data", JSON.stringify(dataGot));
}

function delF(i) {
  let dataGot = JSON.parse(localStorage.getItem("data"));
  console.log(dataGot);

  dataGot.splice(i, 1);

  localStorage.setItem("data", JSON.stringify(dataGot));
  displayTasks(dataGot);
}

function delCompTasks() {
  let dataGot = JSON.parse(localStorage.getItem("data"));
  console.log(dataGot);

  let undoneTasks = dataGot.filter((t) => t.done == false);
  console.log(undoneTasks);
  displayTasks(undoneTasks);

  localStorage.setItem("data", JSON.stringify(undoneTasks));
}
