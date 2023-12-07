let titleInp = document.querySelector(".title");
let descInp = document.querySelector(".desc");
let addTaskBtn = document.querySelector(".addTask");
let taskBody = document.querySelector(".todoTasks");

let titleVal = "";
let descVal = "";

window.onload = ()=>{
      let dataGot = JSON.parse(localStorage.getItem("data"));
      displayTasks(dataGot)

}

titleInp.addEventListener("change", (e) => {
  titleVal = e.target.value;
  // console.log(titleVal);
});
descInp.addEventListener("change", (e) => {
  descVal = e.target.value;
  //   console.log(descVal);
});

let tasks = [];
console.log(tasks);
addTaskBtn.addEventListener("click", (e) => {

  tasks.push({ title: titleVal, desc: descVal, done: false });
  console.log(tasks);

  localStorage.setItem("data", JSON.stringify(tasks));

  let dataGot = JSON.parse(localStorage.getItem("data"));
  console.log(dataGot);

displayTasks(dataGot)

});

function displayTasks(data){
    let displayItems = data.map((d,i) => {
      let item = `<div class="taskI">
<input type="checkbox" name="" id="">
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

function delF(i){
    let dataGot = JSON.parse(localStorage.getItem("data"));
    console.log(dataGot);

    dataGot.splice(i,1)

    localStorage.setItem("data", JSON.stringify(dataGot));
    displayTasks(dataGot)

}