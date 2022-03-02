var squareSelected; //box that holds the piece that was selected to be played
var pieceSelected = false;
var pieceToMove; //piece's name has 4 digits: ('s'quare or 'r'ound), ('b'lack or 'w'hite), ('g'iant or 'd'warf) and ('h'ole or 'f'lat)
var quarto = false; //true when game is finished
var player1 = document.querySelector('.player1');
var player2 = document.querySelector('.player2');
var playerChanged = false;

// store the pieces played
var row1 = [];
var row2 = [];
var row3 = [];
var row4 = [];
var columnA = [];
var columnB = [];
var columnC = [];
var columnD = [];
var diagonal1 = [];
var diagonal2 = [];

function undoSelect (box) {
    box.classList.remove('selected');
    pieceSelected = false;
};

function select (box) {
    box.target.classList.add('selected');
    pieceSelected = true;
    squareSelected = box.target;
    pieceToMove = box.target.getAttribute('piece');
    player();
};

function player () {
    if (playerChanged == false){
        player1.classList.toggle('active');
        player2.classList.toggle('active');
        playerChanged = true;
    }
}

function removeFromWait(box, piece) {//remove from wait box when piece is played
    box.classList.remove(piece);
    box.classList.add('used');
};

function boardHistory(piece, location) {//stores history of moves
    var pieceCharacteristics = piece.split('');
    
    var aDiagonal = ['a1', 'b2', 'c3', 'd4'];
    var bDiagonal = ['d1', 'c2', 'b3', 'a4'];
        
    if(aDiagonal.includes(location)) {
        diagonal1 = diagonal1.concat(pieceCharacteristics);
    }
    else if (bDiagonal.includes(location)) {
        diagonal2 = diagonal2.concat(pieceCharacteristics);
    }
    
    var positionList = location.split('');

    for(let i=0; i<2; i++){
        console.log(`position number: ${positionList[i]}`);
        if(positionList[i]=='a'){ columnA = columnA.concat(pieceCharacteristics);}
        else if(positionList[i]=='b'){ columnB = columnB.concat(pieceCharacteristics);}
        else if(positionList[i]=='c'){ columnC = columnC.concat(pieceCharacteristics);}
        else if(positionList[i]=='d'){ columnD = columnD.concat(pieceCharacteristics);}
        else if(positionList[i]=='1'){ row1 = row1.concat(pieceCharacteristics);}
        else if(positionList[i]=='2'){ row2 = row2.concat(pieceCharacteristics);}
        else if(positionList[i]=='3'){ row3 = row3.concat(pieceCharacteristics);}
        else if(positionList[i]=='4'){ row4 = row4.concat(pieceCharacteristics);}
    }
    checkQuarto(columnA);
    checkQuarto(columnB);
    checkQuarto(columnC);
    checkQuarto(columnD);
    checkQuarto(row1);
    checkQuarto(row2);
    checkQuarto(row3);
    checkQuarto(row4);
    checkQuarto(diagonal1);
    checkQuarto(diagonal2);
};

function checkQuarto(list) {
    var square = 0;
    var round = 0;
    var black = 0;
    var white = 0;
    var giant = 0;
    var dwarf = 0;
    var flat = 0;
    var hole = 0;

    for(let i = 0; i<list.length; i++) {
        if(list[i] == 's') { square++; if(square == 4) {quarto=true;}}
        else if (list[i] == 'r') { round++; if(round == 4) {quarto=true;}}
        else if (list[i] == 'b') { black++; if(black == 4) {quarto=true;}}
        else if (list[i] == 'w') { white++; if(white == 4) {quarto=true;}}
        else if (list[i] == 'g') { giant++; if(giant == 4) {quarto=true;}}
        else if (list[i] == 'd') { dwarf++; if(dwarf == 4) {quarto=true;}}
        else if (list[i] == 'f') { flat++; if(flat == 4) {quarto=true;}}
        else if (list[i] == 'h') { hole++; if(hole == 4) {quarto=true;}}
    }
    if (quarto) {window.alert('Quarto!');}
};

function selectPiece(ev) {
    if(ev.target.classList.contains('used')) {
        window.alert('Sorry, no pieces here!')
    }
    else if(quarto) {
        window.alert('Game is over! Click in the "Play" button to play again.')
    }
    else {
        if(ev.target.classList.contains('selected')) { //undo select new piece
            ev.target.classList.remove('selected');
            pieceSelected = false;
        }
    
        else if(!pieceSelected) { //select new piece
            ev.target.classList.add('selected');
            select(ev);
        }
        
        else if(pieceSelected) { //undo select if other piece is selected, select a new one
            undoSelect(squareSelected);
            select(ev);
        }
    }
};
    
function onBoard(ev) {// move piece selected to the board
    if(ev.target.classList.contains('occupied')) {
        window.alert('Sorry, occupied!');
    }
    else {
        if(!pieceSelected) {
            window.alert('Please select the piece you wish to bring to the board.')
        }
        
        else if(pieceSelected) {
            removeFromWait(squareSelected, pieceToMove);
            undoSelect(squareSelected);
            ev.target.classList.add(pieceToMove, 'occupied');
            pieceSelected = false;
            playerChanged = false;
            boardHistory(pieceToMove, ev.target.id);
            if(quarto){
                var victor = document.querySelector('.active');
                var celebText = document.querySelector('.celebration');
                victor.classList = '';
                victor.classList.add('fas', 'fa-crown');
                celebText.classList.remove('hide');
            }
        }
    }        
};

function dice(ev) {// gives random values to the dice
    var value = Math.floor(Math.random() * 6) + 1;
    var dice;
    if (value == 1) {dice = 'fa-dice-one';}
    else if (value == 2) {dice = 'fa-dice-two';}
    else if (value == 3) {dice = 'fa-dice-three';}
    else if (value == 4) {dice = 'fa-dice-four';}
    else if (value == 5) {dice = 'fa-dice-five';}
    else if (value == 6) {dice = 'fa-dice-six';}
    console.log(value);
    ev.target.classList = '';
    ev.target.classList.add('fas', dice);
};

function play() {
    window.location.reload();
}


//----------------------- E V E N T S

document.querySelectorAll('.waitBox').forEach(item => {
    item.addEventListener('click', selectPiece);    
})

document.querySelectorAll('.boardBox').forEach(item => {
    item.addEventListener('click', onBoard)
})

document.querySelector('.getDice').addEventListener('click', dice)

document.querySelector('.play').addEventListener('click', play)
