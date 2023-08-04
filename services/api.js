//Verbos http. Fetch es un método que se encarga de hacer la conexión http
const URL = 'http://localhost:3000'

export const createProduct = async (product) => {
    try {
        const response = await fetch(`${URL}/compradores`, {
            method: 'POST', //Verbo http
            headers: {'Content-Type': 'application/json'}, //Encabezado tipo de contenido: JSON
            body: JSON.stringify(product)
        });
        const createdProduct = await response.json(); //Espera la respuesta (del fetch) y las convierte en un json
        return createdProduct;
    } catch(e){
        console.log("Error: ", e)
    }
}

export const updateProduct = async(product) => {
    try {
            const response = await fetch(`${URL}/productos/${product.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        });
        const updatedProduct = await response.json();
        return updatedProduct;
    } catch(e){
        console.log("Error: ", e)
    }
}

export const listProducts = async () => { //Por defecto, se define que la petición es GET, por tanto, no hay que definirsela
    try {
        const response = await fetch('http://localhost:3000/productos') //La variable "response" espera a que el servidor responda
        const productsData = await response.json(); //Espera la respuesta (del fetch) y las convierte en un json
        return productsData;
    } catch(e) {
        console.log("Error: ", e)
    }
}


export const deleteProduct = async(id) => {
    try {
        const response = await fetch(`${URL}/productos/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
    
    } catch(e){
        console.log("Error: ", e)
    }
    
}