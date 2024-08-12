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
const contenedorMensajeValidacion = document.querySelector(".contenedor__mensaje__validacion");
const icono = document.querySelector(".material-icons");
const imagenBuscando = document.querySelector(".imagen__buscando");
const mensajeNoEncontrado = document.querySelector(".mensaje__no__encontrado");
const botonCopiar = document.querySelector(".boton__copiar");
const contenedorPresentacionTexto = document.querySelector(".contenedor__presentacion__texto");
const mensajeIngresarTexto = mensaje.textContent;

/*********************************
    Declaración de Funciones
**********************************/

const agregarClase = (elemento, clase) => elemento.classList.add(clase);
const removerClase = (elemento, clase) => elemento.classList.remove(clase);
const limpiarInputTexto = () => inputTexto.value = "";

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

const inicilizarContenidoPresentacionTexto =  () => {
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
    return textoEncriptado;
}

inputTexto.addEventListener("input", (event) => {
    let texto = inputTexto.value;
    console.log(texto);
    const regex = new RegExp("^[a-z ]+$");
    const key = !event.data ? event.which : event.data;
    console.log(key);
    if (!regex.test(key)) {
        event.preventDefault();
        inputTexto.value = texto.substr(0,texto.length-1);
        agregarClase(contenedorMensajeValidacion,'alert-danger');
        icono.style.animation = "1.5s ease 0s infinite beat";
        contenedorMensajeValidacion.scrollIntoView({ block: "end", behavior: "smooth" });
        return false;
    }
    else{
        icono.style.animation = "none";
        removerClase(contenedorMensajeValidacion,'alert-danger');
    }
});

botonEncriptar.addEventListener("click", () => {
    if (inputTexto.value) {
        modificarEstilosIniciales();
        const textoEncriptado = encriptar(inputTexto.value);
        mensaje.textContent = textoEncriptado;
        limpiarInputTexto();
        contenedorPresentacionTexto.scrollIntoView({ block: "end", behavior: "smooth" });
    }
    else{
        inicilizarContenidoPresentacionTexto();
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
    return textoDesencriptado;
}

botonDesencriptar.addEventListener("click", () => {
    if (inputTexto.value) {
        modificarEstilosIniciales();
        const textoDesencriptado = desencriptar(inputTexto.value);  
        mensaje.textContent = textoDesencriptado; 
        limpiarInputTexto();
        contenedorPresentacionTexto.scrollIntoView({ block: "end", behavior: "smooth" });
    }
    else{
        inicilizarContenidoPresentacionTexto();
    }
});

botonCopiar.addEventListener("click", () => {
    navigator.clipboard.writeText(mensaje.textContent)
});