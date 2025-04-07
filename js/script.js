// DEFINIZIONE DELLE EVENTUALI VARIABILI, DELLE FUNZIONI E/O RECUPERO DEGLI ELEMENTI DEL DOM
// recupero degli elementi del dom che mi servono 
const form = document.getElementById("answers-form");
const inputFields = document.querySelectorAll("input");
const countdown = document.getElementById("countdown");
const numberList = document.getElementById("numbers-list");
const message = document.getElementById("message");
const instructions = document.getElementById("instructions");
const button = document.querySelector("button");

// definizione delle variabili 
const min = 1;
const max = 50;
const totalNumbers = 5;
let time = 30;
let numbers;
let li = '';

// definizione delle funzioni utili
const generateRandomNumbers = (min, max, tot) => {
    // definisco l'array vuoto che contiene i numeri casuali
    const numbers = [];
    // genero i 5 numeri casuali 
    // for (let i = 0; i < tot; i++) {
    // const num = Math.floor(Math.random() * (max - min + 1)) + min;
    // inserisco il numero generato nell'array
    // numbers.push(num);
    // }
    while (numbers.length < tot) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        // se l'array numbers non include il numero generato, allora lo inserisco
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    // restituisco l'array
    return numbers;
}

// CORPO DEL PROGRAMMA
// mi genero i numeri casuali invocando la funzione 
numbers = generateRandomNumbers(min, max, totalNumbers);
console.log(numbers);

// genero i list item da appendere all'elemento del dom
for (let i = 0; i < numbers.length; i++) {
    li += `<li>${numbers[i]}</li>`
}

// vado ad inserire i list item generati nel dom
numberList.innerHTML = li;

// vado a mostrare nel dom il timer
countdown.innerText = time;

// faccio partire il countdown 
const timer = setInterval(() => {
    // decremento il valore del timer
    time--;
    countdown.innerText = time;
    // verifico che il timer sia arrivato a 0
    if (time === 0) {
        // cancello il set interval
        clearInterval(timer);
        // rimuovo la classe d-none dalla form
        form.classList.remove('d-none');
        // aggiungo la classe d-none a numberList
        numberList.classList.add('d-none');
        // cambio il testo nelle istruzioni
        instructions.innerText = "Inserisci i valori che ricordi. Non è importante l'ordine";
    }
}, 1000);

button.addEventListener('click', (e) => {
    // passaggio obbligatorio : se non lo metto la form viene sottomessa e viene refreshata la pagina 
    e.preventDefault();
    // definisco l'array vuoto dei numeri inseriti dall'utente 
    const userNumbers = [];
    // ciclo i campi input
    for (let i = 0; i < inputFields.length; i++) {
        const input = inputFields[i];
        const value = parseInt(input.value);
        if (isNaN(value) === false && value >= min && value <= max && userNumbers.includes(value) === false) {
            // vado ad inserire il numero nell'array
            userNumbers.push(value);
        }
    }

    if(userNumbers.length !== totalNumbers){
        message.classList.add('text-danger');
        message.innerText = 'Ci sono elementi non validi o duplicati';
        return;
    }
   
    // definisco un array che contiene i numeri indovinati
    const guessed = [];
    // ciclo l'array dei numeri casuali
    for (let i = 0; i < userNumbers.length; i++) {
        const num = userNumbers[i];
        // verifico che il numero dell'utente che sto attualmente ciclando sia presente nell'array dei numeri generati
        // casualmente 
        if (numbers.includes(num)) {
            guessed.push(num);
        }
    }
    
    // visualizzo il risultato
    message.classList.remove('text-danger');
    // se la lunghezza dell'array è uguale al numero totale di elementi allora ho vinto
    if(guessed.length === totalNumbers) {
        message.classList.add('text-success');
    }
    message.innerText = `Hai indovinato ${guessed.length} elementi! (${guessed})`;
});

