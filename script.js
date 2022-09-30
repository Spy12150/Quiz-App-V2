const startButton = document.getElementById('start')
const confirmButton = document.getElementById('confirm')
const nextButton = document.getElementById('next')
const welcome = document.getElementById('Welcome')
const Qcontainer = document.getElementById('Qcontainer')
const Acontainer = document.getElementById('Acontainer')
const questionElement = document.getElementById('question')
const scoreHTML = document.getElementById('score')
let orderQuestions
let currentQuestion
let score = 0
let clickedbutton

var selectedButton

startButton.addEventListener('click', startQuiz)
confirmButton.addEventListener('click', checkCorrect)
nextButton.addEventListener('click', () => {
  currentQuestion++
  setNext()
})

function startQuiz() {
    startButton.classList.add('noshow')
    welcome.classList.add('noshow')
    orderQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestion = 0
    Qcontainer.classList.remove('noshow')
    Acontainer.classList.remove('noshow')
    scoreHTML.classList.remove('noshow')
    setNext()
}

function showQuestion(q) {
    questionElement.innerText = q.question
    q.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('button')
        if (answer.correct) {
          button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        Acontainer.appendChild(button)
    }) 
}

function setNext() {
    questionElement.classList.remove("incorrect")
    questionElement.classList.remove("correct")
    confirmButton.classList.remove('noshow')
    nextButton.classList.add('noshow')
    while (Acontainer.firstChild) {
        Acontainer.removeChild(Acontainer.firstChild)
    }
    showQuestion(orderQuestions[currentQuestion])
}

function selectAnswer(element) {
    /*This is the part that lets the clicked button show lightblue while everything else is lightseasgreen*/
    let firstButton = Acontainer.firstChild
    /* The idea here is I loop through every single child node and reset the color*/
    for (let i = 0; i < Acontainer.childNodes.length; i++){
        firstButton.style.backgroundColor = 'lightseagreen'
        firstButton = firstButton.nextSibling
    }
    /* Now when I finish resetting colors the selected button becomes Null as it has reached the end of the list, so I have to redeclare a button name*/
    selectedButton = element.target
    selectedButton.style.backgroundColor = 'lightblue'
    console.log(selectedButton.dataset.correct)
    /*Holy shit its 2am I finally figured it out*/
}

function checkCorrect() {
    if(selectedButton.dataset.correct){
        setStatusClass(true)    
        score = score + 1
        scoreHTML.innerHTML = "score = " + score
        confirmButton.classList.add('noshow')
        nextButton.classList.remove('noshow')
    }else{
        setStatusClass(false)
        confirmButton.classList.add('noshow')
        nextButton.classList.remove('noshow')
    }
    
}

function setStatusClass(correct) {
    if (correct) {
        questionElement.innerText = "CORRECT!"
        questionElement.classList.add("correct")
    }else{
        questionElement.innerText = "WRONG!"
        questionElement.classList.add("incorrect")
    }
  }

const questions = [
    {
        question: 'Can a const be edited later?',
        answers: [
            {text: 'Yes', correct: true},
            {text: 'No', correct: false}
        ]
    },
    {
        question: 'What does = do in javascript?',
        answers: [
            {text: 'Returns if two operands are the same', correct: false},
            {text: 'Sets a value', correct: true}
        ]
    },
    {
        question: 'Is Javascript better than Python',
        answers: [
            {text: 'Yes', correct: false},
            {text: 'No', correct: true}
        ]
    },
    {
        question: 'What is an int variable?',
        answers: [
            {text: 'A whole number', correct: true},
            {text: 'A list of numbers', correct: false},
            {text: 'A word', correct: false},
            {text: 'True or False', correct: false}
        ]
    },
    {
        question: 'What is a Bool variable?',
        answers: [
            {text: 'A whole number', correct: false},
            {text: 'A list of numbers', correct: false},
            {text: 'A word', correct: false},
            {text: 'True or False', correct: true}
        ]
    },
    {
        question: 'What is an undefined variable?',
        answers: [
            {text: 'A whole number', correct: false},
            {text: 'A list of numbers', correct: false},
            {text: 'A declared but not assigned variable', correct: true},
            {text: 'A non-existent or invalid value', correct: false}
        ]
    }
]