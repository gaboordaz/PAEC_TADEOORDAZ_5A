/* ================================
   elementos principales
================================ */

/* buscamos las partes del html que vamos a controlar */
const chat = document.getElementById("chat");
const opciones = document.getElementById("opciones");
const escribiendo = document.getElementById("escribiendo");


/* fotografía que se utiliza en los mensajes de Andrea */
const fotoProfesional =
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=100&q=80";


/* ================================
   obtener la hora
================================ */

/* obtiene la hora actual para colocarla en cada mensaje */
function obtenerHora() {

    const fecha = new Date();

    return fecha.toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit"
    });

}


/* ================================
   agregar mensajes
================================ */

/* agrega un mensaje nuevo dentro de la conversación */
function agregarMensaje(texto, tipo) {

    const nuevoMensaje = document.createElement("div");

    nuevoMensaje.classList.add("mensaje");


    /* mensaje enviado por el estudiante */
    if (tipo === "estudiante") {

        nuevoMensaje.classList.add("mensaje-estudiante");

        nuevoMensaje.innerHTML = `
            <p>${texto}</p>

            <span class="hora">
                ${obtenerHora()}
            </span>
        `;

    }


    /* mensaje enviado por Andrea */
    else {

        nuevoMensaje.classList.add("mensaje-profesional");

        nuevoMensaje.innerHTML = `
            <div class="encabezado-mensaje">

                <img
                    src="${fotoProfesional}"
                    alt="Andrea Martínez"
                    class="mini-foto">

                <strong>
                    Andrea
                </strong>

            </div>

            <p>
                ${texto}
            </p>

            <span class="hora">
                ${obtenerHora()}
            </span>
        `;

    }


    /* colocamos el mensaje al final del chat */
    chat.appendChild(nuevoMensaje);


    /* bajamos automáticamente hasta el último mensaje */
    chat.scrollTop = chat.scrollHeight;

}


/* ================================
   indicador de escritura
================================ */

/* muestra el mensaje de que Andrea está escribiendo */
function mostrarEscribiendo() {

    escribiendo.classList.remove("oculto");

}


/* oculta el mensaje de escritura */
function ocultarEscribiendo() {

    escribiendo.classList.add("oculto");

}


/* ================================
   mostrar opciones
================================ */

/*
    esta función recibe una lista de opciones
    y crea los botones automáticamente.
*/
function mostrarOpciones(lista) {

    /* eliminamos los botones anteriores */
    opciones.innerHTML = "";


    /* recorremos cada opción */
    lista.forEach(function (opcion) {

        /* creamos un botón */
        const boton = document.createElement("button");

        boton.type = "button";

        boton.textContent = opcion.texto;


        /*
            guardamos la información de la opción
            directamente en el botón.
        */
        boton.dataset.respuesta = opcion.respuesta;

        boton.dataset.siguientes =
            JSON.stringify(opcion.siguientes);


        /* agregamos el botón al contenedor */
        opciones.appendChild(boton);

    });

}


/* ================================
   detectar los botones
================================ */

/*
    en lugar de poner un evento individual
    a cada botón, escuchamos todos los clics
    que ocurran dentro de la sección de opciones.
*/
opciones.addEventListener("click", function (evento) {

    /* revisamos si realmente se presionó un botón */
    if (evento.target.tagName !== "BUTTON") {
        return;
    }


    /* guardamos el botón que fue seleccionado */
    const botonSeleccionado = evento.target;


    /* texto que eligió el estudiante */
    const textoEstudiante =
        botonSeleccionado.textContent;


    /* respuesta correspondiente de Andrea */
    const respuestaProfesional =
        botonSeleccionado.dataset.respuesta;


    /* recuperamos las siguientes opciones */
    const siguientes =
        JSON.parse(botonSeleccionado.dataset.siguientes);


    /* mostramos la selección del estudiante */
    agregarMensaje(
        textoEstudiante,
        "estudiante"
    );


    /* quitamos temporalmente los botones */
    opciones.innerHTML = "";


    /* mostramos que Andrea está escribiendo */
    mostrarEscribiendo();


    /*
        esperamos un momento para que parezca
        una conversación real.
    */
    setTimeout(function () {

        /* quitamos el indicador */
        ocultarEscribiendo();


        /* mostramos la respuesta */
        agregarMensaje(
            respuestaProfesional,
            "profesional"
        );


        /*
            si todavía existen opciones,
            las mostramos.
        */
        if (siguientes.length > 0) {

            mostrarOpciones(siguientes);

        }


        /*
            si ya no hay opciones,
            mostramos un mensaje final.
        */
        else {

            mostrarOpciones([

                {
                    texto: "Quiero seguir hablando",

                    respuesta:
                        "Claro. Podemos continuar desde lo que acabas de compartir. También puedes acercarte a una persona de confianza si necesitas apoyo fuera de este espacio.",

                    siguientes: [

                        {
                            texto: "Gracias por escucharme",

                            respuesta:
                                "Gracias a ti por darte el espacio para hablar. Recuerda que pedir ayuda y buscar orientación también es una forma de cuidarte.",

                            siguientes: []
                        },

                        {
                            texto: "Quiero regresar al inicio",

                            respuesta:
                                "Por supuesto. Podemos comenzar nuevamente y explorar cómo te has estado sintiendo.",

                            siguientes: inicio
                        }

                    ]
                },

                {
                    texto: "Terminar conversación",

                    respuesta:
                        "Gracias por participar. Recuerda que esta conversación es una simulación educativa y que, si necesitas apoyo real, puedes acercarte a un adulto de confianza, orientador escolar o profesional de la salud.",

                    siguientes: []
                }

            ]);

        }

    }, 1000);

});


/* ================================
   conversación inicial
================================ */

/*
    aquí comienza el recorrido.
    cada opción contiene:

    texto = lo que aparece en el botón

    respuesta = lo que responde Andrea

    siguientes = las opciones que aparecen después
*/

const inicio = [

    {
        texto: "Me he sentido bien",

        respuesta:
            "Me alegra saberlo. Incluso cuando nos sentimos bien, cuidar nuestro bienestar y tener personas con quienes hablar sigue siendo importante.",

        siguientes: [

            {
                texto: "Quiero aprender a cuidar mi bienestar",

                respuesta:
                    "Eso es un buen comienzo. Dormir adecuadamente, organizar tus actividades, mantener vínculos positivos y darte espacios de descanso puede ayudarte a mantener un equilibrio.",

                siguientes: [

                    {
                        texto: "También quiero mejorar en la escuela",

                        respuesta:
                            "El bienestar y el rendimiento académico están relacionados. Cuando tienes herramientas para manejar lo que ocurre a tu alrededor, también puedes encontrar mejores condiciones para aprender.",

                        siguientes: []

                    }

                ]

            },


            {
                texto: "A veces tengo días difíciles",

                respuesta:
                    "Es normal atravesar días complicados. Lo importante es no sentir que tienes que enfrentarlos completamente solo.",

                siguientes: [

                    {
                        texto: "Quiero hablar de ellos",

                        respuesta:
                            "Claro. Puedes comenzar contando qué suele hacer que esos días sean más difíciles para ti.",

                        siguientes: [

                            {
                                texto: "La presión de la escuela",

                                respuesta:
                                    "La presión académica puede sentirse pesada. Hablar de lo que te preocupa puede ayudarte a organizar el problema y buscar apoyo.",

                                siguientes: []

                            },


                            {
                                texto: "Problemas personales",

                                respuesta:
                                    "Las situaciones personales también pueden afectar nuestra concentración y motivación. No tienes que explicar algo que no quieras compartir.",

                                siguientes: []

                            }

                        ]

                    }

                ]

            }

        ]

    },


    {
        texto: "Más o menos",

        respuesta:
            "Gracias por decirlo. A veces es difícil explicar exactamente qué ocurre. Podemos ir poco a poco.",

        siguientes: [

            {
                texto: "Me cuesta concentrarme",

                respuesta:
                    "Cuando tenemos muchas cosas en la cabeza, concentrarnos puede resultar más difícil. ¿Qué crees que está ocupando más tu atención?",

                siguientes: [

                    {
                        texto: "La escuela",

                        respuesta:
                            "Las tareas, exámenes y expectativas pueden acumularse. Una opción es hablar con un maestro, orientador o adulto de confianza para organizar lo que necesitas.",

                        siguientes: []

                    },


                    {
                        texto: "Cosas personales",

                        respuesta:
                            "Los problemas personales pueden ocupar mucho espacio mental. Eso no significa que seas flojo o incapaz de estudiar.",

                        siguientes: []

                    }

                ]

            },


            {
                texto: "No sé exactamente qué me pasa",

                respuesta:
                    "Está bien no tener una respuesta inmediata. A veces reconocer que algo no se siente bien es suficiente para comenzar a buscar apoyo.",

                siguientes: [

                    {
                        texto: "Quiero seguir hablando",

                        respuesta:
                            "Claro. Puedes contarme qué ha cambiado últimamente en tu rutina, tus clases o tus relaciones.",

                        siguientes: []

                    }

                ]

            }

        ]

    },


    {
        texto: "No me he sentido bien",

        respuesta:
            "Gracias por confiar en este espacio. No tienes que contar todo de una vez. Podemos comenzar por entender qué ha cambiado.",

        siguientes: [

            {
                texto: "Estoy desmotivado",

                respuesta:
                    "La falta de motivación puede aparecer cuando una persona está atravesando estrés, cansancio o situaciones emocionales difíciles. No significa que no te importe tu futuro.",

                siguientes: [

                    {
                        texto: "Ya no disfruto algunas cosas",

                        respuesta:
                            "Cuando dejamos de disfrutar actividades que antes nos interesaban, vale la pena hablarlo con alguien de confianza y observar cómo ha cambiado nuestra rutina.",

                        siguientes: []

                    },


                    {
                        texto: "Me está afectando en la escuela",

                        respuesta:
                            "Cuando nuestro bienestar emocional afecta las clases, las tareas o la motivación, pedir apoyo puede ser especialmente importante.",

                        siguientes: []

                    }

                ]

            },


            {
                texto: "Me estoy aislando",

                respuesta:
                    "Alejarse de otras personas puede hacer que los problemas parezcan todavía más difíciles. Tener al menos una persona con quien hablar puede ser un primer paso.",

                siguientes: [

                    {
                        texto: "No sé con quién hablar",

                        respuesta:
                            "Puedes comenzar con un adulto en quien tengas confianza. También puede ser un orientador escolar, docente, familiar o profesional de la salud.",

                        siguientes: []

                    },


                    {
                        texto: "Hay alguien en quien confío",

                        respuesta:
                            "Podrías considerar acercarte a esa persona y decirle simplemente que necesitas hablar. No necesitas tener todo explicado.",

                        siguientes: []

                    }

                ]

            }

        ]

    },


    {
        texto: "Hay algo que me preocupa",

        respuesta:
            "Está bien. Puedes hablar de ello solamente hasta donde te sientas cómodo. ¿Tiene más relación con tu escuela o con algo personal?",

        siguientes: [

            {
                texto: "Tiene que ver con la escuela",

                respuesta:
                    "Entiendo. Los problemas académicos pueden sentirse muy pesados cuando parecen acumularse. Podemos pensar en buscar apoyo dentro de la escuela.",

                siguientes: [

                    {
                        texto: "Mis calificaciones han bajado",

                        respuesta:
                            "Una baja en las calificaciones puede tener muchas causas. En lugar de asumir que es falta de esfuerzo, puede ser útil revisar qué está dificultando tu concentración o motivación.",

                        siguientes: []

                    },


                    {
                        texto: "Siento demasiada presión",

                        respuesta:
                            "Sentir presión durante una etapa escolar exigente puede ser difícil. Hablar con un adulto de confianza puede ayudarte a encontrar maneras de organizar las responsabilidades.",

                        siguientes: []

                    }

                ]

            },


            {
                texto: "Es algo personal",

                respuesta:
                    "Gracias por confiarlo. Las situaciones personales pueden influir mucho en cómo estudiamos, convivimos y nos sentimos.",

                siguientes: [

                    {
                        texto: "Quiero hablar, pero me da miedo",

                        respuesta:
                            "Puedes avanzar a tu propio ritmo. Si algo te preocupa, considera buscar a una persona adulta de confianza que pueda escucharte y acompañarte.",

                        siguientes: []

                    }

                ]

            }

        ]

    }

];


/* ================================
   iniciar conversación
================================ */

/* mostramos las primeras opciones al abrir la página */
mostrarOpciones(inicio);
