class Personaje{
    #vida = 100;
    #nombre;
    #ki = 100;
    #energia = 100;
    #semilla = 2;
    #personaje = "";
    #id;

    constructor(nombre, personaje, id){
        this.#nombre = nombre;
        this.#personaje = personaje;
        this.#id = id;
        this.mostrarEstadisticas();
    }

    mostrarEstadisticas(){
        console.log(`
            nombre:${this.#nombre},
            ************************
            ki:${this.#ki},
            vida:${this.#vida},
            energia:${this.#energia},
            semilla:${this.#semilla},
        `);
    }

    getVida(){ 
        return this.#vida; }
    getPersonaje(){ 
        return this.#personaje; }
    getKi(){ 
        return this.#ki; }
    getEnergia(){ 
        return this.#energia; }
    getSemilla(){ 
        return this.#semilla; }
    getNombre(){ 
        return this.#nombre; }
    getId(){ 
        return this.#id; }

    setVida(vida){ 
        this.#vida = vida; 
    }
    setKi(ki){ 
        this.#ki = ki; 
    }
    setEnergia(energia){ 
        this.#energia = energia; 
    }
    setSemilla(semilla){ 
        this.#semilla = semilla; 
    }
    setPersonaje(personaje){ 
        this.#personaje = personaje; 
    }
}

export default Personaje;