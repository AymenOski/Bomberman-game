const playground = document.getElementsByClassName('playground')[0];


const grid = [
    ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
    ["W", "EC", "EC", "E", "E", "E", "E", "E", "EC", "EC", "W"],
    ["W", "EC", "E", "E", "E", "E", "E", "E", "E", "EC", "W"],
    ["W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W"],
    ["W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W"],
    ["W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W"],
    ["W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W"],
    ["W", "E", "E", "E", "E", "E", "E", "E", "E", "E", "W"],
    ["W", "EC", "E", "E", "E", "E", "E", "E", "E", "EC", "W"],
    ["W", "EC", "EC", "E", "E", "E", "E", "E", "EC", "EC", "W"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"]
];

function drawGrid(grid) {
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            const cell = document.createElement('div');
            if (grid[i][j].startsWith("W")) {
                cell.classList.add("wall");

            } else if (grid[i][j] === "E") {
                cell.classList.add("floor");

            } else if (grid[i][j] === "BW") {
                cell.classList.add("breakable-wall");

            } else if (grid[i][j] === "UW") {
                cell.classList.add("unbreakable-wall");

            } else if (grid[i][j] === "EC") { // player starting point
                cell.classList.add("floor");

            }
            fragment.appendChild(cell);
        }
    }
    const child = fragment.children[grid[0].length + 1]
    child.classList.add('player');
    playground.appendChild(fragment);
}

function transformGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "E") {
                if (isProtectedPath(i, j, grid)) {
                    grid[i][j] = Math.random() < 0.5 ? "E" : "BW";
                    continue;
                }

                const r = Math.random();
                if (r <= 0.20) {
                    grid[i][j] = "UW";
                } else if (r <= 0.66) {
                    grid[i][j] = "BW";
                } else {
                    grid[i][j] = "E";
                }
            }
        }
    }
    return grid;
}

function isProtectedPath(i, j, grid) {
    const isLeftPath = j === 1 && i > 0 && i < grid.length - 1;
    const isTopPath = i === 1 && j > 0 && j < grid[0].length - 1;
    const isRightPath = j === grid[0].length - 2 && i > 0 && i < grid.length - 1;
    const isBottomPath = i === grid.length - 2 && j > 0 && j < grid[0].length - 1;
    return isLeftPath || isTopPath || isRightPath || isBottomPath;
}

const newGrid = transformGrid(grid);

drawGrid(newGrid);

let playerPosition = { x: 1, y: 1 };
function canMovePlayer(newX, newY, grid) {
    switch (grid[newY][newX]) {
        case "W":
        case "BW":
        case "UW":
            return false;
        default:
            return true;
    }
}


function MovePlayer(direction) {
    switch (direction) {
        case "up":
            break;
        case "down":
            break;
        case "left":
            break;
        case "right":
            break;
        default:
            break;
    }
}

function handleKeyDown(event) {
    const key = event.key;
    let newX = playerPosition.x;
    let newY = playerPosition.y;
    let direction = null;

    switch (event.key) {
        case "ArrowUp":
            newY--;
            direction = "up";
            break;
        case "ArrowDown":
            newY++;
            direction = "down";
            break;
        case "ArrowLeft":
            newX--;
            direction = "left";
            break;
        case "ArrowRight":
            newX++;
            direction = "right";
            break;
        default:
            return;
    }

    if (canMovePlayer(newX, newY, grid)) {
        playerPosition.x = newX;
        playerPosition.y = newY;
    }
    MovePlayer(direction);

    console.log("New player position:", playerPosition);
}

document.addEventListener("keydown", handleKeyDown);



