// Written by Sinmisola Kareem
/*GAME FUNCTION:
- Player must guess number between a min and max
- Player must get a certain amount of guesses
- Notify player of guesses remaining
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn');
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');
      
// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Event Listener unto parent (Delegation) for Play again
game.addEventListener('mousedown',function(e){
  if(e.target.className === 'play-again'){
    //reload page
    window.location.reload();

  }
})

//Listen for guess
guessBtn.addEventListener('click',function(){
  // convert to number
  let guess = parseInt(guessInput.value);

  //Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`,'red');
  }

  //Check if won
  if(guess === winningNum){
    // GAME OVER - won
    gameOver(true,`${winningNum} is correct!, YOU WIN!`);
  } else{
    //Wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0){
      // Game over - lost
      gameOver(false,`Game Over, you lost. The correct number is ${winningNum}`);
    } else {
      // Game continues - answer wrong
      //Change border color
      guessInput.style.borderColor = 'red';

      // Clear Input
      guessInput.value = '';
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`,'red');
    
    }


  }

});

// Game over
function gameOver(won,msg){
  let color;
  won === true ? color = 'green' : color ='red';

     //Disable input
     guessInput.disabled = true;
     //Change border color
     guessInput.style.borderColor = color;
     //Set message
     setMessage(msg,color);

     // Play again?
     guessBtn.value = 'Play Again';
     guessBtn.className += 'play-again';
     
     //Event Listener unto parent (Delegation)
}

//Set message 
function setMessage(msg, color){
message.style.color = color;
message.textContent = msg;
}

//Get random number
function getRandomNum(min,max){
  // Generate random number between min and max 
  return Math.floor(Math.random()*(max-min + 1)+min);
} 

