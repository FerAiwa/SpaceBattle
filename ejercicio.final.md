Nota: El ejercicio es obligatorio terminarlo y subirlo al repositorio para su evaluación (se publicará el link en un mensaje dentro del canal del módulo).

# Batalla estelar
## Introducción
Se quiere emular una batalla entre dos ejercitos de naves espaciales de manera automática (sin intervención humana). Gana la partida el ejercito que consigue destruir antes a todas las naves enemigas.

Habrá dos fases:
* Preparación de los ejercitos
* Lucha de los ejercitos

Se jugará por turnos:
* Se selecciona un nave del ejercito
* Se selecciona una nave del enemigo
* Se realiza el disparo y se descuentan los puntos de vida de las naves según la potencia de disparo
* Si una nave se queda con 0 puntos de vida está destruída y no puede ser seleccionada.

## Objetos a crear:
* Una clase Nave
    * Propiedades
        * Daño
        * Puntos de vida (Escudo)
        * Nombre o Código
        * Estado (Activo o Destruido) (Solo lectura)
    * Métodos
        * Disparar
            * Selecciona un objetivo (para ello la nave tiene que tener acceso a la información del campo de batalla). El objetivo recibe el disparo.
            
        * Seleccionar Objetivo
        * Recibir disparo (dano)
            * Se descuenta el daño a los puntos de vida
* Tres clases derivadas de Nave: Nave Clase I, Nave Clase II, Nave Clase III
    * Cada una tendrá caracteristicas distintas (10 disparo, 5 vida) (5 disparo, 10 vida) (8 disparo, 7 vida)  (Opcional)
* Una clase ejercito
    * Nombre
    * ListaNaves
    * Estado o    Informe de las naves
    * Derrotado (s/N)
* Una clase Generador de Naves
    * Métodos
        * CrearEjercito(nombre, cantidad clase I, cantidad clase II, cantidad clase III)
        * Distribuir el ejercito en el campo de batalla
        
* Una clase Campo de Batalla
    * Lista de sectores por ejercito (uno para cada ejercito)
    * Control de los turnos (clase principal para el juego)
    * Ejecutar turno(ejercito)
        * Seleccionar una nave para disparar
* Una clase sector:
    * Un array donde se almacenan las naves.
        * Puede ser mismo tamaño que el ejercito (n elementos) 
        * O tener más tamaño y quedar huecos (disparo al aire)
        * O tener dos o tres dimensiones.
    
    * Métodos:
        * ObtenerElementoEnPosicion(posicion) (devuelve una nave o null)
        
## Ejemplo de funcionamiento:
```
const ejercito1 = generador.CrearEjercito("Rojo",3,5,7);
const ejercito2 = generador.CrearEjercito("Verde",3,5,7);
//(si son distintos se generan partidas desiguales, asi que habrá que controlar esto al añadir los ejercitos)
const campoBatalla = generador.GenerarCampo(ejercito1,ejercito2);

var resultado =campoBatalla.REalizarPartida();
// Dentro se realizarán los turnos
// Se visualizaran los disparos
// Se indica si una nave ha sido destruida: la nave 1 del ejercito rojo ha sido destruida por la nave 3 del ejercito verde
console.log(resultado);
// El ejercito rojo ha ganado
```

## Recomendaciones:
* Hacer un sistema básico inicialmente y luego se podrá complicar
* El campo de batalla puede ser un simple array sin huecos
* Se puede hacer una interfaz gráfico para visualizar las naves

