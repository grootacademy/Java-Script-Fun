var score = 0;
var direction = "";
var speed = 1;

// Viewport size
const screenWidth = screen.width;
const screenHeight = window.innerHeight;

// Defining hunter and prey
let hunter = null;
let prey = null;

// Obstacles
let obstacle = [];

// Hunter position
var hunterTop = 100;
var hunterLeft = 100;

// Hunter dimentions 
var hunterHeight = 0;
var hunterWidth = 0;

// Prey dimentions
var preyHeight = 0;
var preyWidth = 0;

var speedAudioFlag = true;

// Audios
const startAudio = new Audio('Audios/mixkit-high-tech-bleep-2521.wav');
const outAudio = new Audio('Audios/mixkit-fish-flapping-2457.wav');
const scoreAudio = new Audio('Audios/mixkit-fairy-arcade-sparkle-866.wav');
const speedAudio = new Audio('Audios/mixkit-magic-sparkle-poof-hit-3082.wav');
const bgAudio = new Audio('Audios/lofi-study-112191.mp3');


function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

// To start the game.
async function start() {

    startAudio.play();
    // Initializing hunter and prey
    hunter = document.getElementById("bubble");
    prey = document.getElementById("prey");
    obstacle = document.getElementsByClassName("obstacle");

    // Showing hunter.
    hunter.style.display = "block";
    document.getElementsByClassName("start_button")[0].style.display = "none";

    // Setting hunter height and width.
    hunterHeight = hunter.clientHeight;
    hunterWidth = hunter.clientWidth;

    // Setting prey height and width.
    preyHeight = prey.clientHeight;
    preyWidth = prey.clientWidth;

    // console.log(obstacle[0]);

    // Main loop 
    while (true) {

        // Gap in per frame in mili second.
        await sleep(1);

        // Condition for game over on blundry walls.
        if (hunterLeft <= (screenWidth - hunterWidth) && hunterLeft > -1 && hunterTop <= (screenHeight - hunterHeight) && hunterTop > -1) {

            // To out player on overlap obstacle
            var outFlag = false;

            // Direction function 
            giveDirection();

            // Here we are taking when they both do not touch and taking opposite of that.
            if (elementsOverlap(hunter, prey)) {
                overlapActionOfHunter();
                changeAllObstaclePosition();
                bgAudio.play();
            }

            // If hunter overlap on obstacle
            for (let i = 0; i < obstacle.length; i++) {
                const e = obstacle[i];
                if (elementsOverlap(hunter, e)) {

                    outFlag = true;
                }
            }

            // To out player on obstacle overlap
            if (outFlag) {
                document.getElementById("gameOver").style.display = "block";
                outAudio.play();
                break;
            }


            // To control speed
            if (score > 10 && speedAudioFlag) {
                speed = 2;
                speedAudio.play();
                speedAudioFlag = false;
            }

        } else {
            document.getElementById("gameOver").style.display = "block";
            outAudio.play();
        }

    }
}

// To give motion in directions
function goToDown() {
    bubble.style.top = hunterTop + "px";
    hunterTop += speed;
}

function goToUp() {
    bubble.style.top = hunterTop + "px";
    hunterTop -= speed;
}

function goToLeft() {
    bubble.style.left = hunterLeft + "px";
    hunterLeft -= speed;
}

function goToRight() {
    bubble.style.left = hunterLeft + "px";
    hunterLeft += speed;
}

// Event listners 
document.addEventListener("keydown", e => {

    if (e.code == "ArrowDown") {
        direction = "down"
    }
    else if (e.code == "ArrowUp") {
        direction = "up"
    }
    else if (e.code == "ArrowLeft") {
        direction = "left"
    }
    else if (e.code == "ArrowRight") {
        direction = "right"
    }
    else if (e.code == "Space") {
        direction = "";
    }

})

// Gives direction to hunter
function giveDirection() {
    if (direction == "left") {
        goToLeft();
    }
    else if (direction == "right") {
        goToRight();
    }
    else if (direction == "up") {
        goToUp();
    }
    else if (direction == "down") {
        goToDown();
    }
    else if (direction == "") { }
}

// Function for change prey's position 
function changePreyPosition() {

    var top = Math.abs(((Math.random() * screenHeight) - preyHeight));
    var left = Math.abs(((Math.random() * screenWidth) - preyWidth));

    prey.style.top = top + "px";
    prey.style.left = left + "px";

    document.getElementById("score").innerHTML = score;

}

// Change all obstacles positions
function changeAllObstaclePosition() {

    for (let i = 0; i < obstacle.length; i++) {
        const e = obstacle[i];

        const top = Math.abs(((Math.random() * screenHeight) - e.clientHeight));
        const left = Math.abs(((Math.random() * screenWidth) - e.clientWidth));

        const right = left + e.clientWidth;
        const bottom = top + e.clientHeight;

        const hunt = hunter.getBoundingClientRect();

        // Checking new position of obstacle is not overlaping the hunter 
        if (top > hunt.bottom || right < hunt.left || bottom < hunt.top || left > hunt.right) {
            e.style.top = top + "px";
            e.style.left = left + "px";
        }

    }

}

// checking overlap or not
function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();

    return !(
        domRect1.top > domRect2.bottom ||
        domRect1.right < domRect2.left ||
        domRect1.bottom < domRect2.top ||
        domRect1.left > domRect2.right
    );
}

function overlapActionOfHunter() {
    score++;
    scoreAudio.play();

    hunter.style.background = "lightgreen";
    hunter.style.boxShadow = "0 0 20px -3px black";

    setTimeout(() => {
        hunter.style.background = "white";
        hunter.style.boxShadow = "0 0 10px 0 #5e057e inset";
    }, 300);

    changePreyPosition();
}