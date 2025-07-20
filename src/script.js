const playground = document.getElementsByClassName('playground')[0];

const grid = [
    ["C1", "W", "W", "W", "W", "W", "W", "W", "W", "W", "C2"],
    ["W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W"],
    ["W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W"],
    ["W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W"],
    ["W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W"],
    ["W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W"],
    ["W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W"],
    ["W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W"],
    ["W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W"],
    ["W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W"],
    ["C3", "W", "W", "W", "W", "W", "W", "W", "W", "W", "C4"]
];

function drawGrid(grid) {
    // Create a grid of divs

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            const cell = document.createElement('div');
            if (grid[i][j] === "W") {
                cell.classList.add("wall");
            } else if (grid[i][j] === "E") {
                cell.classList.add("empty");
                // corners 
            } else if (grid[i][j].includes("C")) {
                if (grid[i][j].includes("1")) {

                } else if (grid[i][j].includes("2")) {
                } else if (grid[i][j].includes("3")) {
                } else if (grid[i][j].includes("4")) {
                }
            }
            playground.appendChild(cell);
        }
    }
}

drawGrid(grid);
