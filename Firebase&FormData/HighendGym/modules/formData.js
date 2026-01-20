

const myForm = document.querySelector('form');
const submitBtn = document.querySelector('button');
myForm.addEventListener('submit', event =>{
    event.preventDefault()
    const myformData = new FormData(myForm, submitBtn);
    for (const [key, value] of myformData){

        console.log("key: " + key);
        console.log("value: " + value);
    }
    
    
})



