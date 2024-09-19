let gameSeq=[];
let userSeq=[];


let btns=["red", "yellow", "green", "purple"];

let start=false;
let level=0;

let h3=document.querySelector("h3");

document.addEventListener("keypress", function(){
    if(start==false){
        console.log("Game started");
        start=true; 

        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250)
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h3.innerText=`Level ${level}`;

    let randomIdx= Math.floor(Math.random() * 4);
    let randomColor=btns[randomIdx];
    let randomBtn=document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    // console.log(randomIdx);
    // console.log(randomColor);
    // console.log(randomBtn);

    btnFlash(randomBtn);
}

function checkAns(idx){
    console.log("Current Level:", level);
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h3.innerHTML=`Game Over!! Your Score Was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor= "white";
        }, 150);
        reset();
    }
}

function btnPress(){
    console.log(this);
    let btn=this;
    userFlash(btn);

    let userColor= btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    start=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

