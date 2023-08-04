import {listProducts, createProduct} from './services/api.js';

let arrProductos = [];
const formulario = document.querySelector("form");
let pCount = null;
let idSelectedProduct = null;
let cart = [];
let total = null;
let imgCarousel = null;
let mainImgs = null

document.addEventListener('DOMContentLoaded',async()=>{
    try {
        await printProductos();
        const thumbnails = document.querySelectorAll('.thumbnail');

        mainImgs.forEach(mainImg => {
            thumbnails.forEach(thumbnail =>{
                if(thumbnail.attributes['data-id'].value == mainImg.attributes['data-id'].value){
                    thumbnail.addEventListener('click', ()=>{
                        mainImg.src = thumbnail.src;
                    });
                }
            })
        })
            
    } catch (error) {
        console.log(error)
    }

})

document.addEventListener('click', (event) =>  {

    if(event.target.classList.contains("counter-buttons")){
        idSelectedProduct = event.target.attributes['data-id'].value;
        const operacion = event.target.attributes["value"].nodeValue;
        const product = arrProductos.find(item => item.ID == idSelectedProduct);
        pCount.forEach(item =>{
            item.textContent = '';
            if(idSelectedProduct==item.attributes['data-id'].value){
                if(operacion == "+"){
                    product.contador += 1;
                }else if(operacion == "-" && product.contador>1){
                    product.contador -= 1;
                }
                item.textContent = product.contador;
            }
        })
    }

    if(event.target.classList.contains("addToCart")){
        $("[data-bs-toggle='popover']").popover('show');
        let html = document.getElementById("contenido");
        html.innerHTML = ``;
        idSelectedProduct = event.target.attributes['data-id'].value;
        const product = arrProductos.find(item => item.ID == idSelectedProduct)
        swal({
            title: product.nombre,
            type: "success",
            text: "This product has been added to your cart.",
            showConfirmButton: false,
            timer: 2500
        });
        if(cart.includes(product)){
            product.unidades += product.contador;
        }else{
            product.unidades = product.contador; 
            cart.push(product);
        }
        total = 0;
        cart.forEach(item => {
            total += item.precio*item.unidades;
            html.innerHTML += `
            <div class="row mb-2">
                <div class="col-5">
                    <img src=${item.imagenPrincipal[0]} alt="">
                </div>
                <div class="col-7">
                    <h6><b>${item.nombre}</b></h6>
                    <div class="row">
                        <p class="col-6" id="price-popover">$${item.precio}</p>
                        <p class="col-6" id="discount-popover">${item.descuento}% off</p>
                    </div>
                    <div class="row" style="justify-content: space-between">
                        <p id="units-popover" class="col-6">Units: ${item.unidades}</p>
                    </div>
                </div>
            </div>
            `
        });
           
        html.innerHTML += `
            <div class="row mb-2">
                <p class="col-12" id="price-popover">Total: $${total}</p>
            </div>
            <!-- Button trigger modal -->
            <button id="button-buy-now" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Buy now
            </button>
        `
        const btnBuy = document.getElementById("button-buy-now");    
        btnBuy.onclick = function(){
            $('#exampleModal2').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        if(cart.length > 0){
            const p = document.getElementById("p-cart");
            p.textContent = cart.length;
        }
    }

    if(event.target.classList.contains("mainImage")){

        idSelectedProduct = event.target.attributes['data-id'].value;
        console.log(idSelectedProduct);
        const product = arrProductos.find(item => item.ID == idSelectedProduct);
        console.log(imgCarousel);
        let i = 0;
        imgCarousel.forEach(item => {
            item.src = product.imagenPrincipal[i];
            i++;
        })
        $('#exampleModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }
})

const printProductos = async() => {

    arrProductos = await listProducts();
    let html = ``;
    arrProductos.forEach(item => {
        if(item.categoria == 'mujer'){
            const originalPrice = (item.precio/(1-(item.descuento/100))).toFixed(2);
        const li = `
        <section class="py-5 col-md-6 section">
            <div class="container">
                <a href="#" data-id="${item.ID}" data-bs-toggle="modal" data-bs-target="#exampleModal2"><img class="mainImage" data-id="${item.ID}" id="myImg" src=${item.imagenPrincipal[0]} alt="Imagen principal"></a>
                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body" style="background-color: rgba(0,0,0,0.9)">
                                <div id="carouselExampleFade" class="carousel slide carousel-fade">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="" class="d-block w-100" alt="...">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="" class="d-block w-100" alt="...">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="" class="d-block w-100" alt="...">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="" class="d-block w-100" alt="...">
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Thumbnails">
                    <a href="#"><img src=${item.imagenPrincipal[0]} alt="Miniatura1" class="thumbnail" data-id="${item.ID}"></a>
                    <a href="#"><img src=${item.imagenPrincipal[1]} alt="Miniatura1" class="thumbnail" data-id="${item.ID}"></a>
                    <a href="#"><img src=${item.imagenPrincipal[2]} alt="Miniatura1" class="thumbnail" data-id="${item.ID}"></a>
                    <a href="#"><img src=${item.imagenPrincipal[3]} alt="Miniatura1" class="thumbnail" data-id="${item.ID}"></a>
                </div>
                <!--<div id="myModal" class="modal">
                    <span class="close">&times;</span>
                    <img class="modal-content" id="img01">
                </div> -->
            </div>
        </section>
        <article class="py-5 col-md-6 article"> 
            <div class="Product-details">
                <h6>SNEAKER COMPANY</h6>
                <h1>${item.nombre}</h1>
                <p>${item.descripcion}</p>
                <div class="row price-discount">
                    <div class="Price">
                        <p>$${item.precio}</p>
                        <div id="cont50">
                            <p>${item.descuento}%</p>
                        </div>
                    </div>
                    <s id="descuento">$${originalPrice}</s>
                </div>
            </div>
            <div class="add-article">
                <div class="counter">
                    <button class="counter-buttons" value="-" data-id="${item.ID}">-</button>
                    <p class="p-count" data-id="${item.ID}">${item.contador}</p>
                    <button class="counter-buttons" value="+" data-id="${item.ID}">+</button>
                </div>
                <button type="button" id="Add-to-cart" class="addToCart" data-id="${item.ID}">
                    <img src="images/icon-cart.svg" alt="">
                    Add to cart
                </button>
            </div>
        </article>`
        html += li
        }
    });
    const ul = document.getElementById('listaProductos-women');
    ul.innerHTML = html;
    pCount = document.querySelectorAll(".p-count")
    pCount.value = 0;
    imgCarousel = document.querySelectorAll(".d-block");
    mainImgs = document.querySelectorAll('.mainImage')
    
}

formulario.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const formdata = new FormData(formulario);

    const jsonData = {};

    for (let [key, value] of formdata.entries()) {
        jsonData[key] = value;
    }

    await createProduct(jsonData);
    printProductos();
});