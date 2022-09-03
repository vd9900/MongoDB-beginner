const addBtn = document.querySelector(".btn1")
const editBtn = document.querySelector(".btn2")
const deleteBtn = document.querySelector(".btn3")
const task = document.querySelector(".task")
const taskBox = document.querySelector(".task-box")

window.addEventListener("click", (e) => {
    if(e.target.className === "btn1" ){

        const value = task.value;
        const li = document.createElement("LI")
        li.classList.add("flex-center")
        li.classList.add("tasks")
        li.innerHTML = `
        ${value}
        <div>
        <button class="btn2">edit</button>
        <button class="btn3">delete</button>
        </div>
        `
    taskBox.appendChild(li)
    task.value ="";
}
if(e.target.className=="btn3"){
    e.path[2].remove();
}

})
