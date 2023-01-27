
const subjects = {
    "fotball": [
        new Question("Vilket land vann VM2022?",["Argentina", "Brasilien", "Marocko", "Frankrike"],"Argentina"),
        new Question("Vilket lag vann Allsvenskan 2022?",["Hammarby", "Malmö FF", "BK Häcken", "Göteborg IF"],"BK Häcken"),
        new Question("Hur många gånger har Zlatan vunnit Guldbollen?",["8", "3", "12", "2"],"12"),
        new Question("Vilket år spelades det första Världmsmästerskapet(VM) i fotboll?",["1916", "1930", "1966", "Ingen av alternativen"],"1930")],

    "world": [
        new Question("Vilket språk är mest talande i hela världen?",["Engelska", "Spanska", "Kinesiska", "Ryska"],"Kinesiska"),
        new Question("Världens högsta byggnad",["Burj Khalifa", "Merdeka 118", "Shanghai Tower", "Eiffel Tower"],"Burj Khalifa"),
        new Question("Mot vilket av följande länder har Litauen inte någon landsgräns?",["Vitryssland", "Polen", "Estland", "Lettland"],"Estland"),
        new Question("Under vilka år pågick första världskriget?",["1916-1920", "1930-1933", "1910-1914", "1914-1918"],"1914-1918")],

    "math": [
        new Question("9*N är lika med 108. Vad är N lika med?",["9", "5", "12", "8"],"12"),
        new Question("Hur många grader är det i rät vinkel?",["45", "90", "120", "180"],"90"),
        new Question("Vilket tal är minst?",["1,9", "1,8819", "1,89", "1,021"],"1,8819"),
        new Question("Vad är nästa tal i denna talföljd: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34..?",["55", "42", "49", "40"],"55")]         
};

   
//Visa frågor på skärmen
function displayQuestion() {

    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for(let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
    
};

function selectSubject() {
    
    let quiz = JSON.parse(localStorage.getItem("result"));
    if (quiz) {
        quiz = new Quiz(quiz.questions);
        quiz.questionIndex = quiz.questions.length;
    } else {
        quiz = new Quiz(subjects[selectedSubject]);
    }
}

//Start där man väljer alternativ
function selectSubject() {
    let subjectSelector = document.getElementById("subject-selector");
    subjectSelector.innerHTML = `
        <h1>Välj alternativ</h1>
        <select id="subject-options">
            ${Object.keys(subjects).map(subject => `<option value='${subject}'>${subject}</option>`).join('')}
        </select>
        <button id='start-quiz' onclick='startQuiz()'>Starta Quiz</button>
    `;
}

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};

//Fråga x av y
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML = 
    `Fråga ${currentQuestionNumber} av ${quiz.questions.length}`;
};

//Resultat
function showScores() {
    let quizEndHTML = 
    `
    <h1>Dina resultat</h1>
    <h2 id='score'> Du hade: ${quiz.score} rätt av ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
        <a href="index.html">Starta om</a>
    </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};

let selectedSubject;

function startQuiz() {
    let subjectSelector = document.getElementById("subject-selector");
    subjectSelector.style.display = "none";
    let quizContainer = document.getElementById("quiz-container");
    quizContainer.style.display = "block";
    selectedSubject = document.getElementById("subject-options").value;
    quiz = new Quiz(subjects[selectedSubject]); // Create quiz object
    displayQuestion();
}


displayQuestion();