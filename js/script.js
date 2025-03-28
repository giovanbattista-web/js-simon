let numeriCasuali = document.getElementById("number-list");
let contoAllaRovescia = document.getElementById("countdown");
const casuali = [];
const utente = [];
let secondi = 30;
console.log(contoAllaRovescia);
contoAllaRovescia.innerText = secondi;  
console.log(secondi);

const intervallo = setInterval(function () {
    if (secondi!=0){
        contoAllaRovescia.innerText = secondi;
    }
    else
    {
        clearInterval(intervallo);
    }
    secondi--;
}, 1000);




