let prt = '';

for (let i = 0; i < 1000; i++) {
    prt = prt + `<div class="box1"></div>`;
}
document.getElementById("prt").innerHTML = prt;

let box = document.getElementsByClassName("box1");

for (let i = 0; i < box.length; i++) {

    let ran1 = Math.floor(Math.random() * 255);
    let ran2 = Math.floor(Math.random() * 255);
    let ran3 = Math.floor(Math.random() * 255);
    let ran4 = Math.floor(Math.random() * 255);
    let ran5 = Math.floor(Math.random() * 255);
    let ran6 = Math.floor(Math.random() * 255);

    box[i].addEventListener('mouseenter', function () {
        // this.classList.toggle("active");
        this.style.background = `radial-gradient(rgb(${ran1}, ${ran2},  ${ran3}), rgb(${ran4}, ${ran5}, ${ran6}))`
        setTimeout(() => {
            this.style.background = "transparent"
        }, 500);
    })

}