/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
            [DONE] => check: openClickedCard(card)

 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
            [DONE]  => check: addToOpenedCards(card)

 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
            [DONE]  => check: addToOpenedCards(card)

 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
            [DONE]  => check: increamnetMoveNumber()

 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
            [DONE]  => check: displayFinalMessage();
 */



/*
 * Create a list that holds all of your cards
 */
var cards = ['paper-plane-o', 'anchor', 'bolt', 'cube', 'anchor', 'leaf',
    'bicycle', 'diamond', 'bomb', 'leaf', 'bomb', 'bolt', 'bicycle', 'paper-plane-o', 'cube', 'diamond'];
var openedCards = [];
var lockedCardsList = []; // This list to contains matched cards
var restartButton = document.querySelector('.restart');
var deck = document.querySelector('.deck');
var moves = document.querySelector('.moves');
var counter = 0;
var finalMessage = document.querySelector('.final-message');

moves.innerHTML = counter;
setupCards();

/**
* @description  Increament the move number.
* @param NONE
* @returns NONE
*/
function increamnetMoveNumber() {
    moves.innerHTML = ++counter;
}

/**
* @description  Display the final message with score.
* @param NONE
* @returns NONE
*/
function displayFinalMessage() {
    finalMessage.innerHTML = 'You win with the score [' + counter + '].';
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

cards = shuffle(cards);
/*
TODO :
		- I need to assign the deck class to a variable
		- Looping the cards by for(cards of card)
		- When add HTML code I have to concatenate the card name class with fa fa-[cardName]
*/
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// This function is to open clicked card by changing the element class name
/**
* @description  Open the card when it clicked.
* @param card element
* @returns NONE
*/
function openClickedCard(card) {
    card.className = 'card show open';
}

/**
* @description  Add matched cards to locked list and add "match" class for them
* @param card element
* @returns NONE
*/
function lockedCards(cards) {
    openedCards[0].className = 'card open match';
    openedCards[1].className = 'card open match';
    lockedCardsList.push(cards.pop());
    lockedCardsList.push(cards.pop());

    // When all cards are matched display the final message with score
    if(lockedCardsList.length === 16)
    {
        displayFinalMessage();
    }
    console.log(lockedCardsList);
}

/**
* @description  Add opened card to the openCards list, and check if
    the cards matched or not
* @param card element
* @returns NONE
*/
function addToOpenedCards(card) {

    // If the card already opened, then do nothing
    if (lockedCardsList.includes(card))
    {
        return;
    }

    openedCards.push(card);
    if (openedCards.length === 2) {
        // Check if the two cards are matched
        if (openedCards[0].childNodes[0].className === openedCards[1].childNodes[0].className)
        {
            lockedCards(openedCards);
        } else {
            // if the cards are not matched, then we will close the cards and remove them from the list
            var delayInMilliseconds = 1000; // 1 second
                openedCards[0].className = 'card show open';
                openedCards[1].className = 'card show open';
            setTimeout(function() {
               openedCards[0].className = 'card';
            openedCards[1].className = 'card';
            openedCards.pop();
            openedCards.pop();
            }, delayInMilliseconds);
            console.log(openedCards);
        }

        // Increament move number when second card clicked
        increamnetMoveNumber();
    }
}

/**
* @description  To setup the board with shuffled cards and reset all lists
* @param NONE
* @returns NONE
*/
function setupCards() {
    var li;
    var i;
    counter = 0;
    moves.innerHTML = counter;
    openedCards = [];
    lockedCardsList = [];
    finalMessage.innerHTML = '';
    deck.innerHTML = '';
    cards = shuffle(cards);
    for(card of cards) {
        li = document.createElement('li');
        li.className = 'card';

        i = document.createElement('i');
        i.className = 'fa fa-'+card;
        li.appendChild(i);
        deck.appendChild(li);

    }
}

/**
* @description To handle restart button click event
* @param
* @returns NONE
*/
restartButton.addEventListener('click', function(){
    setupCards();
});


deck.addEventListener('click', function(event){

    // I don't like the idea of creating EventListener funcrion for each card
    // So, I tried to do one function that handled all click events based on (event.target) attributes

    var clickedCard;
    // Check if the <li> tag has been clicked
    if (event.target.tagName === 'LI')
    {
        clickedCard = event.target;
    } else if (event.target.tagName === 'I') {

        // This case is the <i> has been clicked. So, we will get the parentElemnt
        clickedCard = event.target.parentElement;
    } else {
        // This is special case when user accidentally click on the board
        // When the user click on board it moved to left. So, we fix it by adding this block of if statment
        return;
    }

    openClickedCard(clickedCard);
    addToOpenedCards(clickedCard);
});