document.addEventListener("DOMContentLoaded", function () {

    turn = "1";
    count = 0;
    gameOver = false;

    window.handleClick = async function (element) {
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

        count++;
        if (count >= 5) incrementWinner();

        changeHead();
    };

    function changeHead() {
        let head = document.getElementById("head");
        if (gameOver) return;
        head.textContent = turn === "1" ? "Player 01's Turn" : "Player 10's Turn";
    }

    function incrementWinner() {
        const winCombos = [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
            ["1", "4", "7"],
            ["2", "5", "8"],
            ["3", "6", "9"],
            ["1", "5", "9"],
            ["3", "5", "7"]
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
                document.getElementById("head").textContent =
                    a.innerText === "1" ? "Player 01 Wins!" : "Player 10 Wins!";
                gameOver = true;
                return;
            }
        }

        if (count === 9 && !gameOver) {
            document.getElementById("head").textContent = "It's a Draw!";
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
