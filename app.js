/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores;
var activePlayer;
var dice;
var diceImage;
var roundscore;
var rollBtn;
const endScore = 10;
var Players = [
    window.prompt("First player name",""),
    window.prompt("Second player name","")
];
function runGame(){

    document.getElementById('name-0').innerHTML = Players[0];
    document.getElementById('name-1').innerHTML = Players[1];
    document.getElementById('score-1').innerHTML='0';
    document.getElementById('score-0').innerHTML='0';
    document.getElementById('current-0').innerHTML='0';
    document.getElementById('current-1').innerHTML='0';
    scores = [0,0];
    activePlayer = 0;
    rollBtn = document.querySelector('.btn-roll'); 
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');

    rollBtn.disabled = false;

    dice;
    diceImage = document.querySelector('.dice');
    roundscore=0;
    diceImage.style.display = 'none';
}

runGame();


function holdIt(){

    scores[activePlayer] += roundscore;
    document.getElementById('current-'+activePlayer).innerHTML = 0;

    document.getElementById('score-'+activePlayer).innerHTML = scores[activePlayer];
    roundscore = 0;

    if(scores[activePlayer]>=endScore){
        //Game Over

        document.getElementById('name-'+activePlayer).innerHTML = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        rollBtn.disabled = true;
    }
    else{
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        activePlayer = (activePlayer+1)%2;
    }
  
}

document.querySelector('.btn-hold').addEventListener('click',holdIt);
    
rollBtn.addEventListener('click',function(){
    dice = (Math.floor(Math.random()*6))+1;
    diceImage.src = 'dice-'+dice+'.png';


    if(dice>1)
    {
        roundscore+=dice;
        document.getElementById('current-'+activePlayer).innerHTML = roundscore;
        diceImage.style.display = 'block';
    }
    else{
        roundscore = 0;
        holdIt();        
    }
 
});

document.querySelector('.btn-new').addEventListener('click',function(){
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('winner');
    runGame();
});