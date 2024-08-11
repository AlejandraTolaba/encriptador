// Declaración de variables

const llaves = {
    a:"ai",
    e:"enter",
    i:"imes",
    o:"ober",
    u:"ufat"
};

const inputTexto = document.querySelector("textarea");
const mensaje = document.getElementById("mensaje");
const botonEncriptar = document.querySelector(".boton__encriptar");
const botonDesencriptar = document.querySelector(".boton__desencriptar");
const imagenBuscando = document.querySelector(".imagen__buscando");
const mensajeNoEncontrado = document.querySelector(".mensaje__no__encontrado");
const botonCopiar = document.querySelector(".boton__copiar");
const contenedorPresentacionTexto = document.querySelector(".contenedor__presentacion__texto");
const mensajeIngresarTexto = mensaje.textContent;

/*********************************
    Declaración de Funciones
**********************************/

function agregarClase (elemento, clase){
    elemento.classList.add(clase);
}

function removerClase (elemento, clase){
    elemento.classList.remove(clase);
}

const modificarEstilosIniciales = () => {
    agregarClase(imagenBuscando,'ocultar');
    removerClase(imagenBuscando,'display');
    agregarClase(contenedorPresentacionTexto,'justify-content-between')
    agregarClase(mensajeNoEncontrado,'ocultar')
    agregarClase(mensaje, 'text-left');
    removerClase(botonCopiar,'ocultar');
}

const agregarEstilosIniciales = () => {
    removerClase(imagenBuscando,'ocultar');
    agregarClase(imagenBuscando,'display');
    removerClase(mensajeNoEncontrado,'ocultar')
    removerClase(mensaje,'text-left');
    agregarClase(botonCopiar,'ocultar');
    removerClase(contenedorPresentacionTexto,'justify-content-between');
}

function inicilizarPresentacionTexto () {
    agregarEstilosIniciales();
    mensaje.textContent = mensajeIngresarTexto;
}

function encriptar (texto){
    let textoEncriptado = texto;
    let claves = Object.keys(llaves);
    claves = claves.join('|')
    const er_claves = new RegExp(claves, "g");
    textoEncriptado = textoEncriptado.replace(er_claves, function(key){
        return llaves[key];
    });
    mensaje.textContent = textoEncriptado;
    // return mensaje.textContent;
}

botonEncriptar.addEventListener("click", () => {
    if (inputTexto.value) {
        modificarEstilosIniciales();
        encriptar(inputTexto.value);
    }
    else{
        inicilizarPresentacionTexto();
    }
});

function desencriptar (texto){
    let textoDesencriptado = texto;
    let valores = Object.values(llaves);
    valores = valores.join('|')
    const er_valores = new RegExp(valores, "g");
    textoDesencriptado = textoDesencriptado.replace(er_valores, function(valor){
        const llavesFiltradas = Object.entries(llaves).filter(([key, value]) => value === valor);
        const llavesObj = Object.fromEntries(llavesFiltradas);
        return Object.keys(llavesObj);
    });
    mensaje.textContent = textoDesencriptado;
    // return textoDesencriptado;
}

botonDesencriptar.addEventListener("click", () => {
    if (inputTexto.value) {
        modificarEstilosIniciales();
        desencriptar(inputTexto.value);   
    }
    else{
        inicilizarPresentacionTexto();
    }
});

botonCopiar.addEventListener("click", () => {
    navigator.clipboard.writeText(mensaje.textContent)
});