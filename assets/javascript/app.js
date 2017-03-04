/*possible value? timer, answer clicked, new slide*/
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timer;
var time; //for timer
var question;
var questions = [{
    question: "How many double mopoly will land you in jail?",
    choice1: "one",
    choice2: "two",
    choice3: "three",
    choice4: "nothing at all",
    triviaImage: "assets/images/jail.png",
    answer: 3
  },

  {
    question: "The cost of monopoly to get out of jail time 5?",
    choice1: "50",
    choice2: "150",
    choice3: "200",
    choice4: "250",
    triviaImage: "assets/images/jails.jpg",
    answer: 4

  },

  {
    question: "How many steps it takes to go around the entire board?",
    choice1: "40",
    choice2: "30",
    choice3: "50",
    choice4: "none of the above",
    triviaImage: "assets/images/money.png",
    answer: 1
  },

  {
    question: "You own three railroad, what is the rent, time 3?",
    choice1: "200",
    choice2: "250",
    choice3: "300",
    choice4: "350",
    triviaImage: "assets/images/railroad.jpg",
    answer: 3
  },

  {
    question: "What's the income tax of 20% of 2000?",
    choice1: "100",
    choice2: "200",
    choice3: "300",
    choice4: "400",
    triviaImage: "assets/images/tax.jpg",
    answer: 4
  }, {
    question: "How many color groups are there in monopoly?",
    choice1: "5",
    choice2: "6",
    choice3: "7",
    choice4: "8",
    triviaImage: "assets/images/color.jpg",
    answer: 4
  }, {
    question: "Trick question: What the maximum of rolls, starting from GO, for a full circle?",
    choice1: "4",
    choice2: "10",
    choice3: "20",
    choice4: "unknown",
    triviaImage: "assets/images/rolls.jpg",
    answer: 3
  }

];
/*shows only one question
  answers it/time runs out*/
//question appears
function timerFunction() {
  if (question >= 0 && question < questions.length) {
    time--;
    $(".timeCounter").show();
    $(".timeCounter").html('<h2>Timer: ' + time + 's</h2>');
    if (time <= 0) {
      unanswered++;
      nextQuestion();
    }
  }
};

function gameOver() {
  $(".timeCounter").hide();
  $(".triviaImage").hide();
  $(".answers").hide();
  $(".triviaQuestion").hide();
  $("#restartGame").show();
  $("#correct").show();
  $("#incorrect").show();
  $("#unanswered").show();
  /* a) if --correct answer -- congratulating-right option. */
  if (correct === 1) {
    $("#correct").html('<h2>You got ' + correct + " Question(s) Right!!</h2>");
  } else {
    $("#correct").html('<h2>You got ' + correct + " Question(s) Right!</h2>");
  }
  /*b) else if-- wrong answers --- screen wrong option/ correct answer*/
  if (incorrect === 1) {
    $("#incorrect").html('<h2>You got ' + incorrect + " Question(s) Wrong!</h2>");
  } else {
    $("#incorrect").html('<h2>You got ' + incorrect + " Question(s) Wrong!</h2>");
  }
  /*else --- time-outs -- mark it as unanswered */
  if (unanswered === 1) {
    $("#unanswered").html('<h2>' + unanswered + ' Questions Unanswered!</h2>');
  } else {
    $("#unanswered").html('<h2>' + unanswered + ' Question(s) Unanswered!</h2>');
  }

};

/*scoreboard # correct answers # incorrect answers*/
function checkAnswer(answer) {
  if (questions[question].answer === answer) {
    correct++;
  } else {
    incorrect++;
  }
  nextQuestion();
}

/* a) After a few seconds, display the next question -- 
 do this without user input.*/
//click listener for new display of answer?

function showQuestion() {
  time = 30;
  $(".timeCounter").show();
  $(".timeCounter").html('<h2>Timer: ' + time + 's</h2>');

  //  Variable that will hold our setInterval that runs the time

  if (timer == null) {
    timer = setInterval(timerFunction, 1000);
  } else {
    clearInterval(timer);
    timer = setInterval(timerFunction, 1000);
  }

  console.log(question);
  $(".triviaQuestion").html("<h2> " + questions[question].question + "</h2>");
  $(".triviaImage").attr('src', questions[question].triviaImage);
  $(".triviaImage").show();
  $(".answers").show();
  $(".triviaQuestion").show();
  $("#button1").text(questions[question].choice1);
  $("#button2").text(questions[question].choice2);
  $("#button3").text(questions[question].choice3);
  $("#button4").text(questions[question].choice4);

};

//reset game to originals
function restartGame() {
  question = -1;
  nextQuestion();
  correct = 0;
  incorrect = 0;
  unanswered = 0;
  $("#restartGame").hide();
  $("#correct").hide();
  $("#incorrect").hide();
  $("#unanswered").hide();

};

//click listener to possible answer
$(document).ready(function() {
  $("#button1").on("click", function() {
    checkAnswer(1);
  });
  $("#button2").on("click", function() {
    checkAnswer(2);
  });
  $("#button3").on("click", function() {
    checkAnswer(3);
  });
  $("#button4").on("click", function() {
    checkAnswer(4);
  });

  $('#restartGame').on("click", function() {
    restartGame();
  });
  $('.triviaImage').hide();
  $('.answers').hide();
  $("#restartGame").hide();
  $('#startGame').on('click', function() {
    $('#startGame').hide();
    $('#title').hide();
    $('#gameDirections').hide();
    restartGame();
  });
});

function nextQuestion() {
  question++;
  if (question == questions.length) {
    gameOver();
  } else {
    showQuestion();

  }
};

// https://github.com/kerrywall/jQuery-guessing-game
// https://github.com/bambielli/week-4-homework/blob/master/assets/javascript/rpgStarWars.js
