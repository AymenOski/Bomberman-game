export const CELL_SIZE = 40;
export const SPRITE_COLUMNS = 18;
export const SPRITE_ROWS = 5;
export const TOP = CELL_SIZE - 30;
export const LEFT = CELL_SIZE;
export const playground = document.getElementsByClassName('playground')[0];


export const SPRITES = {
    player1: "../images/player-1.png",
    player2: "../images/player-2.png",
    enemy1: "../images/enemy-1.png",
    enemy2: "../images/enemy-2.png",
    enemy3: "../images/enemy-3.png",
};

export const STARTER_FRAME = {
    up: 2,
    left: 5,
    down: 8,
    right: 11,
};

export const grid = [
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

export const gameState = {
    playerPosition: { x: 1 * LEFT, y: 1 * TOP },
    isAnimating: false,
    isPaused: false,
    offsetX: 0,
    offsetY: 0,
    lastFrameTime: performance.now(),
    playerDiv: null,
};
