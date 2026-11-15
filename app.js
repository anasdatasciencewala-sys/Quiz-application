var quizQuestions = {

    Easy: [

        {
            category: "HTML",
            question: "Which HTML tag is used to create the largest heading?",
            options: ["<h1>", "<h6>", "<head>", "<heading>"],
            answer: 0,
            explanation: "The <h1> tag creates the largest heading in HTML."
        },

        {
            category: "CSS",
            question: "Which CSS property changes the text color?",
            options: ["background-color", "font-size", "color", "text-style"],
            answer: 2,
            explanation: "The color property changes the color of text."
        },

        {
            category: "JavaScript",
            question: "Which keyword can declare a variable in JavaScript?",
            options: ["var", "style", "body", "className"],
            answer: 0,
            explanation: "var is a JavaScript keyword used to declare a variable."
        },

        {
            category: "HTML",
            question: "Which HTML tag creates a hyperlink?",
            options: ["<img>", "<a>", "<p>", "<link>"],
            answer: 1,
            explanation: "The <a> tag creates a hyperlink. The href attribute specifies its destination."
        },

        {
            category: "Git & GitHub",
            question: "What is Git mainly used for?",
            options: [
                "Editing images",
                "Version control",
                "Creating websites only",
                "Writing CSS"
            ],
            answer: 1,
            explanation: "Git tracks changes in code and helps developers manage different versions of a project."
        }

    ],


    Medium: [

        {
            category: "JavaScript",
            question: "What will be the output of this code?",
            code: "var x = 10;\nvar y = 5;\nconsole.log(x + y * 2);",
            options: ["30", "20", "25", "15"],
            answer: 1,
            explanation: "Multiplication happens before addition. First 5 * 2 = 10, then 10 + 10 = 20."
        },

        {
            category: "CSS",
            question: "Which CSS property makes an element a flex container?",
            options: [
                "position: flex;",
                "display: flex;",
                "flex: display;",
                "align: flex;"
            ],
            answer: 1,
            explanation: "display: flex; turns an element into a flex container."
        },

        {
            category: "JavaScript",
            question: "What will this code print?",
            code: "var number = 7;\nif (number > 5) {\n    console.log('Yes');\n} else {\n    console.log('No');\n}",
            options: ["No", "7", "Yes", "Error"],
            answer: 2,
            explanation: "7 is greater than 5, so the if condition is true and 'Yes' is printed."
        },

        {
            category: "Git & GitHub",
            question: "Which Git command stages all changed files?",
            options: [
                "git push",
                "git add .",
                "git commit",
                "git status"
            ],
            answer: 1,
            explanation: "git add . stages changes in the current directory and its subdirectories."
        },

        {
            category: "HTML",
            question: "Which attribute provides alternative text for an image?",
            options: ["src", "href", "alt", "title"],
            answer: 2,
            explanation: "The alt attribute provides alternative text for an image."
        }

    ],


    Hard: [

        {
            category: "JavaScript",
            question: "What will be the output?",
            code: "var total = 0;\nfor (var i = 1; i <= 4; i++) {\n    total = total + i;\n}\nconsole.log(total);",
            options: ["4", "6", "10", "15"],
            answer: 2,
            explanation: "The loop adds 1 + 2 + 3 + 4. The final total is 10."
        },

        {
            category: "JavaScript",
            question: "What will this code print?",
            code: "var x = 10;\nvar y = 5;\nconsole.log((x + y) * 2);",
            options: ["20", "25", "30", "15"],
            answer: 2,
            explanation: "Parentheses are calculated first: 10 + 5 = 15. Then 15 * 2 = 30."
        },

        {
            category: "CSS",
            question: "Which CSS selector selects an element with id='box'?",
            options: [".box", "#box", "box", "*box"],
            answer: 1,
            explanation: "The # symbol selects an element by its ID."
        },

        {
            category: "JavaScript",
            question: "What will be the output?",
            code: "var numbers = [10, 20, 30];\nconsole.log(numbers[1]);",
            options: ["10", "20", "30", "1"],
            answer: 1,
            explanation: "Array indexing starts at 0. numbers[0] is 10 and numbers[1] is 20."
        },

        {
            category: "Git & GitHub",
            question: "Which Git command uploads local commits to a remote repository?",
            options: [
                "git pull",
                "git init",
                "git push",
                "git add"
            ],
            answer: 2,
            explanation: "git push sends your local commits to a remote repository such as GitHub."
        }

    ]

};
var currentLevel = "";
var currentQuestions = [];
var currentQuestion = 0;
var score = 0;
var userAnswers =[];

function showScreen(screenId){
    var screens= document.getElementsByClassName("screen")
    for(var i = 0; i < screens.length; i++){
        screens[i].classList.remove("active");
    }

    document.getElementById(screenId).classList.add("active")
}

function startQuiz(level){
    currentLevel =level;
    currentQuestions = quizQuestions[level];
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    document.getElementById("levelName").textContent = level +"Level";
    showScreen("quizScreen");
    showQuestion();

}
function showQuestion() {

    var question = currentQuestions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        "Question " + (currentQuestion + 1) + " / " + currentQuestions.length;

    document.getElementById("scoreText").textContent = "Score: " + score;

    document.getElementById("progressBar").style.width =
        (currentQuestion / currentQuestions.length * 100) + "%";

    document.getElementById("category").textContent = question.category;

    document.getElementById("questionText").textContent = question.question;

    

    var codeBox = document.getElementById("codeBox");

    if (question.code) {
        codeBox.style.display = "block";
        document.getElementById("codeText").textContent = question.code;
    } else {
        codeBox.style.display = "none";
        document.getElementById("codeText").textContent = "";
    }

  

    var optionsBox = document.getElementById("optionsBox");

    optionsBox.innerHTML = "";



    for (var i = 0; i < question.options.length; i++) {

        var button = document.createElement("button");

        button.className = "option";

        
        button.textContent = String.fromCharCode(65 + i) + ". " + question.options[i];

        button.setAttribute("data-index", i);

        button.onclick = function() {
            checkAnswer(Number(this.getAttribute("data-index")));
        };

        optionsBox.appendChild(button);
    }

    

    document.getElementById("feedback").classList.remove("show");

    document.getElementById("feedbackTitle").textContent = "";
    document.getElementById("correctAnswer").textContent = "";
    document.getElementById("explanation").textContent = "";

    document.getElementById("nextBtn").style.display = "none";
}

function checkAnswer(selectedAnswer) {

    var question = currentQuestions[currentQuestion];

    var optionButtons = document.getElementsByClassName("option");

    var isCorrect = selectedAnswer === question.answer;

    if (isCorrect) {
        score++;
    }

    

    userAnswers[currentQuestion] = selectedAnswer;

    

    for (var i = 0; i < optionButtons.length; i++) {

        optionButtons[i].disabled = true;

        if (i === question.answer) {
            optionButtons[i].classList.add("correct");
        }

        if (i === selectedAnswer && !isCorrect) {
            optionButtons[i].classList.add("wrong");
        }
    }

    

    var feedback = document.getElementById("feedback");

    feedback.classList.add("show");

    if (isCorrect) {
        document.getElementById("feedbackTitle").textContent = "Correct Answer!";
        document.getElementById("feedbackTitle").style.color = "#42db9a";
    } else {
        document.getElementById("feedbackTitle").textContent = "✗ Incorrect Answer!";
        document.getElementById("feedbackTitle").style.color = "#ff7d8a";
    }

    document.getElementById("correctAnswer").textContent =
        "Correct Answer: " + question.options[question.answer];

    document.getElementById("explanation").textContent =
        "Explanation: " + question.explanation;

    document.getElementById("scoreText").textContent = "Score: " + score;

    

    var nextBtn = document.getElementById("nextBtn");

    nextBtn.style.display = "inline-block";

    if (currentQuestion === currentQuestions.length - 1) {
        nextBtn.textContent = "See Results →";
    } else {
        nextBtn.textContent = "Next Question →";
    }
}




function nextQuestion() {

    if (currentQuestion < currentQuestions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        showResult();

    }
}




function showResult() {

    showScreen("resultScreen");

    var total = currentQuestions.length;

    var percent = (score / total) * 100;

    document.getElementById("finalScore").textContent =
        score + " / " + total;

    document.getElementById("percentage").textContent =
        "Your Score: " + percent + "%";

    if (percent === 100) {
        document.getElementById("resultMessage").textContent =
            "Perfect Score! You are a Coding Champion! ";
    } else if (percent >= 60) {
        document.getElementById("resultMessage").textContent =
            "Great work! Keep improving your coding skills. ";
    } else {
        document.getElementById("resultMessage").textContent =
            "Good try! Practice more and try again. ";
    }

    

    var reviewBox = document.getElementById("reviewBox");

    reviewBox.innerHTML = "<h2 style='margin-bottom:18px;'>Answer Review</h2>";

    for (var i = 0; i < currentQuestions.length; i++) {

        var question = currentQuestions[i];

        var selected = userAnswers[i];

        var correct = question.answer;

        var reviewItem = document.createElement("div");

        reviewItem.className = "review-item";

        var heading = document.createElement("h3");

        heading.textContent = "Q" + (i + 1) + ": " + question.question;

        reviewItem.appendChild(heading);

        var yourAnswer = document.createElement("p");

        yourAnswer.textContent = "Your Answer: " + question.options[selected];

        if (selected === correct) {
            yourAnswer.className = "review-correct";
        } else {
            yourAnswer.className = "review-wrong";
        }

        reviewItem.appendChild(yourAnswer);

        var correctAnswerText = document.createElement("p");

        correctAnswerText.className = "review-correct";

        correctAnswerText.textContent =
            "Correct Answer: " + question.options[correct];

        reviewItem.appendChild(correctAnswerText);

        var explanationText = document.createElement("p");

        explanationText.textContent =
            "Explanation: " + question.explanation;

        reviewItem.appendChild(explanationText);

        reviewBox.appendChild(reviewItem);
    }

}




function goHome() {
    showScreen("homeScreen");
}
