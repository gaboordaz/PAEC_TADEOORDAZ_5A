const mensajes = [
    "A veces, escuchar sin juzgar puede ser el primer paso.",
    "Preguntar '¿cómo estás?' puede abrir una conversación importante.",
    "No tienes que resolver los problemas de alguien para demostrarle que te importa.",
    "La salud mental también forma parte del bienestar escolar.",
    "Pedir ayuda es una forma de cuidar de uno mismo.",
    "Una comunidad que escucha también puede prevenir el aislamiento.",
    "La curiosidad no consiste en querer saberlo todo, sino en nunca dejar de preguntarnos que más hay que comprender."
];

let indice = 0;

const boton = document.getElementById("botonMensaje");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", function () {

    indice++;

    if (indice >= mensajes.length) {
        indice = 0;
    }

    mensaje.style.opacity = "0";

    setTimeout(function () {
        mensaje.textContent = mensajes[indice];
        mensaje.style.opacity = "1";
    }, 200);

});
