import Swal from "sweetalert2";

// Frases dramáticas por personaje
const atributosPersonaje = {
    "Goku": {
        atk_basico: "¡¡KAME HAME HAAA!! ",
        atk_especial: "¡¡GENKI DAMAAA!! ¡TODOS PRÉSTENME SU ENERGÍAAA! ",
        fondo: "rgba(241, 117, 158, 0.7)"
    },
    "Vegitto": {
        atk_basico: "¡¡BIG BANG ATTACK!! ",
        atk_especial: "¡¡FINAL KAMEHAMEHAAA!! ¡DESAPARECE!! ",
        fondo: "rgba(241, 117, 158, 0.7)"
    },
    "Veguetta": {
        atk_basico: "¡¡BIG BANG ATTACK!! ¡SOY EL PRÍNCIPE DE LOS SAIYANS! ",
        atk_especial: "¡¡FINAL KAMEHAMEHAAA!! ¡NO ME SUBESTIMES! ",
        fondo: "rgba(241, 117, 158, 0.7)"
    },
    "Gohan": {
        atk_basico: "¡¡MASENKOOO!! ",
        atk_especial: "¡¡KAMEHAMEHA SUPREMOOO!! ¡¡DESPIERTA MI PODER!! ",
        fondo: "rgba(241, 117, 158, 0.7)"
    },
    "Trunks": {
        atk_basico: "¡¡BURNING ATTAAACK!! ",
        atk_especial: "¡¡ESPADA INFINITAAA!! ¡CORTE DIMENSIONAL! ",
        fondo: "rgba(241, 117, 158, 0.7)"
    },
    "Pikoro": {
        atk_basico: "¡¡MAKANKOSAPPOOO!! ",
        atk_especial: "¡¡EXPLOSIÓN ESPECIAAAL!! ¡¡MUEREEEE!! ",
        fondo: "rgba(241, 117, 158, 0.7)"
    },
    "Cell": {
        atk_basico: "¡¡KAMEHAMEHAAA!! ¡SOY PERFECTO!",
        atk_especial: "¡¡CAÑÓN KAMEHAMEHAAA!! ¡ABSOLUTE DESTRUCTION! ",
        fondo: "rgba(241, 117, 158, 0.7)"
    },
    "Gogeta": {
        atk_basico: "¡¡STARDUST BREAKEEER!! ",
        atk_especial: "¡¡BIG BANG KAMEHAMEHAAA!! ¡¡AQUÍ SE ACABA TODO!! ",
        fondo: "rgba(241, 117, 158, 0.7)"
    }
};

const atkBasico = (j1, j2) => {
    j1.atkBasico(j2);
    j2.setVida(j2.getVida() - 10 < 1 ? 0 : j2.getVida() - 10);
    j2.mostrarEstadisticas();

    return Swal.fire({
        title: `${j1.getNombre()} ATACA `,
        text: atributosPersonaje[j1.getPersonaje()]?.atk_basico,
        imageUrl: `./public/img/${j1.getPersonaje()}/basico.png`,
        imageWidth: 400,
        imageHeight: 400,
        position: 'center',
        width: 600,
        color: '#fff',
        background: 'none',
        imageAlt: 'Ataque basico',
        backdrop: atributosPersonaje[j1.getPersonaje()]?.fondo,
        showConfirmButton: false,
        timer: 1500
    });
}

const atkEspecial = (j1, j2) => {
    j1.atkEspecial(j2);
    j2.setVida(j2.getVida() - 20 < 1 ? 0 : j2.getVida() - 20);
    j2.mostrarEstadisticas();

    return Swal.fire({
        title: ` ¡¡ATAQUE ESPECIAL!! `,
        text: atributosPersonaje[j1.getPersonaje()]?.atk_especial,
        imageUrl: `./public/img/${j1.getPersonaje()}/especial.png`,
        imageWidth: 400,
        imageHeight: 400,
        position: 'center',
        width: 600,
        color: '#fff',
        background: 'none',
        imageAlt: 'Ataque especial',
        backdrop: atributosPersonaje[j1.getPersonaje()]?.fondo,
        showConfirmButton: false,
        timer: 1500
    });
}

export { atkBasico, atkEspecial };