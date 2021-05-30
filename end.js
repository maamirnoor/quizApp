const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");

const mostRecentScore = localStorage.getItem('mostRecentScore');

const finalScore = document.getElementById("finalScore");


const highScores  = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORE = 5;
console.log(highScores);

// localStorage.setItem("highScores",JSON.stringify([]));
// console.log(JSON.parse(localStorage.getItem('highScores')));

finalScore.innerText=mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log("Clicked the save button!");
    e.preventDefault();

    const score = {
        score:mostRecentScore,
        name:username.value
    };
    highScores.push(score);
    highScores.sort((a,b)=>b.score-a.score);
    highScores.splice(5);
    
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
    //console.log(highScores);
};