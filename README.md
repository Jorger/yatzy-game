# 🎲 Yatzy React game.

Yatzy es un juego de dados, cuyo objetivo es obtener la mayor puntuación posible tras sumar los puntos de las 13 combinaciones disponibles en la tabla de puntuaciones. Puede jugar cualquier número de jugadores; incluso se puede jugar en solitario. Tiene una mecánica similar a la de Yahtzee, Yams, Kismet, Balut, la generala y los dados de póquer, y es muy popular en los países escandinavos.

# 🎓 Curso en Udemy.

![Imagen_curso_02](https://github.com/Jorger/yatzy-game/assets/30050/48a6cd57-7d0c-44c1-a7bb-ac457947d7eb)

A través del curso de Udemy: ["Aprende a desarrollar un juego de Yatzy con ReactJS/NodeJS"](https://www.udemy.com/course/aprende-a-desarrollar-un-juego-de-yatzy-con-react), se aprenderá a desarrollar este juego desde cero.

# 🎮 URL del juego.

Es posible jugar el Juego en: https://yatzy-react-game.herokuapp.com/

En el [curso de UDEMY](https://www.udemy.com/course/aprende-a-desarrollar-un-juego-de-yatzy-con-react), aprenderás como es posible desplegar este juego.

## 📖 Reglas.

Los jugadores se turnan para lanzar 5 dados hasta 3 veces en cada turno. Después de cada lanzamiento, el jugador elige qué dados mantener y cuáles volver a lanzar: puede volver a lanzar todos los dados, o solo algunos, hasta 2 veces en un turno. En cada turno, el jugador debe anotar en una tabla la puntuación resultante, o un cero si no ha obtenido ninguna combinación.
La tabla se divide en dos secciones:

* Superior (Upper section)
* Inferior (Lower section)

### ⬆️ Upper section

![image](https://github.com/Jorger/yatzy-game/assets/30050/a98af66d-d49f-48b5-8dd2-d17692d26aee)

En la sección superior de la hoja de puntuación, hay seis categorías diferentes: uno, dos, tres, cuatro, cinco y seis. Cada categoría representa la suma de los dados que muestran el número correspondiente. Por ejemplo, si un jugador lanza los dados y obtiene tres dados que muestran el número dos, la puntuación que puede anotar en la categoría "dos" es de 6 puntos (2+2+2=6).
Es importante tener en cuenta que solo se puede anotar una puntuación en cada categoría de la sección superior. Por ejemplo, si un jugador ya ha anotado 6 puntos en la categoría "dos", no puede volver a anotar en esa categoría, incluso si obtiene más dados que muestran el número dos en lanzamientos posteriores.

### ⬇️ Lower section

![image](https://github.com/Jorger/yatzy-game/assets/30050/dc2ee9f2-bfb5-4d02-94fd-89dc10f97a19)

* Three of a kind (Tres iguales): Si el jugador tiene al menos tres dados iguales, se anotan la suma de todos los dados. Por ejemplo, si el jugador tiene 2-3-4-4-4, se anotan 17 puntos
* Four of a kind (Cuatro iguales): Si el jugador tiene al menos cuatro dados iguales, se anotan la suma de todos los dados. Por ejemplo, si el jugador tiene 4-5-5-5-5, se anotan 24 puntos 
* Full House: Si el jugador tiene tres dados iguales y dos dados iguales diferentes, se anotan 25 puntos. Por ejemplo, si el jugador tiene 2-2-5-5-5, se anotan 25 puntos.
* Small Straight (Escalera corta): Si el jugador tiene cuatro dados consecutivos, como 1-2-3-4, 2-3-4-5 ó 3-4-5-6, se anotan 30 puntos.
* Large Straight (Escalera larga): Si el jugador tiene cinco dados consecutivos, como 1-2-3-4-5 o 2-3-4-5-6, se anotan 40 puntos.
* Yatzy: Si el jugador tiene cinco dados iguales, se anotan 50 puntos.
* Chance (Oportunidad): El jugador puede anotar la suma de todos los dados en cualquier lanzamiento, independientemente de si cumple con los requisitos de las otras categorías. Por ejemplo, si los dados muestran 1-1-3-4-5, el jugador puede optar por anotar 14 puntos en la categoría Chance.

## 🎲 El juego.

![Screen Recording 2023-05-15 at 9 03 59 AM](https://github.com/Jorger/yatzy-game/assets/30050/1d932890-867b-4e95-b811-79f48b92b468)

En el presente juego, desarrollado en el frontend con ReactJS/Typescript y el backend con Nodejs/Typescript, tiene 4 modalidades de juego como son:

* Solo
* Online
* Vs a Friend
* Vs a Bot.

## 🌐 Opción Online.

![Screen Recording 2023-05-15 at 9 43 56 AM](https://github.com/Jorger/yatzy-game/assets/30050/47e9f5fc-87c7-4e17-8479-e2a60c8f24cc)


Para la opción Online, se hace uso de lo siguiente:

* NodeJS con Typescript.
* PassportJS, con tres esrtragegías de autenticación (Google, Github y Microsoft)
* Socket.io, para jugabalidad online.


# 👨🏻‍💻 Autor.

* Jorge Rubiano 
* https://bio.link/jorgerub
* [@ostjh](https://twitter.com/ostjh)
