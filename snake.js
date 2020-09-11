const canvas = document.getElementById("snake"); 
const context = canvas.getContext("2d");

//Create the unit
const box = 32; 

//Load Images 
const ground = new Image(); 
ground.src = "images/ground.png";

const apple = new Image(); 
apple.src = "images/apple.png";

//Create Snake, Initial head block
let snake = [];

snake[0]= {     
    x: 9*box, 
    y: 10*box
}

//Create Apple pt-1
let food = {
    x: null,
    y: null
}

//Function to make sure that the food doesn't spawn on top of the snake
function spawnFood(snake){
    let testx = Math.floor(Math.random()*17 + 1)* box;
    let testy = Math.floor(Math.random()*15 + 3) * box;
for (let i =0; i<snake.length; i++){
    if ((testx==snake[i].x) && (testy ==snake[i].y))
        return spawnFood(snake);    
}

food = {
    x: testx,
    y: testy
}
return; 

}
spawnFood(snake); //Initial food spawn

 
//Scoreboard 
let score = 0; 

//Throttle function, fixes bug, when too many inputs game ends
const throttle = (func, delay) => {
    let last = 0;
    return (event) => {
        const now = new Date().getTime();
        if(now-last < delay){
            return;
        }
        last = now; 
        return func(event);

    }
}

//Snake Controls
let d;

document.addEventListener("keydown", throttle( (event)=> {
    if(event.keyCode == 37 && d != "right") //each key on your keyboard has a unique keyCode, up,down,left,right is 38,40,37,39 respectively
        d = "left";
    else if(event.keyCode == 38 && d !="down")
        d = "up";
    else if(event.keyCode == 39 && d != "left")
        d = "right";
    else if(event.keyCode == 40 && d != "up")
        d ="down";
    }, 150)); //This throttle function, makes it so that only one keydown will register for every 150ms, so you cannot key spam


/*
function direction(event){
    if(event.keyCode == 37 && d != "right") //each key on your keyboard has a unique keyCode, up,down,left,right is 38,40,37,39 respectively
        d = "left";
    else if(event.keyCode == 38 && d !="down")
        d = "up";
    else if(event.keyCode == 39 && d != "left")
        d = "right";
    else if(event.keyCode == 40 && d != "up")
        d ="down";
}
*/

//Collision Detection 
function collision(head,snakeArray){
    for(let i = 0; i<snakeArray.length; i++){
        if(head.x == snakeArray[i].x && head.y == snakeArray[i].y){
            return true;
        }    
    }
    return false;
}


//Draw everything onto the canvas
function draw(){
    context.drawImage(ground,0,0)

    for( let i = 0; i<snake.length; i++){
       context.fillStyle = (i==0)? "#17520D" : "#247018"; //ternary conditional operator
       context.fillRect(snake[i].x, snake[i].y, box, box)
        /*if(i==0){
            context.fillStyle = "#17520D";
        } else context.fillStyle ="#247018";*/
        context.strokeStyle = "white";
        context.strokeRect(snake[i].x,snake[i].y,box,box);

    }

    //Title
    context.fillStyle = "white";
    context.font ="50px Power Green Small"; 
    context.fillText("Snake", 8*box, 1.6*box);

    //Create Apple pt-2
    context.drawImage(apple, food.x, food.y);

    //Old Snake head 
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Snake Direction, assigning new head position
    if(d === "left")
    snakeX -=box; 
    if(d === "right")
    snakeX +=box; 
    if(d === "up")
    snakeY -=box; 
    if(d === "down")
    snakeY +=box; 

    
    //Snake Size increase
    if(snakeX == food.x && snakeY == food.y){
        score++;
        spawnFood(snake);

    } else{
        //Pop the tail
     snake.pop(); 
    }


    //Create New Head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //Game Over
    if (snakeX < box || snakeX > 17*box || snakeY <3*box || snakeY > 17*box || collision(newHead,snake) == true){
        clearInterval(game);
        context.fillStyle = "white";
        context.font ="75px Power Green Small"; 
        context.fillText("GAME OVER", 5.2*box, 10.5*box);
    }

    snake.unshift(newHead) //adds newHead as snake[0]


   

}

//Call draw function every XXXms to update game
let game = setInterval(draw, 150);

let s = setInterval(getScore,2000)

function getScore(){
    console.log(score);
}


