$('#start-button').on('click', function(){
    console.log('YOU CLICKED ME!')
})

$(document).ready(function(){

    // start the game when user clicks on Start button
    $("#start-button").on("click", gameState.startTimer);
  
  });
  
  // information about the state of game play
  var gameState = {
  
    // set the time at 60 seconds, and count down by 1 second
    timeRemaining : 60,
  
    // start the timer, hide the start page, show the questions
    startTimer: function() {
      $("#timer").text("Time remaining: " + gameState.timeRemaining);
      setInterval(gameState.countdown, 1000);
      $("#start-page").hide();
      trivia.displayQuestions();
    },
  
    // decrement the timer and update the UI; stop the timer at 0
    countdown: function() {
      gameState.timeRemaining--;
      $("#timer").text("Time remaining: id=timeremaining" + gameState.timeRemaining);
      if (gameState.timeRemaining === 0) {
        gameState.stopTimer();
        $("#timer").empty();
      }
    },
  
    // stop the timer and check the answers
    stopTimer: function() {
      clearInterval();
      trivia.checkAnswers();
    },
  
    // hide the quetions and display the end page with results
    showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
      $("#end-page").show();
      $("#questions-box").empty();
      $("#timer").empty();
      $("#timer").hide();
      $("#correct-answers").text("Correct answers (Awesome!): " + numCorrect);
      $("#incorrect-answers").text("Incorrect answers (Keep Trying!): " + numIncorrect);
      $("#unanswered").text("Skipped questions (Try Harder!): " + numUnanswered);
    }
  }
  
  // functions to handle the building questions page and scoring
  var trivia = {
  
    // pull questions from the array of questions, loop through them, and append to UI
    displayQuestions: function() {
      var divContainer = $("#questions-box");
      var answerGroup = $(".form-check");
      divContainer.append('<h2>Answer the following questions:</h2>');
              
      for (var i = 0; i < questionBank.length; i++) {
  
        divContainer.append('<div id="question">' + questionBank[i].question + '</div>');
  
        var answer1 = questionBank[i].answers[0];
        var answer2 = questionBank[i].answers[1];
        var answer3 = questionBank[i].answers[2];
        
  
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
        
      }
  
      // add a Done button to the end of the page and register its click handler
      var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
      divContainer.append(doneButton);
      $("#done-button").on("click", gameState.stopTimer);
    },
  
    // test if the user answers are correct, incorrect, or if there are unanswered questions
    checkAnswers: function() {
      var correctAnswer;
      var userAnswer;
      var numCorrect = 0;
      var numIncorrect = 0;
      var numUnanswered = 0;
  
      // loop through to compare the text of the label with the user answers
      // increment score counts appropriately
      for (var i = 0; i < questionBank.length; i++) {
        correctAnswer = questionBank[i].correct;
        userAnswer = $('input[id=radio'+i+']:checked + label').text();
  
        if (userAnswer === correctAnswer) {
          numCorrect++;
        } else if (userAnswer === "") {
          numUnanswered++;
        } else if (userAnswer !== correctAnswer) {
          {
            numIncorrect++;
          }
        }
      }
  
      // show the end page with the score tally
      gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
    },
  }
  
  // array of objects with the questions, possible answers, and the correct answer
  var questionBank =
  [
    {
      question: "Who was the youngest Heavyweight Champion?",
      answers: ["Tommy Morrison", "Mike Tyson", "Floyd Patterson"],
      correct: "Floyd Patterson"
    },
  
    {
      question: "Which boxing movie made Sylvester Stallone an overnight star?",
      answers: ["Raging Bull", "The Fighter", "Rocky"],
      correct: "Rocky"
    },
    {
      question: "Who held the most boxing titles?",
      answers: ["Floyd Mayweather Jr.", "Manny Pacquiao", "Sugar Ray Leonard"],
      correct: "Manny Pacquiao"
    },
    {
      question: "Which boxing champion considered himself 'The Greatest?'",
      answers: ["Mike Tyson", "Rocky Marciano", "Muhammand Ali"],
      correct: "Muhammand Ali"
    },
    {
      question: "Who won the most prize money for a prize fight",
      answers: ["Oscar DeLaHoya", "Manny Pacquiao", "Floyd Mayweather Jr."],
      correct: "Floyd Mayweather Jr."
    },
    {
      question: "What boxing weight class is limited to 190 pounds?",
      answers: ["Middleweight", "Cruiserweight", "Heavyweight"],
      correct: "Cruiserweight"
    },
    {
      question: "How old was George Foreman when he became the oldest heavyweight champion?",
      answers: ["49 years", "51 years", "45 years"],
      correct: "45 years"
    },
    {
      question: "What nickname do boxing fans call 300 pound Eric Esch, King of the Four-Rounders?",
      answers: ["Great White Hope", "Butter Bean", "Powder Puff"],
      correct: "Butter Bean"
    },
    {
      question: "What pro-sport gives its participants an 87 percent chance of suffering brain injury?",
      answers: ["Football", "Hockey", "Boxing"],
      correct: "Boxing"
    },
    {
      question: "What heavyweight champion was nicknamed 'Real Deal'?",
      answers: ["Michael Moore", "Larry Holmes","Evander Holyfield"],
      correct: "Evander Holyfield"
    }
  ]