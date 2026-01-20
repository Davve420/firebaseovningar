const url = 'https://webb23-1babd-default-rtdb.europe-west1.firebasedatabase.app/todo-list.json';


export const getAll = async () =>{

    const response = await fetch(url);
    if(!response.ok) throw new Error(response.status);
    
    const tasks = await response.json();
    return tasks;
}

export const postTask = async task => {
    const newTask = {task, done: false};
    const options = {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }
    
    const response = await fetch(url, options);
    if(!response.ok) throw new Error(response.status);
    const newID = await response.json();
    console.log(newID);
}