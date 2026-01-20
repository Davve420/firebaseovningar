
import { usersRef,db } from "./modules/firebaseconfig.js";
import {ref, onValue, remove, update, push} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

let dbObj = {};

onValue(usersRef, snapshot => {
    dbObj = snapshot.val();
    const wrapper = document.querySelector('#users');
    wrapper.innerHTML = '';

    for(const key in dbObj){
        const h1 = document.createElement('h1');
        const delBtn = document.createElement('button');
        const userRef = ref(db, `/users/` + key);
        //referensen till usern 

        h1.innerText = dbObj[key].name;
        delBtn.innerText = 'X';
        
        if(dbObj[key].admin) h1.innerText += ' - admin';

        wrapper.append(h1, delBtn);  

        //Uppdaterar admin false till true eller true till false
        h1.addEventListener('click', ()=>{
            update(userRef, {admin: !dbObj[key].admin})
        })
        //Tar bort noden från databasen
        delBtn.addEventListener('click', ()=> {
            remove(userRef)
        })
    }
})


const form = document.querySelector('form')

form.addEventListener('submit', event =>{
    event.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const admin = form.querySelector('#admin').checked;


    const newID = push(usersRef).key;
    if(newID){
        for(const key in dbObj){
            if(dbObj[key].name === name){
                console.log('Username already exists');
                return;
            }
        }


        const newRef = ref(db, '/users/'+ newID);
        update(newRef, {name, admin})
    }
})













