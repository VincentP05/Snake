const canvas2 = document.getElementById("menu");
const context2 = canvas2.getContext("2d");

let bestScore;

if(localStorage.getItem('bestScore')=== null){
  bestScore = 0;
} else {
    bestScore = JSON.parse(localStorage.getItem('bestScore'));
}


context2.fillStyle = "black";
context2.font ="30px Power Green Small"; 
context2.fillText("Best Score", 2.8*box, 1.6*box);


context2.fillStyle = "black";
context2.font ="30px Power Green Small"; 
context2.fillText("Current Score", 2.5*box, 5*box);

function scores(){

    //Current Score
    context2.fillStyle = "black";
    context2.fillRect(3*box,5.5*box,120,40)
    context2.fillStyle = "white";
    context2.font ="30px Power Green Small"; 
    context2.fillText(score, 4.4*box, 6.5*box);

    //Best Score
    context2.fillStyle = "black";
    context2.fillRect(3*box,2*box,120,40)
    context2.fillStyle = "white";
    context2.font ="30px Power Green Small"; 
    context2.fillText(bestScore, 4.4*box, 3*box);

    if (score>bestScore){
        bestScore = score; 
        localStorage.setItem('bestScore', JSON.stringify(bestScore));
    }
    
    
    
}

//Updates the menu every 150 seconds
let gameMenu = setInterval(scores, 150);

console.log(score);