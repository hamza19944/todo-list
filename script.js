let inputText = document.querySelector(".input").firstElementChild
let btnText = document.querySelector(".input").lastElementChild
let tasks = document.querySelector(".tasks")

let myNewDiv; 
// add task to tasks
btnText.addEventListener("click", () => {
    myNewDiv = new Mytask(inputText.value)
    if(inputText.value === ''){
        return
    }else{
        tasks.appendChild(myNewDiv.addToBody())
        inputText.value = ''
    }
    // remove from body
    myNewDiv.deleteFromBody()
    myNewDiv.editTask()
    myNewDiv.taskDone()
    myNewDiv.addLocalStorage()
})
window.addEventListener("load", () => {
    let arr = getLocalStorage()
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        let myNewClass = new Mytask(element)
        tasks.appendChild(myNewClass.addToBody())
        myNewClass.deleteFromBody()
        myNewClass.editTask()
        myNewClass.taskDone()
    }
})

class Mytask{
    // static property
    static count = 1
    constructor(name){
        this.name = name
    }
    // methods 
    static createId(){
        return this.count++;
    }
    addToBody(){
        let newDiv = document.createElement("div")
        newDiv.classList.add("task")
        newDiv.innerHTML = `
        <span>${this.name}</span>
        <ul>
            <li class="done">Done</li>
            <li id="edit">Edit</li>
            <li id="delete">Delete</li>
        </ul>
        `
        return newDiv
    }
    deleteFromBody(){
        let deleteBtns = document.querySelectorAll("#delete")
        deleteBtns.forEach(deletebtn => {
            deletebtn.addEventListener("click", () => {
                deletebtn.parentElement.parentElement.remove()
                let text = deletebtn.parentElement.parentElement.querySelector('span').innerText
                console.log(text);
                let reg = /[a-z A-Z]/g
                for(let i = 0; i < localStorage.length; i++){
                    if(localStorage.getItem(localStorage.key(i)) === text){
                        localStorage.removeItem(localStorage.key(i))
                    }
                }
            })
        })
    }
    editTask(){
        let editBtns = document.querySelectorAll("#edit")
        editBtns.forEach(editBtn => {
            editBtn.onclick = () => {
                let text = editBtn.parentElement.parentElement.querySelector('span').innerText
                let createdInput = document.createElement("input")
                createdInput.value = text
                editBtn.parentElement.parentElement.querySelector('span').replaceWith(createdInput)

                createdInput.onkeypress = (e) => {
                    if(e.key === "Enter"){
                        text = createdInput.value
                        let span = document.createElement("span")
                        span.innerText = text
                        createdInput.replaceWith(span)
                    }
                }
            }
        })
    }
    taskDone(){
        document.querySelectorAll(".done").forEach(done => {
            done.onclick = () => {
                done.classList.add("active")
            }
        })
    }
    addLocalStorage(){
        localStorage.setItem(`${this.name + this.constructor.createId()}`, this.name)
    }   
}
function getLocalStorage(){
    let arr = []
    for (let i = 0; i < localStorage.length; i++) {
        const elementName = localStorage.getItem(localStorage.key(i));
        arr.push(elementName)
    }
    return arr
}