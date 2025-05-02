// RECUPERO GLI ELEMENTI DEL DOM CHE MI SERVONO 
const form = document.getElementById("answers-form");
const inputFields = document.querySelectorAll("input");
const countdown = document.getElementById("countdown");
const numberList = document.getElementById("numbers-list");
const message = document.getElementById("message");
const instructions = document.getElementById("instructions");
const button = document.querySelector("button");

// DEFINISCO LE VARIABILI
const min = 1;
const max = 50;
const totalNumbers = 5;
let time = 30;
let numbers;
let li = '';

// DEFINISCO LE FUNZIONI UTILI
const generateRandomNumbers = (min, max, tot) => {
    // DEFINISCO L'ARRAY
    const numbers = [];
    
    // GENERO I 5 NUMERI CASUALI 
    // for (let i = 0; i < tot; i++) {
    // const num = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // INSERISCO IL NUMERO GENERATO NELL'ARRAY 
    // numbers.push(num);
    // }
   
    while (numbers.length < tot) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        
        // SE L'ARRAY numbers NON INCLUDE IL NUMERO GENERATO, ALLORA LO INSERISCO
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    // RESTITUISCO L'ARRAY 
    return numbers;
}

// CORPO DEL PROGRAMMA


// MI GENERO I NUMERI CASUALI INVOCANDO LA FUNZIONE 
numbers = generateRandomNumbers(min, max, totalNumbers);
console.log(numbers);

// GENERO I LIST ITEM DA APPENDERE ALL'ELEMENTO DEL DOM 
for (let i = 0; i < numbers.length; i++) {
    li += `<li>${numbers[i]}</li>`
}

// VADO AD INSERIRE I LIST ITEM GENERATI NEL DOM 
numberList.innerHTML = li;

// VADO A MOSTRARE NEL DOM IL TIMER 
countdown.innerText = time;

// FACCIO PARTIRE IL COUNTDOWN
const timer = setInterval(() => {
    
    // DECREMENTO IL VALORE DEL TIMER 
    time--;
    countdown.innerText = time;
    
    // VERIFICO CHE IL TIMER SIA ARRIVATO A 0
    if (time === 0) {
        // CANCELLO IL SET INTERVAL
        clearInterval(timer);
        
        // RIMUOVO LA CLASSE d-none DALLA FORM 
        form.classList.remove('d-none');
        
        // AGGIUNGO LA CLASSE d-none A numberList 
        numberList.classList.add('d-none');
        
        // CAMBIO IL TESTO NELLE ISTRUZIONI 
        instructions.innerText = "Inserisci i valori che ricordi. Non è importante l'ordine";
    }
}, 1000);

button.addEventListener('click', (e) => {
    // e.preventDefault() COME PASSAGGIO OBBLIGATORIO : SE NON LO METTO LA FORM VIENE SOTTOMESSA E VIENE REFRESHATA 
    // LA PAGINA 
    e.preventDefault();
    
    // DEFINISCO L'ARRAY VUOTO DEI NUMERI INSERITI DALL'UTENTE 
    const userNumbers = [];
    
    // CICLO I CAMPI INPUT 
    for (let i = 0; i < inputFields.length; i++) {
        const input = inputFields[i];
        const value = parseInt(input.value);
        if (isNaN(value) === false && value >= min && value <= max && userNumbers.includes(value) === false) {
            // VADO AD INSERIRE I NUMERI NELL'ARRAY 
            userNumbers.push(value);
        }
    }

    // CONTROLLO SUGLI ELEMENTI NON VALIDI O DUPLICATI 
    if(userNumbers.length !== totalNumbers){
        message.classList.add('text-danger');
        message.innerText = 'Ci sono elementi non validi o duplicati';
        return;
    }
   
    // DEFINISCO UN ARRAY CHE CONTIENE I NUMERI INDOVINATI 
    const guessed = [];
    
    // CICLO L'ARRAY DEI NUMERI CASUALI 
    for (let i = 0; i < userNumbers.length; i++) {
        const num = userNumbers[i];
       
        // VERIFICO CHE IL NUMERO DELL'UTENTE CHE STO ATTUALMENTE CICLANDO SIA PRESENTE NELL'ARRAY DEI NUMERI GENERATI
        // CASUALMENTE 
        if (numbers.includes(num)) {
            guessed.push(num);
        }
    }
    
    // VISUALIZZO IL RISULTATO
    message.classList.remove('text-danger');
    
    // SE LA LUNGHEZZA DELL'ARRAY E' UGUALE AL NUMERO TOTALE DI ELEMENTI ALLORA HO VINTO 
    if(guessed.length === totalNumbers) {
        message.classList.add('text-success');
    }
    message.innerText = `Hai indovinato ${guessed.length} elementi! (${guessed})`;
});

