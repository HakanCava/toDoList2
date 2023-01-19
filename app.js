const todoInput=document.getElementById("input")

const addBtn=document.getElementById("btn")

const todoUl=document.querySelector(".ul-list")

let todoList=JSON.parse(localStorage.getItem("todoList"))||[]

window.addEventListener("load",()=>{

    getTodoListFromLocalStorage()
})

const getTodoListFromLocalStorage=()=>{
    
    todoList.forEach((todo)=>createTodo(todo))

}

addBtn.addEventListener("click",(e)=>{

    e.preventDefault()

    if(todoInput.value.trim()===""){
        alert("add something")
        return
    }

const newTodo={
    id:new Date().getTime(),
    completed:false,
    text:todoInput.value,
}

createTodo(newTodo)

todoList.push(newTodo)

localStorage.setItem("todoList",JSON.stringify(todoList))

e.target.closest("form").reset()

})

const createTodo=(newTodo)=>{

const {id,completed,text}=newTodo

const li=document.createElement("li")
li.setAttribute("id",id)

completed?li.classList.add("checked"):""

const icon=document.createElement("i")
icon.setAttribute("class","fa-solid fa-check")

li.append(icon)

const p=document.createElement("p")
p.innerText=text

li.append(p)

const removeIcon=document.createElement("i")
removeIcon.setAttribute("class","fas fa-trash")

li.append(removeIcon)

todoUl.append(li)


}





todoUl.addEventListener("click",(e)=>{

const idAttr=e.target.closest("li").getAttribute("id")
console.log(idAttr);

if(e.target.classList.contains("fa-check")){

    e.target.parentElement.classList.toggle("checked")

    todoList.map((todo)=>{

        if(todo.id==idAttr){todo.completed=!todo.completed}

    })


    localStorage.setItem("todoList",JSON.stringify(todoList))

}else if(e.target.classList.contains("fa-trash")){


    e.target.parentElement.remove()

    todoList=todoList.filter((todo)=>todo.id!=idAttr)

    localStorage.setItem("todoList",JSON.stringify(todoList))
}
console.log(todoList);
})


