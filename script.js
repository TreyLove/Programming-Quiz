var question = document.getElementById("question");
var answers = document.getElementsByClassName("answers")
var timer = document.getElementById("timer");
var startQuiz = document.getElementById("start-quiz");
var quizDiv = document.getElementById("quiz-div")
let count = 30
let gameTimer
var ans1 = document.getElementById("ans1")
var ans2 = document.getElementById("ans2")
var ans3 = document.getElementById("ans3")
var ans4 = document.getElementById("ans4")
// The variables relating to the leaderboard screen
var scoreBoard = document.getElementById("scoreBoard")
var scoreElement = document.getElementById("score")
var submitButton = document.getElementById("submitButton")
var userName = document.getElementById("name")
var scoreArray = []
var scoreListElement = scoreBoard.querySelector('ul')
var newGame = document.getElementById("new-game")
var score = 0


try { scoreArray = JSON.parse(localStorage.getItem("quizScore")) } catch (error) { }
if (scoreArray === null) {
    scoreArray = []
}
// this sets the constructer for the questions and answers
function Question(question, answerArray, correct, answered) {
    this.correct = correct;
    this.answerArray = answerArray;
    this.question = question;

}


// the objects for the questions, answers and the correct answers
let question1 = new Question("Which one of these are a boolean?", ["true", "undefined", "10+16", "Hello world"], "true")
let question2 = new Question("Which one of these is not a primitive?", ["BigInt", "Boolean", "Number", "SmallInt"], "SmallInt")
let question3 = new Question("Which one of these options is an example of a string?", ["hello", "var hello = []", "15", "function(){}"], "hello")
let question4 = new Question("Are Brian's dad jokes funny?", ["Of course!", "Rarely", "NO", "Sure?"], "Rarely")
let question5 = new Question("Is coding fun?", ["No", "Yes", "It depends on how skilled you are", "It's my favorite thing in the world"], "It depends on how skilled you are")
let question6 = new Question("What is CSS used for? ", ["To layout the skeleton of an HTML document", "Nothing useful", "to style an HTML document", "To style a Javascript document"], "to style an HTML document")

// the creation of an array of the questions so they can be randomized
const questionArray = [question1, question2, question3, question4, question5, question6]
var currentQuestion
var randomizedQuestions
var answeredArray = []





// this function posts the questions and answers to the proper buttons and header

var test = function () {
    // this sets the current question to be a random child of the question array
    currentQuestion = questionArray[Math.floor(Math.random() * questionArray.length)];

    console.log(answeredArray)

    // sets the end condition for the test
    if (answeredArray.length >= questionArray.length) {
        question.style.display = "none";
        quizDiv.style.display = "none";
        scoreBoard.style.display = "flex";
        clearInterval(gameTimer)

        console.log("YES")
        leaderboard()
        return
    }
    //if a question is repeated then log a new question
    if (answeredArray.includes(currentQuestion)) {
        test()

    }
    // if the question is new then log it to the answered question array
    else {
        answeredArray.push(currentQuestion)
    }


    question.textContent = currentQuestion.question

    ans1.textContent = currentQuestion.answerArray[0]
    ans2.textContent = currentQuestion.answerArray[1]
    ans3.textContent = currentQuestion.answerArray[2]
    ans4.textContent = currentQuestion.answerArray[3]

    console.log(currentQuestion)


}
// this function logs the score and the the score array to the leaderboard
var leaderboard = function () {

    scoreElement.textContent = "Your Score was: " + score + " out of " + questionArray.length
    scoreListElement.innerHTML = ""


    for (var i = 0; i < scoreArray.length; i++) {
        var li = document.createElement("li")
        li.textContent = scoreArray[i]
        scoreListElement.appendChild(li)
    }









}


console.log(answers)

// adds event listener to the start quiz button to initiate quiz
quizDiv.addEventListener("click", function (event) {






    console.log(event)
    console.log(event.target.textContent)
    var content = event.target.textContent
    if (content === "Start quiz") {
        return
    }
    if (content === currentQuestion.correct) {
        score++
        console.log(score)

        test()
        return


    }
    else {
        console.log(score)
        count -= 2
        test()
        return



    }
})






// adds an event listener to the start button so the quiz can begin
startQuiz.addEventListener("click", function () {


    //sets the interval for the game timer
    gameTimer = setInterval(() => {
        if (count === 0) {
            // sets another end condition for the test if time runs out
            clearInterval(gameTimer)
            timer.textContent = "Game Over";
            count = 30;
            question.style.display = "none";
            quizDiv.style.display = "none";
            scoreBoard.style.display = "flex";
            leaderboard()
            return

        }

        timer.textContent = count
        count--


    }, 1000);

    startQuiz.style.display = "none";
    answers[0].style.display = "inline-block";
    answers[1].style.display = "inline-block";
    answers[2].style.display = "inline-block";
    answers[3].style.display = "inline-block";



    // sets the information in the question object to show up in the buttons on the webpage

    test()


})

// adds event listener to submit your score to the leaderboard
submitButton.addEventListener("click", function () {
    var playerName = userName.value
    if (userName.value === "") {
        alert("Please input a name to submit your score to the leaderboard")
        return
    }
    if (playerName.length > 10) {
        alert("Please input a name of 10 characters or less to submit your score.")
        return
    }
    //logs your score to the leaderboard and commits it to local storage

    scoreArray.push(playerName + ": " + score)
    localStorage.setItem("quizScore", JSON.stringify(scoreArray))
    submitButton.style.display = "none";
    console.log(scoreArray)
    leaderboard()


})

