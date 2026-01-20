import { getAll, post, patchInventory } from "./modules/firebase.js"


const renderProducts = data => {
    const container = document.querySelector('#container');
    container.innerHTML = '';
    console.log(data)
    for (const key in data){
        const productCard = document.createElement('div');
        productCard.classList.add('card')
        const productHeader = document.createElement('h2');
        const productImage = document.createElement('img');
        const productDescription = document.createElement('p');
        const productPrice = document.createElement('p');
        const productInventory = document.createElement('p')
        productInventory.innerText ='availabe: ' + data[key].inventory;
        productImage.src = data[key].image;
        productHeader.innerText = data[key].name;
        productDescription.innerText = data[key].description;
        productPrice.innerText = 'price: '+ data[key].price;
        productCard.append(
            productHeader,
            productImage,
            productDescription,
            productInventory,
            productPrice
        )
        container.appendChild(productCard);
        if(data[key].inventory > 0){
            const buyForm = document.createElement('form');
            const buyInput = document.createElement('input');
            const buyButton = document.createElement('button');
            buyInput.type = 'number'
            buyButton.innerText = 'Buy'
            buyForm.appendChild(buyInput);
            buyForm.appendChild(buyButton);
            buyForm.addEventListener('submit', async event =>{
                event.preventDefault();
                if(buyInput.value <= data[key].inventory){
                const newInventory = data[key].inventory - buyInput.value;
                await patchInventory(key, newInventory)
                getAll().then(renderProducts)
            }})
            productCard.appendChild(buyForm)
        }
    }
    
}

getAll().then(renderProducts)

document.querySelector('#post').addEventListener('submit', async event =>{
    event.preventDefault();
    const inputDescription = document.querySelector('#Description')
    const inputImage = document.querySelector('#Image')
    const inputInventory = document.querySelector('#Inventory')
    const inputName = document.querySelector('#Name')
    const inputPrice = document.querySelector('#Price')
    
        if(inputDescription.value.length > 0){
            const inventory = Number(inputInventory.value);
            const price = Number(inputPrice.value);
            if(inventory < 0){
                alert('Inventory måste vara 0 eller högre');
                return;
            }

            const imageUrl = inputImage.value.toLowerCase();
            if(!imageUrl.endsWith('.jpg') && !imageUrl.endsWith('.jpeg') && !imageUrl.endsWith('.png')){
                alert('Bilden måste sluta på .jpg, .jpeg eller .png');
                return;
            }
            
            await post({
                description: inputDescription.value,
                image: inputImage.value,
                inventory: inventory,
                name: inputName.value,
                price: price
            })
            const data = await getAll();
            for (const key in data){
                const productCard = document.createElement('div');
                productCard.classList.add('card')
                const productHeader = document.createElement('h2');
                const productImage = document.createElement('img');
                const productDescription = document.createElement('p');
                const productPrice = document.createElement('p');
                const productInventory = document.createElement('p')
                productInventory.innerText ='availabe: ' + data[key].inventory;
                productImage.src = data[key].image;
                productHeader.innerText = data[key].name;
                productDescription.innerText = data[key].description;
                productPrice.innerText = 'price: '+ data[key].price;
                productCard.appendChild(productDescription);
                productCard.appendChild(productInventory);
                productCard.appendChild(productPrice);
                productCard.appendChild(productImage);
                productCard.appendChild(productHeader);
                container.appendChild(productCard);
    } getAll().then(renderProducts)
        }
})