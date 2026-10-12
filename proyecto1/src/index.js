import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from "sweetalert2";
import Acciones from "./Acciones.js";
import { atkBasico, atkEspecial } from "./interfaz.js";

const btn_player1 = document.getElementById("btn_player1");
const btn_player2 = document.getElementById("btn_player2");
const player1 = document.getElementById("py1");
const player2 = document.getElementById("py2");
const nombre1 = document.getElementById("player1");
const nombre2 = document.getElementById("player2");
const nombres = document.getElementById("nombres");
const batalla = document.getElementById("batalla");

const username1 = document.getElementById("username1");
const personaje1 = document.getElementById("personaje1");
const img1 = document.getElementById("img1");

const username2 = document.getElementById("username2");
const personaje2 = document.getElementById("personaje2");
const img2 = document.getElementById("img2");

let pj1 = "", pj2 = "";
let jugador1, jugador2;

// --- Sistema de turnos ---
const MAX_ESPECIALES = 2;
const TURNOS_ENTRE_ESPECIALES = 2;
const ENFRIAMIENTO_INICIAL = TURNOS_ENTRE_ESPECIALES - 1; 

const MAX_SEMILLAS = 2;

let turnoActual = 1;
let partidaTerminada = false;

let especialesJ1 = MAX_ESPECIALES;
let especialesJ2 = MAX_ESPECIALES;
let enfriamientoJ1 = ENFRIAMIENTO_INICIAL;
let enfriamientoJ2 = ENFRIAMIENTO_INICIAL;

let semillasJ1 = MAX_SEMILLAS;
let semillasJ2 = MAX_SEMILLAS;

const botonesP1 = [...document.getElementById("btn-py1").querySelectorAll("button")];
const botonesP2 = [...document.getElementById("btn-py2").querySelectorAll("button")];

const actualizarTextoEspecial = () => {
    botonesP1[1].innerText = `ATK Especial (${especialesJ1})`;
    botonesP2[1].innerText = `ATK Especial (${especialesJ2})`;
    botonesP1[3].innerText = `Semilla (${semillasJ1})`;
    botonesP2[3].innerText = `Semilla (${semillasJ2})`;

    const ayudaEsp = (especiales, enfriamiento) => {
        if (especiales <= 0) return "Ya no te quedan ataques especiales en esta partida";
        if (enfriamiento > 0) return `Debes esperar ${enfriamiento} turno(s) tuyo(s) para usarlo`;
        return "¡Ataque especial disponible!";
    };

    botonesP1[1].title = ayudaEsp(especialesJ1, enfriamientoJ1);
    botonesP2[1].title = ayudaEsp(especialesJ2, enfriamientoJ2);

    botonesP1[3].title = semillasJ1 > 0 ? "Cura vida, Ki y energía" : "Ya no te quedan semillas";
    botonesP2[3].title = semillasJ2 > 0 ? "Cura vida, Ki y energía" : "Ya no te quedan semillas";
}

const actualizarBotonesTurno = () => {
    actualizarTextoEspecial();

    if (partidaTerminada) {
        botonesP1.forEach((btn) => btn.disabled = true);
        botonesP2.forEach((btn) => btn.disabled = true);
        return;
    }
    const esTurno1 = turnoActual === 1;
    botonesP1.forEach((btn) => btn.disabled = !esTurno1);
    botonesP2.forEach((btn) => btn.disabled = esTurno1);

    if (especialesJ1 <= 0 || enfriamientoJ1 > 0) botonesP1[1].disabled = true;
    if (especialesJ2 <= 0 || enfriamientoJ2 > 0) botonesP2[1].disabled = true;
    if (semillasJ1 <= 0) botonesP1[3].disabled = true;
    if (semillasJ2 <= 0) botonesP2[3].disabled = true;
}

const pasarTurno = (usoEspecial = false) => {
    if (partidaTerminada) return;

    if (turnoActual === 1) {
        enfriamientoJ1 = usoEspecial
            ? TURNOS_ENTRE_ESPECIALES - 1
            : Math.max(0, enfriamientoJ1 - 1);
    } else {
        enfriamientoJ2 = usoEspecial
            ? TURNOS_ENTRE_ESPECIALES - 1
            : Math.max(0, enfriamientoJ2 - 1);
    }

    turnoActual = turnoActual === 1 ? 2 : 1;
    actualizarBotonesTurno();

    const jugadorEnTurno = turnoActual === 1 ? jugador1 : jugador2;
    Swal.fire({
        icon: "info",
        title: `Turno de ${jugadorEnTurno.getNombre()}`,
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500
    });
}
// --- Fin sistema de turnos ---

const iniciar_jugador1 = () => {
    username1.innerText = nombre1.value;
    personaje1.innerText = pj1;
    img1.src = `./public/img/${pj1}/base.png`;
}

const iniciar_jugador2 = () => {
    username2.innerText = nombre2.value;
    personaje2.innerText = pj2;
    img2.src = `./public/img/${pj2}/base.png`;
}

const actualizarBarras = (jugador) => {
    const id = jugador.getId();

    document.getElementById(`vida${id}`).style.width = `${jugador.getVida()}%`;
    document.getElementById(`vida${id}-txt`).innerText = `${jugador.getVida()}%`;

    document.getElementById(`ki${id}`).style.width = `${jugador.getKi()}%`;
    document.getElementById(`ki${id}-txt`).innerText = `${jugador.getKi()}%`;

    document.getElementById(`energia${id}`).style.width = `${jugador.getEnergia()}%`;
    document.getElementById(`energia${id}-txt`).innerText = `${jugador.getEnergia()}%`;
}

const revisarAlertas = (jugador) => {
    if (jugador.getVida() <= 20 && jugador.getVida() > 0) {
        setTimeout(() => {
            Swal.fire({
                icon: "warning",
                title: `¡${jugador.getNombre()} se está quedando sin vida!`,
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000
            });
        }, 1600);
    }
    if (jugador.getKi() <= 20 && jugador.getKi() > 0) {
        setTimeout(() => {
            Swal.fire({
                icon: "warning",
                title: `¡${jugador.getNombre()} se está quedando sin Ki!`,
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000
            });
        }, 1600);
    }
}

const reiniciarJuego = () => {
    pj1 = "";
    pj2 = "";
    jugador1 = undefined;
    jugador2 = undefined;
    turnoActual = 1;
    partidaTerminada = false;
    especialesJ1 = MAX_ESPECIALES;
    especialesJ2 = MAX_ESPECIALES;
    enfriamientoJ1 = ENFRIAMIENTO_INICIAL;
    enfriamientoJ2 = ENFRIAMIENTO_INICIAL;
    semillasJ1 = MAX_SEMILLAS;
    semillasJ2 = MAX_SEMILLAS;
    actualizarTextoEspecial();

    nombre1.value = "";
    nombre1.disabled = false;
    nombre2.value = "";
    nombre2.disabled = false;

    [...player1.querySelectorAll("img")].forEach((imagen) => {
        imagen.classList.remove("bg-warning");
        imagen.classList.add("bg-danger");
    });
    [...player2.querySelectorAll("img")].forEach((imagen) => {
        imagen.classList.remove("bg-warning");
        imagen.classList.add("bg-primary");
    });

    username1.innerText = "";
    personaje1.innerText = "";
    img1.src = "";
    username2.innerText = "";
    personaje2.innerText = "";
    img2.src = "";

    ["vida1", "ki1", "energia1", "vida2", "ki2", "energia2"].forEach((id) => {
        document.getElementById(id).style.width = "100%";
        document.getElementById(`${id}-txt`).innerText = "100%";
    });

    nombres.classList.remove("d-none");
    player1.classList.remove("d-none");
    player2.classList.remove("d-none");
    batalla.classList.add("d-none");

    actualizarBotonesTurno();
}

const revisarFinPartida = () => {
    if (partidaTerminada) return;

    const j1Perdio = jugador1.getVida() <= 0 || jugador1.getKi() <= 0;
    const j2Perdio = jugador2.getVida() <= 0 || jugador2.getKi() <= 0;

    if (!j1Perdio && !j2Perdio) return;

    partidaTerminada = true;
    actualizarBotonesTurno();

    let ganador;
    if (j1Perdio && j2Perdio) {
        ganador = null;
    } else if (j1Perdio) {
        ganador = jugador2;
    } else {
        ganador = jugador1;
    }

    setTimeout(() => {
        Swal.fire({
            title: ganador ? `¡${ganador.getNombre()} ganó la partida!` : "¡Empate!",
            text: "Fin de la partida",
            icon: "success",
            confirmButtonText: "Jugar de nuevo",
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(() => {
            reiniciarJuego();
        });
    }, 1700);
}

const comenzarBatalla = () => {
    let cuenta = 3;

    Swal.fire({
        title: "¡COMIENZA LA BATALLA!",
        html: `<h1 style="font-size: 5rem;">${cuenta}</h1>`,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            const intervalo = setInterval(() => {
                cuenta--;
                if (cuenta > 0) {
                    Swal.update({
                        html: `<h1 style="font-size: 5rem;">${cuenta}</h1>`
                    });
                } else {
                    clearInterval(intervalo);
                    Swal.close();
                    batalla.classList.remove("d-none");
                    actualizarBotonesTurno();
                }
            }, 1000);
        }
    });
}

nombre1.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9]+/, "");
});
nombre2.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9]+/, "");
});

const remover_seleccion = (color, ...elementos) => {
    elementos.map((elemento) => {
        elemento.classList.remove("bg-warning");
        elemento.classList.add("bg-" + color);
    });
}

const msj_error = (msj) => {
    Swal.fire({
        icon: "warning",
        title: "Error!",
        text: msj
    });
}

[...player1.querySelectorAll("img")].map((imagen) => {
    imagen.addEventListener('click', (event) => {
        remover_seleccion("danger", ...player1.querySelectorAll("img"));
        event.target.classList.remove("bg-danger");
        event.target.classList.add("bg-warning");
        pj1 = event.target.alt;
    });
});

[...player2.querySelectorAll("img")].map((imagen) => {
    imagen.addEventListener('click', (event) => {
        remover_seleccion("primary", ...player2.querySelectorAll("img"));
        event.target.classList.remove("bg-primary");
        event.target.classList.add("bg-warning");
        pj2 = event.target.alt;
    });
});

btn_player1.addEventListener("click", () => {
    if (nombre1.value == "") {
        return msj_error("El jugador 1 no ha ingresado un nombre de usuario!");
    } else if (pj1 == "") {
        return msj_error("El jugador 1 debe seleccionar un personaje!");
    }
    jugador1 = new Acciones(nombre1.value, pj1, 1);
    nombre1.disabled = true;
    player1.classList.add("d-none");
    iniciar_jugador1();

    if (jugador1 && jugador2) {
        nombres.classList.add("d-none");
        comenzarBatalla();
    }
});

btn_player2.addEventListener("click", () => {
    if (nombre2.value == "") {
        return msj_error("El jugador 2 no ha ingresado un nombre de usuario!");
    } else if (pj2 == "") {
        return msj_error("El jugador 2 debe seleccionar un personaje!");
    }
    jugador2 = new Acciones(nombre2.value, pj2, 2);
    nombre2.disabled = true;
    player2.classList.add("d-none");
    iniciar_jugador2();

    if (jugador1 && jugador2) {
        nombres.classList.add("d-none");
        comenzarBatalla();
    }
});


botonesP1[0].addEventListener("click", async () => { 
    if (!jugador1 || !jugador2 || turnoActual !== 1) return;
    await atkBasico(jugador1, jugador2); 
    actualizarBarras(jugador1);
    actualizarBarras(jugador2);
    revisarAlertas(jugador1);
    revisarAlertas(jugador2);
    revisarFinPartida();
    if (partidaTerminada) return;
    pasarTurno();
});

botonesP1[1].addEventListener("click", async () => { // ATK Especial
    if (!jugador1 || !jugador2 || turnoActual !== 1) return;
    if (especialesJ1 <= 0) {
        return msj_error("Ya usaste tus 2 ataques especiales de la partida.");
    }
    if (enfriamientoJ1 > 0) {
        return msj_error("Debes esperar un turno para volver a usar el ataque especial.");
    }
    especialesJ1--;
    await atkEspecial(jugador1, jugador2);
    actualizarBarras(jugador1);
    actualizarBarras(jugador2);
    revisarAlertas(jugador1);
    revisarAlertas(jugador2);
    revisarFinPartida();
    if (partidaTerminada) return;
    pasarTurno(true);
});

botonesP1[2].addEventListener("click", () => { 
    if (!jugador1 || turnoActual !== 1) return;
    if (jugador1.getEnergia() >= 100 && jugador1.getKi() >= 100) {
        return msj_error("¡Ya tienes el Ki y la energía al máximo!");
    }
    jugador1.cargaEnergia();
    actualizarBarras(jugador1);
    pasarTurno();
});

botonesP1[3].addEventListener("click", () => { 
    if (!jugador1 || turnoActual !== 1) return;
    if (semillasJ1 <= 0) {
        return msj_error("Ya no te quedan semillas del ermitaño.");
    }
    if (jugador1.getVida() >= 100 && jugador1.getKi() >= 100 && jugador1.getEnergia() >= 100) {
        return msj_error("¡Ya tienes todas tus barras al máximo, no necesitas semilla!");
    }
    semillasJ1--;
    jugador1.curacion();
    actualizarBarras(jugador1);
    pasarTurno();
});

// ============ BOTONES JUGADOR 2 ============

botonesP2[0].addEventListener("click", async () => { // ATK Basico
    if (!jugador1 || !jugador2 || turnoActual !== 2) return;
    await atkBasico(jugador2, jugador1);
    actualizarBarras(jugador1);
    actualizarBarras(jugador2);
    revisarAlertas(jugador1);
    revisarAlertas(jugador2);
    revisarFinPartida();
    if (partidaTerminada) return;
    pasarTurno();
});

botonesP2[1].addEventListener("click", async () => { // ATK Especial
    if (!jugador1 || !jugador2 || turnoActual !== 2) return;
    if (especialesJ2 <= 0) {
        return msj_error("Ya usaste tus 2 ataques especiales de la partida.");
    }
    if (enfriamientoJ2 > 0) {
        return msj_error("Debes esperar un turno para volver a usar el ataque especial.");
    }
    especialesJ2--;
    await atkEspecial(jugador2, jugador1);
    actualizarBarras(jugador1);
    actualizarBarras(jugador2);
    revisarAlertas(jugador1);
    revisarAlertas(jugador2);
    revisarFinPartida();
    if (partidaTerminada) return;
    pasarTurno(true);
});

botonesP2[2].addEventListener("click", () => { // Carga KI
    if (!jugador2 || turnoActual !== 2) return;
    if (jugador2.getEnergia() >= 100 && jugador2.getKi() >= 100) {
        return msj_error("¡Ya tienes el Ki y la energía al máximo!");
    }
    jugador2.cargaEnergia();
    actualizarBarras(jugador2);
    pasarTurno();
});

botonesP2[3].addEventListener("click", () => { // Semilla
    if (!jugador2 || turnoActual !== 2) return;
    if (semillasJ2 <= 0) {
        return msj_error("Ya no te quedan semillas del ermitaño.");
    }
    if (jugador2.getVida() >= 100 && jugador2.getKi() >= 100 && jugador2.getEnergia() >= 100) {
        return msj_error("¡Ya tienes todas tus barras al máximo, no necesitas semilla!");
    }
    semillasJ2--;
    jugador2.curacion();
    actualizarBarras(jugador2);
    pasarTurno();
});

actualizarTextoEspecial();
actualizarBotonesTurno();