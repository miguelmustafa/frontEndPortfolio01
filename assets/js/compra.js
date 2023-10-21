const categoria = document.getElementById('categoria');
const resultado = document.getElementById('total');
const resumenBtn = document.getElementById('resumen');
const formularioCompra = document.getElementById('formularioCompra');
const formularioOrador = document.getElementById('formularioOrador');

let cantidad = 0;
let categoriaText = '';
let descuento = 0;

resumenBtn.addEventListener('click', calculaTicket);
formularioCompra.addEventListener('submit', function (e) {
    e.preventDefault();
})

formularioOrador.addEventListener('submit', function (e) {
    e.preventDefault();
})

document.getElementById('cantidad').addEventListener('input', function (x) {
    console.log(x.target.value);
    cantidad = x.target.value;
    calculaTicket();
})

document.getElementById('categoria').addEventListener('change', function (x) {
    categoriaText = x.target.value;
    console.log(categoriaText);
    const card = { currentTarget: document.getElementById(categoriaText) };
    console.log(card);
    categoriaChange(card);
    calculaTicket();
})

function categoriaChange(e) {
    document.querySelectorAll('.compra .card').forEach((x) => {
        x.classList.remove('activecard');
    })
    const cardSeleccionada = document.getElementById(e.currentTarget.id);
    cardSeleccionada.classList.add('activecard');
    categoria.value = cardSeleccionada.id;
    categoriaText = cardSeleccionada.id;
    calculaTicket();
}

function calculaTicket() {

    let totalpago = 0;
    if (cantidad === 0)
        return;

    if (categoriaText === 'estudiante') {
        descuento = 0.8;
    } else if (categoriaText === 'trainee') {
        descuento = 0.5;
    } else {
        descuento = 0.15;
    }

    console.log(cantidad, descuento);
    totalpago = (cantidad * 200) * (1 - descuento);
    console.log(totalpago);
    resultado.textContent = `Total a pagar: $ ${totalpago.toFixed(0)}`;
}