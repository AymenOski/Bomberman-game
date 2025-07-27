const playground = document.getElementsByClassName('playground')[0];
const CELL_SIZE = 40;
const SPRITE_COLUMNS = 18;
const SPRITE_ROWS = 5;
const TOP = CELL_SIZE - 20;
const LEFT = CELL_SIZE + 10;
const SPRITES = {
    player1: "../images/player-1.png",
    player2: "../images/player-2.png",
    enemy1: "../images/enemy-1.png",
    enemy2: "../images/enemy-2.png",
    enemy3: "../images/enemy-3.png",
};
const STARTER_FRAME = {
    up: 2,
    left: 5,
    down: 8,
    right: 11,
}
let FRAME_WIDTH, FRAME_HEIGHT, SPRITE_SHEET_WIDTH, SPRITE_SHEET_HEIGHT, offsetX, offsetY;
let playerDiv;

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

// Helper to auto-calculate frame size
function getSpriteFrameSize(imageUrl, columns, rows, callback) {
    const img = new Image();

    img.onload = function () {
        FRAME_WIDTH = Math.floor(img.width / columns);
        FRAME_HEIGHT = Math.floor(img.height / rows);
        SPRITE_SHEET_WIDTH = img.width;
        SPRITE_SHEET_HEIGHT = img.height;
        callback();
    };
    img.src = imageUrl;

}

function drawGrid(grid, frameRow = 0, frameCol = 8) {
    // playground.innerHTML = "";
    const fragment = document.createDocumentFragment();
    playerDiv = document.createElement('div');

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
                if (i === 1 && j === 1) {
                    playerDiv.style.position = "absolute";
                    playerDiv.style.top = `${TOP}px`;
                    playerDiv.style.left = `${LEFT}px`;
                    playerDiv.style.width = `${FRAME_WIDTH}px`;
                    playerDiv.style.height = `${FRAME_HEIGHT}px`;
                    playerDiv.style.backgroundSize = `${SPRITE_SHEET_WIDTH}px ${SPRITE_SHEET_HEIGHT}px`;
                    playerDiv.style.backgroundImage = `url(${SPRITES.enemy1})`;
                    playerDiv.style.transform = "scale(2)";
                    offsetX = -frameCol * FRAME_WIDTH;
                    offsetY = -frameRow * FRAME_HEIGHT;
                    playerDiv.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
                    playerDiv.style.imageRendering = "pixelated";
                    playerDiv.style.setProperty("image-rendering", "crisp-edges");
                    fragment.appendChild(playerDiv);
                }
            }
            fragment.appendChild(cell);
        }
    }
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
                if (r <= 0.33) {
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

let playerPosition = { x: 1 * LEFT, y: 1 * TOP };
function canMovePlayer(newX, newY) {
    // Convert pixel coordinates to grid indices
    const gridX = Math.ceil((newX / 40));
    const gridY = Math.ceil((newY / 40));

    switch (grid[gridY][gridX]) {
        case "W":
        case "BW":
        case "UW":
            return false;
        case "E":
        case "EC":
            return true;
    }
}


let playerIsMoving = false;
let isAnimating = false;
let lastFrameTime = performance.now();

function MovePlayer(moves = 2, nextFrame = 0) {

    if (isAnimating) return; // prevent race condition for lastFrameTime variable
    isAnimating = true;

    // Method 1 : for doing a delay
    let now = performance.now();
    let delta = now - lastFrameTime;

    if (delta >= 100) {
        let frameCol = nextFrame;
        let frameRow = 0;

        offsetX = -frameCol * FRAME_WIDTH;
        offsetY = -frameRow * FRAME_HEIGHT;

        playerDiv.style.backgroundPosition = `${offsetX}px ${offsetY}px`;

        lastFrameTime = now;
        nextFrame -= 1;
        if (moves === 0) {
            if (pendingPosition) {
                playerPosition.x = pendingPosition.x;
                playerPosition.y = pendingPosition.y;
                pendingPosition = null;
            }
            playerDiv.style.left = `${playerPosition.x}px`;
            playerDiv.style.top = `${playerPosition.y}px`;
            // Method 2 : for doing a delay
            (async () => {
                // Reset the position to the initial frame
                offsetX = -8 * FRAME_WIDTH;
                offsetY = -0 * FRAME_HEIGHT;
                await new Promise(resolve => setTimeout(resolve, 200));
                playerDiv.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
                isAnimating = false;

            })();
            return;
            
        }
        moves -= 1;
    }

    requestAnimationFrame(() => {
        isAnimating = false;
        MovePlayer(moves, nextFrame);
    });
}

let pendingPosition = null;

function handleKeyDown(event) {
    const key = event.key;
    let newX = playerPosition.x;
    let newY = playerPosition.y;
    let nextFrame = -1;

    switch (key) {
        case "ArrowUp":
            newY = playerPosition.y - 10;
            nextFrame = STARTER_FRAME.up;
            break;
        case "ArrowDown":
            newY = playerPosition.y + 10;
            nextFrame = STARTER_FRAME.down;
            break;
        case "ArrowLeft":
            newX = playerPosition.x - 10;
            nextFrame = STARTER_FRAME.left;
            break;
        case "ArrowRight":
            newX = playerPosition.x + 10;
            nextFrame = STARTER_FRAME.right;
            break;
        default:
            return;
    }

    if (canMovePlayer(newX, newY)) {
        pendingPosition = { x: newX, y: newY };
    }
    requestAnimationFrame(() => {
        MovePlayer(2, nextFrame);
    });
}

document.addEventListener("keydown", handleKeyDown);

// draw grid after image loads and frame size is calculated
getSpriteFrameSize(SPRITES.enemy1, SPRITE_COLUMNS, SPRITE_ROWS, () => {
    drawGrid(newGrid);
});