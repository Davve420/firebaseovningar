export class Task {
    #id;
    #task;
    #isDone;
    #url;

    constructor(id, task, done){
        this.#id = id;
        this.#task = task;
        this.#isDone = done;
        this.#url = `https://webb23-1babd-default-rtdb.europe-west1.firebasedatabase.app/todo-list/${this.#id}.json`
    }

    render(container){
        const taskDiv = document.createElement('div');
        const p = document.createElement('p');
        const delBtn = document.createElement('button');

        taskDiv.id = this.#id;
        taskDiv.classList.add('task');
        p.innerText = this.#task;
        delBtn.innerText = 'X';

        if(this.#isDone) p.classList.add('done');
        else delBtn.classList.add('hidden');

        p.addEventListener('click', ()=>{
            p.classList.toggle('done');
            delBtn.classList.toggle('hidden');
            this.toggleDone();
        })

        delBtn.addEventListener('click', ()=>{
            taskDiv.remove();
            this.deleteTask();
        })

        taskDiv.append(p, delBtn);
        container.append(taskDiv)
    }
    async toggleDone(){
        const options = {
            method: 'PATCH',
            body: JSON.stringify({done: !this.#isDone}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        const response = fetch(this.#url, options);
        if(!response.ok) throw new Error(response.status)
            const data = await response.json();
            console.log(data);
    }
    async deleteTask(){
        const options ={
            method: 'DELETE'
        }
        
        const response = fetch(this.#url, options);
        if(!response.ok) throw new Error(response.status)
            const data = await response.json();
            console.log(data);
    }
}

