let flag = 1; // 1 for player X, 0 for player Y

function myfunc() {
    const buttons = Array.from({ length: 9 }, (_, i) => document.getElementById(`b${i + 1}`));
    const values = buttons.map(btn => btn.value.toUpperCase());

    // Check winning combinations
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    //Selecting Winner
    for (let combo of winCombinations) {
        if (values[combo[0]] === 'X' && values[combo[1]] === 'X' && values[combo[2]] === 'X') {
            declareWinner('X', combo);
            return;
        }
        if (values[combo[0]] === 'Y' && values[combo[1]] === 'Y' && values[combo[2]] === 'Y') {
            declareWinner('Y', combo);
            return;
        }
    }

    // Check for tie
    if (values.every(val => val === 'X' || val === 'Y')) {
        document.getElementById("print").innerHTML = "Match Tie";
    } else {
        document.getElementById("print").innerHTML = flag === 1 ? "Player X Turn" : "Player Y Turn";
    }
}

function declareWinner(player, combo) {
    document.getElementById("print").innerHTML = `Congratulations player ${player} has won`;
    const buttons = Array.from({ length: 9 }, (_, i) => document.getElementById(`b${i + 1}`));
    buttons.forEach(btn => btn.disabled = true);
    combo.forEach(index => buttons[index].style.color = "red");
}

function myfunc_2() {
    location.reload();
}

function markButton(index) {
    const button = document.getElementById(`b${index}`);
    button.value = flag === 1 ? "X" : "Y";
    button.disabled = true;
    flag = 1 - flag; // Toggle flag
    myfunc(); // Check for winner/tie after each move
}

// Attach markButton to buttons
for (let i = 1; i <= 9; i++) {
    document.getElementById(`b${i}`).onclick = () => markButton(i);
}
