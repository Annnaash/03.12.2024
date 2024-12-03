let spiller = document.getElementById("spiller");
let emerald = document.getElementById("emerald");
let spillområde = document.getElementById("spillområde");
let poengTeller = document.getElementById("poengTeller");
let livElement = document.getElementById("liv");
let gameOverElement = document.getElementById("gameOver");
let resultatElement = document.getElementById("resultat");
let restartKnapp = document.getElementById("restartKnapp");

let spillerPos = 375;
let poeng = 0;
let liv = 5;
let emeraldFallHastighet = 2;

document.addEventListener("keydown", flyttSpiller);
restartKnapp.addEventListener("click", startSpillPåNytt);

function flyttSpiller(e) {
    if (e.key === "ArrowLeft" && spillerPos > 0) {
        spillerPos -= 20;
    }
    if (e.key === "ArrowRight" && spillerPos < spillområde.clientWidth - spiller.clientWidth) {
        spillerPos += 20;
    }
    spiller.style.left = spillerPos + "px";
}

let emeraldPos = { x: Math.random() * (spillområde.clientWidth - 30), y: 0 };

function oppdaterEmerald() {
    emeraldPos.y += emeraldFallHastighet;

    if (emeraldPos.y > spillområde.clientHeight - spiller.clientHeight - emerald.clientHeight &&
        emeraldPos.x > spillerPos - emerald.clientWidth &&
        emeraldPos.x < spillerPos + spiller.clientWidth) {
        poeng++;
        poengTeller.textContent = poeng;
        resetEmerald();
        emeraldFallHastighet += 0.05;

        if (poeng >= 100) {
            avsluttSpill(true);
        }
    }

    if (emeraldPos.y > spillområde.clientHeight) {
        liv--;
        oppdaterLiv();
        resetEmerald();

        if (liv <= 0) {
            avsluttSpill(false);
        }
    }

    emerald.style.top = emeraldPos.y + "px";
    emerald.style.left = emeraldPos.x + "px";

    if (liv > 0 && poeng < 100) {
        requestAnimationFrame(oppdaterEmerald);
    }
}

function resetEmerald() {
    emeraldPos.y = 0;
    emeraldPos.x = Math.random() * (spillområde.clientWidth - 30);
}

function oppdaterLiv() {
    livElement.innerHTML = '';
    for (let i = 0; i < liv; i++) {
        let heart = document.createElement('div');
        heart.className = 'heart';
        livElement.appendChild(heart);
    }
}

function avsluttSpill(harVunnet) {
    gameOverElement.classList.remove("hidden");
    if (harVunnet) {
        resultatElement.textContent = "Gratulerer! Du vant med " + poeng + " poeng!";
    } else {
        resultatElement.textContent = "Game over! Du fikk " + poeng + " poeng.";
    }
}

function startSpillPåNytt() {
    poeng = 0;
    liv = 3;
    emeraldFallHastighet = 2;
    poengTeller.textContent = poeng;
    oppdaterLiv();
    resetEmerald();
    gameOverElement.classList.add("hidden");
    oppdaterEmerald();
}

oppdaterLiv();
oppdaterEmerald();

