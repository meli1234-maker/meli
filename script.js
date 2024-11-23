let player = {
    name: '',
    initialMoney: 0, // Saldo inicial
    money: 0, // Saldo actual 
    bet: 0,
    hand: [],
    score: 0
};
let dealer = {
    hand: [],
    score: 0
};
let deck = [];

function startGame() {
    // Obtenim el nom del jugador i el saldo inicial
    player.name = document.getElementById("player-name").value;
    player.initialMoney = parseFloat(document.getElementById("player-money").value);

    if (player.name === '' || isNaN(player.initialMoney) || player.initialMoney <= 0) {
        alert("Please enter your name and money");
        return;
    }

    player.money = player.initialMoney; // Assignem el saldo inicial al saldo actual
    
    // Actualitzem la interfície
    document.getElementById("player-display").textContent = `🎮Player: ${player.name}`;
    document.getElementById("player-balance").textContent = `💰Balance: ${player.money}€`;
    
    // Amaguem els inputs de configuració inicial
    document.getElementById("player-info").style.display = 'none';
    
    // Mostrem els elements de la partida
    document.getElementById("game-controls").style.display = 'block';
    document.getElementById("card-table").style.display = 'block'; // Mostrem la taula de cartes
}

function newRound() {
    // Amaguem la secció de l'aposta i els resultats de la ronda anterior
    document.getElementById("betting").style.display = 'block';
    document.getElementById("game-results").textContent = '';
    
    // Reiniciem el joc
    deck = generateDeck();
    player.hand = [];
    dealer.hand = [];
    player.score = 0;
    dealer.score = 0;
    
    updateDisplay();
}

function placeBet() {
    // Verifiquem l'aposta
    player.bet = parseFloat(document.getElementById("player-bet").value);
    if (player.bet > player.money) {
        alert("You don't have enough money!");
        return;
    }
    
    // Amaguem l'aposta i mostrem els controls de les cartes
    document.getElementById("betting").style.display = 'none';
    document.getElementById("card-controls").style.display = 'block';
    
    // Treu una primera carta
    drawCard();
}

function generateDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const deck = [];
    for (let suit of suits) {
        for (let i = 1; i <= 7; i++) deck.push({ value: i, suit: suit, display: i });
        deck.push({ value: 0.5, suit: suit, display: 'J' });
        deck.push({ value: 0.5, suit: suit, display: 'Q' });
        deck.push({ value: 0.5, suit: suit, display: 'K' });
    }
    return deck.sort(() => Math.random() - 0.5);
}

function drawCard() {
    if (deck.length === 0) deck = generateDeck(); 
    
    const card = deck.pop();
    player.hand.push(card);
    player.score += card.value;
    
    updateDisplay();
    
    // Verificar si el jugador te un natural 7.5 (amb les 2 primeres cartes)
    if (player.hand.length === 2 && player.score === 7.5) {
        endRound(true); //Si es aixi, guanya
        return;
    }

    // Comprobar si el jugador ha superado 7.5
    if (player.score > 7.5) {
        endRound(false); // El jugador ha perdido
    }
}


function stand() {
    document.getElementById("card-controls").style.display = 'none';
    dealerDraws();
}


async function dealerDraws() {
    // Si el dealer te un 7.5 natural, el jugador perd
    if (dealer.hand.length === 2 && dealer.score === 7.5) {
        endRound(false); 
        return;
    }

    // El dealer roba cartes fins que la seva puntuacio sigui major que la del juagador 
    // O fins que arribi a 7.5 o mes
    while (dealer.score <= player.score && dealer.score < 7.5) {
        const card = deck.pop(); // Roba una carta
        dealer.hand.push(card);
        dealer.score += card.value;

        //Mostrem les cartes del dealer amb un segon de retard
        await new Promise(resolve => setTimeout(() => {
            updateDisplay(); 
            resolve();
        }, 1000)); // 1000ms = 1 segon

        // Si el dealer supera 7.5, el juagador guanya
        if (dealer.score > 7.5) {
            endRound(true); 
            return;
        }
    }

    // Si el dealer no ha pasat de 7.5, comparem puntuacions
    if (dealer.score > player.score && dealer.score <= 7.5) {
        endRound(false); // El jugador perd perque te menys puntuacio que el dealer
    } else if (dealer.score === player.score) {
        endRound(null); // Si tienen la mateixa puntuacio ni guanya ni perd
    }
}


//Escrivim depenent si guanya, perd o empaten
function endRound(playerWins) {
    const resultElement = document.getElementById("game-results");

    if (playerWins === null) {
        resultElement.textContent = "It's a draw, you neither win nor lose";
    } else if (playerWins) {
        player.money += player.bet; 
        resultElement.textContent = `You have won ${player.bet}€!🎉`;
        
    } else {
        player.money -= player.bet; 
        resultElement.textContent = `You have lost ${player.bet}€!😞`;
        
    }

    // Actualitzem el saldo
    document.getElementById("player-balance").textContent = `💰Balance: ${player.money}€`;
    document.getElementById("card-controls").style.display = 'none';
}



function endGame() {
    document.getElementById("game-controls").style.display = 'none'; 
    document.getElementById("card-table").style.display = 'none'; // Amaga les cartes
    
    // Mostra el missatge de finalització amb el saldo final
    const endMessage = `You receive ${player.money}€. See you next time!`;
    document.getElementById("game-end-message").textContent = endMessage;
    document.getElementById("game-end-message").style.display = 'block';


    document.getElementById("game-footer").style.display = 'none'; 

    document.getElementById("endgame-gif").style.display = 'block';
}
//Actualitzar la visualitzacio de les cartes
function updateDisplay() {
    document.getElementById("player-cards").innerHTML = player.hand.map(card => `<div class="card">${card.display}${card.suit}</div>`).join('');
    document.getElementById("dealer-cards").innerHTML = dealer.hand.map(card => `<div class="card">${card.display}${card.suit}</div>`).join('');
}
