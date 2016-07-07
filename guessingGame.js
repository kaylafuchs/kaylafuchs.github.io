
(function guessingGame(){	

	var playersGuess = 0;
	var winningNumber = generateWinningNumber();
	var previousGuesses = [];
	var guessesRemaining = 3;
	var hintUsed = false;

	// I tried to decrease the number of jQuery selectors used by declaring the variable below
	// to equal the selector I used most often, but when I did that none of my functions worked anymore.
	// Why is that? Shouldn't this variable be available to all the functions below via closure?
	// var statusMsg = $('#status-messages')

	/* **** Guessing Game Functions **** */

	// Generate the Winning Number
	function generateWinningNumber(){
		return Math.floor(Math.random() * 100);
	}

	// Fetch the Players Guess
	function playersGuessSubmission(){
		var input = $('input[name="num"]')
		playersGuess = parseInt(input.val());
		input.val("");
		checkGuess(playersGuess,winningNumber);
	}

	// Determine if the next guess should be a lower or higher number
	function lowerOrHigher(playersGuess, winningNumber){
		return playersGuess < winningNumber ? "lower" : "higher";

	}

	//Tells user if their guess is high or low and if it's within 20 digits of the number or not
	function distance(winningNumber, playersGuess){
		return Math.abs(winningNumber - playersGuess) <= 20 ? "within 20 digits." : "more than 20 digits away."
	}

	// Tells user how close their guess is to the winning number
	function guessMessage(){
		return "Your guess is " + lowerOrHigher(playersGuess,winningNumber) + " and " + distance(winningNumber,playersGuess);
	}


	// Check if the Player's Guess is the winning number 
	function checkGuess(playersGuess, winningNumber){
		var statusMsg = $('#status-messages');
		if (playersGuess === winningNumber){
			youWin();
		} else {
			if (previousGuesses.indexOf(playersGuess) > -1) {
					statusMsg.text("You already guessed " + playersGuess + ". Try a new number.");
			} else {
				guessesRemaining -= 1;
				$('#guesses-remaining').text("Guesses remaining: " + guessesRemaining);
				previousGuesses.push(playersGuess);
				statusMsg.text(guessMessage).slideDown(100);
				if (guessesRemaining <= 0){
					youLose();
				}
			}
		}
	}

	//changes to DOM if user loses
	function youLose(){
		$('button.main-cta, #game :nth-child(3)').prop('disabled',true);
		$('#status-messages').text("Womp, womp. You lose. Click above to play again.").slideDown(100).css('color','#fa0060');
		$('body').addClass('bg lose-bg');
	}

	//changes to DOM if user wins
	function youWin(){
		$('button.main-cta, #game :nth-child(3)').prop('disabled',true);
		$('#status-messages').text("You win! Bet you can't beat me again though...").slideDown(100).css('color','#0056e1');
		$('body').addClass('bg win-bg');	
	}
	
	// Create a provide hint button that provides additional clues to the user
	function provideHint(){
		var statusMsg = $('#status-messages');
		if (hintUsed == false){
			statusMsg.text("I'm thinking of one of these numbers: " + Math.floor(Math.random() * 100) + ", "+ Math.floor(Math.random() * 100) + ", " + winningNumber).slideDown(100);
			hintUsed = true;	
		} else {
			statusMsg.text("Sorry, I only give one hint per game.").slideDown(100);
		}
	}

	// Allow the "Player" to Play Again
	function playAgain(){
		window.location.reload(true);
	}


	/* **** Event Listeners/Handlers ****  */

	 $(document).ready(function(){

		$('button.main-cta').on('click',function(event){
			if ($('input').val().length > 0 && guessesRemaining > 0){
				playersGuessSubmission();
				console.log("winning num = " + winningNumber + " players guess = " + playersGuess);
				console.log(lowerOrHigher(playersGuess,winningNumber));
			} else if (guessesRemaining <= 0){
				$('button.main-cta, #game :last-child').prop('disabled',true);
			}
		})

		$('input[name="num"]').keypress(function(key){
			if (key.which == 13 && $('input').val().length > 0 && guessesRemaining > 0 ){
				playersGuessSubmission();
			}
		});

		$('#game :nth-child(3)').on('click',function(){
			provideHint();
		});

		$('#game :last-child').on('click',function(event){
			playAgain();
		})
	})

})();

