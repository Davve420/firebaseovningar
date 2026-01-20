import { Task } from "./modules/Task.js";
import { getAll, postTask } from "./modules/firebase.js";

let tasks = [];

const handleTasks =  data => {
    for(const key in data){
        // console.log(key, data[key])
        tasks.push(new Task(key, data[key].task, data[key].done ) )
    }

    console.log(tasks)
    const taskWrapper = document.querySelector('#taskWrapper')
    taskWrapper.innerHTML = '';

    tasks.forEach(task => task.render(taskWrapper))
}

getAll()
    .then(handleTasks)

const form = document.querySelector('form');
form.addEventListener('submit', event =>{
    event.preventDefault();

    const newTask = form.querySelector('input').value.trim();
    if(newTask){
        // console.log('inte tom')
        // När post requesten är färdig, behöver vi hämta alla tasks för att kunna visa dem inklusive den senaste vi la till
        postTask(newTask)
            .then( getAll )
            .then(handleTasks );
    }
})