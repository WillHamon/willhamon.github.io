var quiz = document.getElementById("quiz");
const questions = [
  {
    question: "How long does the cell stay in Interphase?",
    answers: {
      a: "75%",
      b: "90%",
      c: "20%",
      d: "50%"
    },
    correctAnswer: "b"
  },
  {
    question: "What does S phase stand for?",
    answers: {
      a: "Sytokenesis",
      b: "Synthesize",
      c: "Synthesis",
      d: "Synthetic"
    },
    correctAnswer: "c"
  },
  {
    question: "In which phase do the chromosomes recondense and the spindle fibers start to form?",
    answers: {
      a: "Prophase",
      b: "Chromophase",
      c: "Telophase",
      d: "Metaphase"
    },
    correctAnswer: "a"
  },
  {
    question: "What is the third phase in the cell cycle?",
    answers: {
      a: "Prophase",
      b: "Telophase",
      c: "Metaphase",
      d: "Anaphase"
    },
    correctAnswer: "d"
  },
  {
    question: "In which phase do the sister chromatids line up in the middle of the cell?",
    answers: {
      a: "Anaphase",
      b: "Metaphase",
      c: "Middlephase",
      d: "Telophase"
    },
    correctAnswer: "b"
  },
  {
    question: "Which phase forms 2 nuclei in the cell?",
    answers: {
      a: "Telophase",
      b: "Metaphase",
      c: "Nucleophase",
      d: "Cytokinesis"
    },
    correctAnswer: "a"
  },
  {
    question: "What is the division of the cytoplasm called?",
    answers: {
      a: "Cell Division",
      b: "Cytoplasm Division",
      c: "Prophase",
      d: "Cytokinesis"
    },
    correctAnswer: "d"
  },
  {
    question: "Why do people age?",
    answers: {
      a: "Their cells grow",
      b: "Their cells shrink",
      c: "Their cells divide",
      d: "Their cells stick together"
    },
    correctAnswer: "c"
  },
  {
    question: "What is cancer?",
    answers: {
      a: "When your stomach starts to collapse",
      b: "When your back twists 180 degrees and it fractures",
      c: "When your cells can no longer reproduce",
      d: "When your cells uncontrollably divide"
    },
    correctAnswer: "d"
  },
  {
    question: " What the two stages of cell division?",
    answers: {
      a: "Meiosis and Mitosis",
      b: "Interphase and Metaphase",
      c: "Mitosis and Cytokinesis",
      d: "Cytokinesis and Meiosis"
    },
    correctAnswer: "c"
  }
];

function buildQuestions(){

    questions.forEach(
        (section, num) => {
            quiz.innerHTML += "<p>" + section.question + "</p>";
            for(letter in section.answers){
                quiz.innerHTML += "<input type='radio' value='" + letter +"' name='question" + num +"'>" + section.answers[letter] + "<br>";
            }
        }
    );

    quiz.innerHTML += "<div style='text-align: center;'><button id='submit'>submit</button></div>";
}

function getCheckedValue(radioName){
    var radios = document.getElementsByName(radioName);
    for(var y = 0; y < radios.length; y++)
      if(radios[y].checked) return radios[y].value;
}

function checkQuestions(){
    var score = 0;
    var incorrectQuestions = [];
    var answers = [];

    for(x = 0; x < questions.length; x++){
        if(getCheckedValue("question" + x) == questions[x].correctAnswer){
            score++;
        } else{
            incorrectQuestions.push(questions[x]);
            answers.push(getCheckedValue("question" + x));
        }
    }

    quiz.innerHTML = "<div style='text-align: center;'><h1>" + score + "/" + questions.length + "&ensp;|&ensp;" + score/questions.length*100 + "%</h1><a href='quiz.html'>retry</a> | <a href='../home.html'>home</a></div>";

    if(answers.length > 0)
    {
        quiz.innerHTML += "<div style='text-align: center;'><h2>Questions you missed:</h2></div>";
    }

    incorrectQuestions.forEach(
        (section, num) => {
            quiz.innerHTML += "<p>" + section.question + "</p>";
            for(letter in section.answers){
                if(letter == answers[num])
                {
                    quiz.innerHTML += "<div style='font-family: arial; color: red;'>" + section.answers[letter] + "</div>";
                } else if(letter == section.correctAnswer){
                    quiz.innerHTML += "<div style='font-family: arial; color: green;'>" + section.answers[letter] + "</div>";
                } else{
                    quiz.innerHTML += "<div style='font-family: arial;'>" + section.answers[letter] + "</div>";
                }
            }
        }
    );
}

window.onload = function(){
    buildQuestions();
    document.getElementById("submit").addEventListener('click', function(){
       checkQuestions();
    });
};