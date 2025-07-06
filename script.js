document.addEventListener("DOMContentLoaded", function () {

    turn = "1";
    count = 0;
    gameOver = false;

    window.handleClick = async function (element) {
        if (gameOver)
        {
            return
        }
        if (element.innerText !== "" || gameOver) {
            document.getElementById("head").innerText = "Already filled!";
            document.getElementById("head").style.color = "white";
            await sleep(500);
            document.getElementById("head").style.color = "rgb(41, 225, 56)";
            changeHead();
            return;
        }

        if (turn === "1") {
            element.textContent = "1";
            turn = "2";
        } else {
            element.textContent = "0";
            turn = "1";
        }
        changeHead();

        count++;
        if (count >= 5) incrementWinner();

    };

    function changeHead() {
        let head = document.getElementById("head");
        if (turn === "1") {
            head.textContent = "Player 01's Turn";
            head.style.color = "yellow";  // lime/yellow hybrid, more visible
        } else {
            head.textContent = "Player 10's Turn";
            head.style.color = "#FF3CAC";  // neon pink
        }
        
    }

    function incrementWinner() {
        const winCombos = [
            ["tile-1", "tile-2", "tile-3"],
            ["tile-4", "tile-5", "tile-6"],
            ["tile-7", "tile-8", "tile-9"],
            ["tile-1", "tile-4", "tile-7"],
            ["tile-2", "tile-5", "tile-8"],
            ["tile-3", "tile-6", "tile-9"],
            ["tile-1", "tile-5", "tile-9"],
            ["tile-3", "tile-5", "tile-7"]
        ];
        

        for (let combo of winCombos) {
            const [a, b, c] = combo.map(id => document.getElementById(id));
            if (
                a && b && c &&
                a.innerText !== "" &&
                a.innerText === b.innerText &&
                a.innerText === c.innerText
            ) {
                a.classList.add("winner");
                b.classList.add("winner");
                c.classList.add("winner");
                const head = document.getElementById("head");

                if (a.innerText === "1") {
                    head.textContent = "Player 01 Wins!";
                    head.style.color = "yellow"; // bright neon green
                } else {
                    head.textContent = "Player 10 Wins!";
                    head.style.color = "#FF3CAC"; // glitchy red
                }
                gameOver = true;
                return;
            }
        }

        if (count === 9 && !gameOver) {
            document.getElementById("head").textContent = "It's a Draw!";
            document.getElementById("head").style.color = "white";
            gameOver = true;
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    window.reloadPage = function () {
        location.reload();
    };
});
