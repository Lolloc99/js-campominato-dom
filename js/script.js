/*
Consegna 1:
Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.

Bonus:
Aggiungere la possibilità di scegliere un livello di difficoltà in base al quale viene generata una griglia di uno dei seguenti range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
*/

/*
----------------------------------------------------------------------------------------------------------
**Consegna 2**
Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

**BONUS:**
1 - L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
**2- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
****3- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
**Consigli del giorno:**
****Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
Ad esempio:
Di cosa ho bisogno per generare i numeri?
Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
Le validazioni e i controlli possiamo farli anche in un secondo momento.
----------------------------------------------------------------------------------------------------------

Setp by step personale

*
- Creare un array con le 16 bombe
    i numeri sono casuali
    i numeri non devono ripetersi

- Creare un array vuoto "Punteggio" in cui andranno i numeri cliccati che non avevano una bomba all'interno
    creare un ciclo for che controlla se il numero cliccato è tra la lista delle bombe, se non lo è lo pusha nell'array punteggio
    togliere la possibilità di ricliccare una cella dopo la prima volta

- Implementare che se la casella cliccata corrisponde ad una bomba, la casella non sarà blu ma rossa
    mesaggio di game over in caso cliccata una bomba
    altrimenti
    messaggio "Hai vinto" se clicca tutte le caselle (punteggio === target (ove target = celleTotali - 16))

    In ogni caso viene mostrato il punteggio (punteggio.length) insieme all'esito della partita
*
*/

//Creare un array vuoto "Punteggio" in cui andranno i numeri cliccati che non avevano una bomba all'interno
let score = [];

// Bottone da cliccare per iniziare il gioco 
document.getElementById("play-btn").addEventListener("click",
    function () {
        // Genero la griglia di gioco
        // Reset
        const gridContainerMaker = document.getElementById("gridContainer");
        gridContainerMaker.innerHTML = "";

        const gameOverMessage = document.getElementById("gameOverString");
        gameOverMessage.innerHTML = "";

        document.getElementById("gameOverString").classList.add("d-none")
        gridContainer.style.pointerEvents = "initial";
        score = [];

        const challenge = document.getElementById('difficulty').value;
        console.log(challenge);

        // Imposto la corrispondenza tra difficoltà e numero di celle
        let cellsNumber =  difficultyAdapter(challenge);

        // Array con le 16 bombe
        const bombsNumber = 16;
        let bombsArray = rndBombsGenerator (bombsNumber, cellsNumber);
        // Cheat
        console.log("Le caselle bomba sono:", bombsArray);

        const target = cellsNumber - bombsNumber;

        // Generare le celle all'interno della griglia a seconda della difficoltà scelta
        for (let i = 1; i <= cellsNumber; i++) {
            const gridCont = document.getElementById("gridContainer");
            const newDiv = document.createElement("div");
            newDiv.innerHTML = `<span>${i}</span>`
            // L'if decide quali classi affidare alle caselle a seconda della challenge (ergo la difficoltà impostata)
            if (challenge === "easy") {
                newDiv.classList.add("cell-standard");
            } else if (challenge === "medium") {
                newDiv.classList.add("cell-medium");
            } else if (challenge === "hard") {
                newDiv.classList.add("cell-hard");
            }

            // Cliccando su una casella si aggiunge la classe "active"
            /* Edit post consegna 2: nel momento del click, il programma legge il numero interno alla casella (quindi il testo dello span) e lo allega ad una variabile
            SE quel numero NON si trova nell'array delle bombe, gli verrà data la classe "active" e verrà pushato nell'array "score"
            ALTRIMENTI SE quel numero si trova dentro l'array delle bombe allora gli verrà data la classe "bomb" e partirà l'alert di Game Over
            */
            newDiv.addEventListener("click", function() {
                const tileNum = parseInt(this.querySelector("span").textContent);
                console.log(tileNum);
                if (!bombsArray.includes(tileNum)) {
                    this.classList.add("active");
                    this.style.pointerEvents = "none";
                    score.push(tileNum);
                    if (score.length >= target) {
                        gridContainer.style.pointerEvents = "none";
                        document.getElementById("gameOverString").classList.remove("d-none")
                        document.getElementById("gameOverString").innerHTML = `${"La partita è stata vinta! Punteggio totalizzato:"} ${score.length}`
                    }
                } else if (bombsArray.includes(tileNum)) {
                    this.classList.add("bomb");
                    gridContainer.style.pointerEvents = "none";
                    console.log("Punteggio:", score.length);
                    document.getElementById("gameOverString").classList.remove("d-none")
                    document.getElementById("gameOverString").innerHTML = `${"La partita si è conclusa, punteggio totalizzato:"} ${score.length}`
                }

            });
            
            gridCont.append(newDiv);
        }
        
        // Per sostituire la scritta iniziale con la griglia:
        document.getElementById("game-main").classList.remove("d-none");
        document.getElementById("start-title").classList.add("d-none");
    }
);

// FUNCTIONS

/*
Descrizione: Imposta il numero di celle totali in base alla difficoltà inserita
    Dato 1: difficoltà
    Return: cellsNumber
*/
function difficultyAdapter(grade) {
    if (grade === "easy") {
        cellsNum = 100;
    } else if (grade === "medium") {
        cellsNum = 81;
    } else if (grade === "hard") {
        cellsNum = 49;
    }

    return cellsNum;
}

/*
Descrizione: Crea un array di numeri casuali non ripetuti
    Dato 1: numero massimo di elementi da creare → "bombsMax"
    Dato 2: range massimo di numeri da prendere → "cellsMax"
    Return: array[n*cellsMax]
*/
function rndBombsGenerator(bombsMax, cellsMax) {
    const bombsContainer = [];

    let i = 0;
    while (i < bombsMax) {
        let rndNumber = getRndInteger (1, cellsMax);
        if (!bombsContainer.includes(rndNumber))  {
            bombsContainer.push(rndNumber)
            i++;
        }
    }

    return bombsContainer;
}

/*
Descrizione: Genera numeri casuali
    Dato 1: range numero minimo → "min"
    Dato 2: range numero massimo → "max"
    Return: numero casuale compreso tra "min" e "max"
*/
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}