let carritoDeCompras = []
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById('carrito-contenedor');
const botonTerminar = document.getElementById('terminar')
const finCompra = document.getElementById('fin-compra')
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');
const selecTalles = document.getElementById('selecTalles')
const buscador = document.getElementById('search')
const carritoAbrir = document.getElementById('boton-carrito');
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

carritoAbrir.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active')
})
modalCarrito.addEventListener('click',(e)=>{
    e.stopPropagation()
})


function agregarAlCarrito(id) {
    let productoAgregar = stockProductos.find(item => item.id === id)
     console.log(productoAgregar)
     carritoDeCompras.push(productoAgregar)
     mostrarCarrito(productoAgregar)
     actualizarCarrito()
 
     localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
 }

 function mostrarCarrito(productoAgregar) {

    let div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML= `<div><p>${productoAgregar.nombre}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <button id=eliminar${productoAgregar.id} class="boton-eliminar"><i class="trash"></i></button></div>`
    contenedorCarrito.appendChild(div)

    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
    btnEliminar.addEventListener('click',()=>{
        btnEliminar.parentElement.remove()
        carritoDeCompras = carritoDeCompras.filter(ele => ele.id !== productoAgregar.id)
        actualizarCarrito()
        localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
    })

}


function  actualizarCarrito (){
   contadorCarrito.innerText = carritoDeCompras.length
   precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + el.precio, 0)
                                                               
}


function mostrarProductos() {
  stockProductos.forEach((el) => {
    let div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `<div class="card p-2 m-2 bg-secondary bg-gradient" style="width: 18rem;">
                            <div class="card-image">
                                <img src="${el.img}" class="card-img-top" style="height:12rem; object-fit:fill; ">
                                <h5 class="card-title mt-2" style="color:yellow;">${el.nombre}</h5>
                                <button id="boton${el.id}" class="btn btn-dark"><i class="bi bi-cart4" style="color: white;"></i> Agregar </button>
                            </div>
                            <div class="card-content">
                                <p class="text-white mt-2">${el.desc}</p>
                                <p class="text-white">Medidas: ${el.medidas}</p>
                                <p class="text-white"> $${el.precio}</p>
                            </div>
                        </div>`;

    contenedorProductos.appendChild(div);
    let btnAgregar = document.getElementById(`boton${el.id}`);
    btnAgregar.addEventListener("click", () => {
      agregarAlCarrito(el.id);
    });
  });
}
mostrarProductos();


