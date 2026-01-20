import { ref, onValue, push, update } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";
import { usersRef, db } from "./firebaseconfig.js";

let dbObj = {};

onValue(usersRef, snapshot => {
    dbObj = snapshot.val();
    const wrapper = document.querySelector('#users');
    wrapper.innerHTML = '';
    
    for(const key in dbObj){

        const container = document.createElement('div');
        container.style.border = 'solid black 2px'
        const nameP = document.createElement('p');
        const ageP = document.createElement('p');
        const dateP = document.createElement('p');
        const emailP = document.createElement('p');
        const profileImage = document.createElement('img');
        nameP.innerText = dbObj[key].name;
        ageP.innerText = dbObj[key].age;
        dateP.innerText = dbObj[key].date;
        emailP.innerText = dbObj[key].email;
        profileImage.src = dbObj[key].image;
        profileImage.style.width = "300px";
        profileImage.style.height = "200px";
        container.append(profileImage,nameP,ageP,dateP,emailP);
        wrapper.append(container);
    }
})

const myForm = document.querySelector('form');
myForm.addEventListener('submit', event =>{
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(myForm));

    const { name, age, date, email, image } = formData;

    const newID = push(usersRef).key;
        if(newID){
        for(const key in dbObj){
            if(dbObj[key].email === email){
                console.log('Email is already registered');
                return;
            }
        }
        const newRef = ref(db, '/users/'+ newID);
        update(newRef,{name,age,date,email,image});
    }
})


/*function renderFD(){
    const myformData = new FormData(myForm, submitBtn);
    for (const [key, value] of myformData){

        const container = document.createElement('div');
        container.style.border = 'solid black 2px'
        const p = document.createElement('p');
        p.innerText = key + value;
        container.append(p);
        document.body.append(container);
    }
    
}*/