var score = 0;

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

async function start() {

    document.getElementById("bubble").style.display = "block";
    document.getElementsByClassName("start_button")[0].style.display = "none";
    const n = 100;
    for (let i = 1; i <= n; i++) {
        await sleep(1000);
        changePosition()

        document.getElementById("appearence").innerHTML = i;



        if (i == n) {
            document.getElementById("bubble").style.display = "none";
        }
    }
}

function bubbleClick() {
    score++;
    document.getElementById("score").innerHTML = score;
}

function changePosition() {

    var top = Math.random() * 95;
    var left = Math.random() * 95;
    var bubble = document.getElementById("bubble");

    bubble.style.top = top + "vh";
    bubble.style.left = left + "vw";

}