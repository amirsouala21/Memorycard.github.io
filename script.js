const cards = document.querySelectorAll('.memory-card')
// selection of all the cards

var hasBeenFlipped = false;
    var first , second ;
    var cardLock = false;

function flipcard(){
    if(cardLock)return; 
    // to remove the bugs
    if(this === first) return;
    // to remove the bug of clicking twice on the same card
    this.classList.add('flip')

    if(!hasBeenFlipped){
        // first flip 
        hasBeenFlipped = true;
        first = this;
    } else {
        // second flip
        hasBeenFlipped = false;
        second = this;
       
        // do the cards match ?
        let x = (first.dataset.framework === second.dataset.framework)
         x ? disableCards() : unflipCards(); 
    }
}

function disableCards (){
    first.removeEventListener('click', flipcard);
    second.removeEventListener('click', flipcard);
    // the cards match , we don't need to flip them anymore
}

function unflipCards(){
    cardLock = true;
    // you can't click on a card until the cards active are unfliped
    setTimeout(()=>{
        first.classList.remove('flip')
        second.classList.remove('flip')
        cardLock = false 
        // now we can clickon another card if we cant
        resetBord();
    },1500);
} 

function resetBord (){
    hasBeenFlipped = false
    cardLock = false
    first = null
    second = null
}

(function shuffle (){
    cards.forEach(card => {
        let position = Math.floor((Math.random()) * 12);
        card.style.order = position;
    });
})();

cards.forEach(card => card.addEventListener('click' , flipcard));