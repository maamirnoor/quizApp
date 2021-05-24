const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let availableQuestions = [];

    let questions = [
    {
        question: "Sunset from?",
        choice1: "East",
        choice2: "West",
        choice3: "North",
        choice4: "South",
        answer: 1
    },
    {
        question: "The term ‘Computer’ is derived from__________?",
        choice1: "Latin",
        choice2: "German",
        choice3: "Arabic",
        choice4: "French",
        answer: 1
    },
    {
        question: "Who is the father of Computer?",
        choice1: "Allen Turing",
        choice2: "Charles Babbage",
        choice3: "Simur Cray",
        choice4: "Augusta Adaming",
        answer: 2
    },
    {
        question: "The basic operations performed by a computer are__________?",
        choice1: "Arithmetic operation",
        choice2: " Logical operation",
        choice3: " Storage and relative",
        choice4: "All the above",
        answer: 4
    },
    {
        question: "Who is the father of Internet ?",
        choice1: "Chares Babbage",
        choice2: "Vint Cerf",
        choice3: "Denis Riche",
        choice4: "Martin Cooper",
        answer: 2
    },
    //Constants
    //    const CORRET_BONUS =10;

    

]
//constants
const CORRET_BONUS=10;
const MAX_QUESTION=5;

startGame=()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    //console.log(availableQuestions);
    getNewQuestion();
};
getNewQuestion = ()=>{
    if(availableQuestions.length===0||questionCounter>=MAX_QUESTION){
        localStorage.setItem('mostRecentScore',score);
        return window.location.assign('/end.html');
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter +"/"+ MAX_QUESTION;


    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion=availableQuestions[questionIndex];
    console.log(questionIndex);
    question.innerText = currentQuestion.question;
    
    choices.forEach(choice =>{
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice"+number];
    });

    availableQuestions.splice(questionIndex,1);
    acceptingAnswers =true;
};
choices.forEach(choice=>{
    choice.addEventListener('click',e=>{
        if(!acceptingAnswers)return;
        acceptingAnswers = false;
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number'];

        //const classToApply='incorrect';

        // if(selectedAnswer==currentQuestion.answer){
        //     classToApply = 'correct';
        // }
        const classToApply= selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        if(classToApply==='correct'){
            incrementScore(CORRET_BONUS);
        }

        console.log(classToApply);
        //console.log(selectedAnswer===currentQuestion.answer);
        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();    
        },1000);
        
    });

});
incrementScore = num =>{
    score+=num;
    scoreText.innerText=score;
};
startGame();