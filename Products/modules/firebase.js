const baseUrl = 'https://webb23-1babd-default-rtdb.europe-west1.firebasedatabase.app/products'


export const getAll = async ()=>{
    const url = baseUrl + '.json';

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

export const post = async (info)=>{


    const url = baseUrl + '.json';
    const options = {
        method: 'POST',
        body: JSON.stringify(info),
        headers:{
            "Content-type": "application/json; charset=UTF-8"
        }
    }
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
}

export const patchInventory = async (key, inventory)=>{
    const info = {
        inventory: inventory 
    }

    
    const url = baseUrl + `/${key}.json`;
    const options = {
        method: 'PATCH',
        body: JSON.stringify(info),
        headers:{
            "Content-type": "application/json; charset=UTF-8"
        }
    }
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
}
