const totalCards = 10;
const availableCards = ['A', 'B', 'C', 'D'];
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;

// Plantilla
let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>'


// Función ejecutora.
function activate(event) {
    if (currentMove < 2) {
        if ((!selectedCards[0] || selectedCards[0] !== event.target) && !event.target.classList.contains('active')) {
            event.target.classList.add('active');
            selectedCards.push(event.target);

            if (++currentMove == 2) {
                currentAttempts++;
                document.querySelector('#cont').innerHTML = currentAttempts + ' intentos';
                if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
                    selectedCards = [];
                    currentMove = 0;
                } else {
                    setTimeout(() => {
                        selectedCards[0].classList.remove('active');
                        selectedCards[1].classList.remove('active');
                        selectedCards = [];
                        currentMove = 0;
                    }, 500)
                }
            }
        }
    }
}

// Generar valores aleatorios para las cards.
function randomValue() {
    let rnd = Math.floor(Math.random() * totalCards * 0.5);
    let values = valuesUsed.filter(value => value === rnd);
    if (values.length < 2) { // Asignamos no más de dos tarjetas con el mismo valor. 
        valuesUsed.push(rnd);
    } else {
        randomValue();
    }
}

// Función auxiliar para asignar las letras a algunas de las tarjetas usando el indice del array.
function getFaceValue(value) {
    let rtn = value;
    if (value < availableCards.length) {
        rtn = availableCards[value];
    }
    return rtn;
}

// Crear cada carta. Se crearán tantas cartas como definidas arriba.
for (let i = 0; i < totalCards; i++) {
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#game').append(cards[i]);
    randomValue();
    cards[i].querySelectorAll('.face')[0].innerHTML = getFaceValue(valuesUsed[i]);
    cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
}

