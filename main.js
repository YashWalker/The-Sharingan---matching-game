//Audio Control Class For Sound Effects.

class AudioControl{
    constructor(){
        this.flipSound = new Audio("sound/flip.wav")
        this.matchSound = new Audio("sound/match.wav")
        this.victorySound = new Audio("sound/One Piece.wav")
        this.gameOverSound = new Audio("sound/Oya Oya.wav")
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    victory() {
        this.victorySound.play();
    }
    gameOver(){
        this.gameOverSound.play();
    }
}

let audio = new AudioControl();



//Document element & data Selector. 
let img = document.querySelectorAll('.game-img');
let imgArray = [...img];
let imgData = document.querySelectorAll('.game-img-data');
let imgDataArray = [...imgData];
let p = document.querySelector("#stg").addEventListener("click" , start);
let vic = document.querySelector(".victory");
let end = document.querySelector(".end");
let opened = [];
let matched =[];
let m = document.querySelector(".move");
let t = document.querySelector(".timer");
let moves;
let time ,set;
let log = console.log


//Shuffle images using fisher-yates

function shuffle(array) {
    let ind = array.length,
        temp,
        r;
    
    while (ind !==0) {
        r = Math.floor(Math.random() * ind);
        ind -= 1;
        temp = array[ind];
        array[ind] = array[r];
        array[r] = temp;
    }
    return array;
}
    
function startGame() {

    let shuffledImages = shuffle(imgDataArray);

    for(i=0; i<shuffledImages.length; i++) {

        img[i].appendChild(shuffledImages[i]);
        img[i].type = `${shuffledImages[i].src}`;
    

    }

    preview();

    for(let i = 0; i < imgArray.length; i++) {
        imgArray[i].addEventListener("click", displayCard)
        
    }

    moves = 0;
    m.innerText = `Moves: ${moves}`;


    time = 10;
    t.innerText = `Timer: 100 sec`;

    
}



//Preview of images before game starts
function preview(){
    for(i=0; i<imgData.length; i++) {
        imgData[i].classList.add("show-img")
    }
    setTimeout(function(){
        for(i=0; i<imgData.length; i++) {
            imgData[i].classList.remove("show-img")
        }
    }, 3000)
}

//display card by toggling show-img className
function displayCard(e) {
    this.children[0].classList.toggle('show-img');
    this.classList.toggle("disabled");
    imgOpen(this);
    audio.flip();
}

function imgOpen(pic){

    opened.push(pic);
    let l = opened.length;
    if(l === 2){
        counter();
        if (opened[0].type === opened[1].type){
            imgMatch()
            setTimeout(() => {
                audio.match();               
            }, 1000);
        }
        else{ misMatch()}
    }
}

function imgMatch() {
    opened[0].classList.add("match");
    opened[1].classList.add("match");
    matched.push(opened[0]);
    matched.push(opened[1]);
    
    opened= [];
    if(matched.length == 16) {
        clearInterval(set);
        setTimeout(() => {
            audio.victory();
            log("Completed")
            winner(); 
        }, 1500);
    }
}

function misMatch() {
    opened[0].classList.add("unmatched");
    opened[1].classList.add("unmatched");
    disable();
    setTimeout(function() {
        opened[0].classList.remove( "unmatched");
        opened[1].classList.remove( "unmatched");
        opened[0].children[0].classList.remove('show-img');
        opened[1].children[0].classList.remove('show-img');
        enable();
        opened = [];
        
    }, 1100)
}

function disable() {
    imgArray.filter((pic) => {
        pic.classList.add('disabled');
    })
}

function enable() {
    imgArray.filter((pic) => {
        pic.classList.remove('disabled');
        for(let i=0; i<matched.length; i++) {
            matched[i].classList.add('disabled');
        }
    })
}

 


function counter(){
    moves++;
    m.innerHTML = `Moves: ${moves}`;
    
    if(moves == 1){
        timer();
    }
}


function timer(){
    set = setInterval(() => {
        t.innerHTML = `Timer: ${time} sec`;
        time--; 

        if(time == -1){
            clearInterval(set);
            log("GameOver");
            endgame();
        } 
        
    }, 1000);

   

}





function start(){
    let play = document.querySelector(".start");
    play.classList.add("play")
    startGame();
}

function endgame(){
    
    end.classList.add("endgame");
    end.classList.remove("end");
    audio.gameOver();
}

function winner(){
   
    vic.classList.add("winner");
    vic.classList.remove("victory");
}

let r1 = document.querySelector("#r1").addEventListener("click" , restart);
let r2 = document.querySelector("#r2").addEventListener("click" , restart);

function restart(){
    vic.classList.remove("winner");
    vic.classList.add("victory");

   
    end.classList.remove("endgame");
    end.classList.add("end");


}









    

