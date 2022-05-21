let inputText = document.querySelector(".input").firstElementChild
let btnText = document.querySelector(".input").lastElementChild
let tasks = document.querySelector(".tasks")

// delete task from tasks
let deleteBtns;

// add task to tasks
btnText.onclick = () => {
    if(inputText.value === ''){
        return
    }else{
        let myNewDiv = new Mytask(inputText.value)
        tasks.appendChild(myNewDiv.addToBody())
        inputText.value = ''
    }
    deleteBtns = document.querySelectorAll("#delete")
}


deleteBtns.forEach(deleteBtn => {
    // deleteBtn.addEventListener('click', () => {
    //     deleteBtn.parentElement.parentElement.remove()
    // })
    console.log(deleteBtn);
})


class Mytask{
    constructor(name){
        this.name = name
    }
    // methods 
    addToBody(){
        let newDiv = document.createElement("div")
        newDiv.classList.add("task")
        newDiv.innerHTML = `
        <span>${this.name}</span>
        <ul>
            <li>Done</li>
            <li>Edit</li>
            <li id="delete">Delete</li>
        </ul>
        `
        return newDiv
    }
    deleteFromBody(){
        document.querySelectorAll(".tasks").forEach(task => {
            task.parentElement.remove()
        })
    }
}