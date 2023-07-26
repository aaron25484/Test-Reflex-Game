let enterUser = document.querySelector("#button_first_screen");
const startGame = document.querySelector("#button_second_screen");
const gameButton = document.querySelector("#button_game");
const againGame = document.querySelector("#button_play_again");
const watchOut = document.querySelector("#button_moving_second_screen");
const movingButton = document.querySelector("#button_moving_game");
const backLogin = document.querySelector("#button_back_login");

let showLogin = document.querySelector(".insert_name");
let showRanking = document.querySelector(".ranking");
let showStartGame = document.querySelector(".pre_game-none");
let showGame = document.querySelector(".main_screen_game-none");
let showScore = document.querySelector(".score_screen-none");
let showMovingStart = document.querySelector(".pre_moving_game-none");
let showMovingGame = document.querySelector(".main_moving_screen_game-none");
let showGetReady = document.querySelector(".ready_screen-none");

let textScore = document.getElementById("your_score");
let textUser = document.querySelector("#userName");
let username = "";

let beginChrono;

//------------------------------LOGIN SCREEN--------------------------------//

enterUser.addEventListener('click', ()=>{
    if(textUser.value === ""){
        enterUser.disabled;
    } else {
        username = textUser.value;
        showLogin.classList.add("insert_name-none");
        showStartGame.classList.add("pre_game-flex");
    }   
} )

//------------------------------PRE START GAME--------------------------------//

startGame.addEventListener('click', ()=>{
    showStartGame.classList.remove("pre_game-flex");
    showStartGame.classList.add("pre_game-none");
    showGetReady.classList.remove("ready_screen-none");
    showGetReady.classList.add("ready_screen-flex");

    let randomTime = Math.floor(Math.random() * 10000);
    let startTime;

    startTime = setTimeout(()=>{
        showGetReady.classList.add("ready_screen-none");
        showGetReady.classList.remove("ready_screen-flex");
        showGame.classList.remove("main_screen_game-none")
        showGame.classList.add("main_screen_game-flex");

        startChrono();
    },randomTime);
})

//------------------------------GAME BUTTON SCREEN--------------------------------//

function startChrono(){
    beginChrono = Date.now()
}

let resultTime;

function stopChrono(){
    let endChrono = Date.now()
    resultTime = (endChrono - beginChrono) / 1000;
    saveResult(username, resultTime.toFixed(4));
    updateHiresultList();
}

gameButton.addEventListener('click', ()=>{
    showGame.classList.add("main_screen_game-none");
    showGame.classList.remove("main_screen_game-flex");
    showScore.classList.remove("score_screen-none");
    showScore.classList.add("score_screen");
    stopChrono();
} ) 

//--------------------------------SCORE SCREEN--------------------------------//

againGame.addEventListener('click', ()=>{
    showScore.classList.remove("score_screen");
    showScore.classList.add("score_screen-none");
    showMovingStart.classList.add("pre_moving_game-flex");
} )

backLogin.addEventListener('click', ()=>{
    showLogin.classList.add("insert_name");
    showLogin.classList.remove("insert_name-none");
    showScore.classList.remove("score_screen");
    showScore.classList.add("score_screen-none");
    if(textUser.value !== ""){
        textUser.value = "";
    }
})

updateHiresultList();


//---------------------------------SAVE INFORMATION----------------------------//

function saveResult (username, result){
    const results = JSON.parse(localStorage.getItem("highTimeResults") || "[]");
    results.push({ username, result });
    results.sort((a, b) => b.result - a.result);
    localStorage.setItem("higTimeResults", JSON.stringify(results.slice(0, 10)));
    textScore.textContent =  "Your reaction time was " + resultTime;
}

function updateHiresultList() {
    const hiresultList = document.getElementById("hiresultList");
    hiresultList.innerHTML = "";
    const results = JSON.parse(localStorage.getItem("highTimeResults") || "[]");
    results.forEach((entry) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${entry.username} - ${entry.result}`;
        hiresultList.appendChild(listItem);
    });
}