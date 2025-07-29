import * as constants from './core/constants.js';
import {
    getSpriteFrameSize, FRAME_WIDTH, FRAME_HEIGHT,
    SPRITE_SHEET_WIDTH, SPRITE_SHEET_HEIGHT
} from './core/spriteUtils.js';
import { drawGrid, transformGrid } from './core/grid.js';

const newGrid = transformGrid(constants.grid);
function handleKeyDown(event) {
    const key = event.key;
    console.log(constants.gameState.playerPosition.y);
    
    let newX = constants.gameState.playerPosition.x;
    let newY = constants.gameState.playerPosition.y;
    let nextFrame = -1;
    
    switch (key) {
        case "ArrowUp":
            newY = constants.gameState.playerPosition.y - 20;            
            nextFrame = constants.STARTER_FRAME.up;
            break;
        case "ArrowDown":
            newY = constants.gameState.playerPosition.y + 20;
            nextFrame = constants.STARTER_FRAME.down;
            break;
        case "ArrowLeft":
            newX = constants.gameState.playerPosition.x - 20;
            nextFrame = constants.STARTER_FRAME.left;
            break;
        case "ArrowRight":
            newX = constants.gameState.playerPosition.x + 20;
            nextFrame = constants.STARTER_FRAME.right;
            break;
        default:
            return;
    }
    
    if (canMovePlayer(newX, newY)) {
        constants.gameState.pendingPosition = { x: newX, y: newY };
    }
    requestAnimationFrame(() => {
        MovePlayer(2, nextFrame);
    });
}

document.addEventListener("keydown", handleKeyDown);

// draw grid after image loads and frame size is calculated
getSpriteFrameSize(constants.SPRITES.enemy1, constants.SPRITE_COLUMNS, constants.SPRITE_ROWS, () => {
    drawGrid(newGrid);
});

function canMovePlayer(newX, newY) {
    // console.log(newX);
    
    // Convert pixel coordinates to grid indices
    const gridX = Math.floor((newX / 40));
    const gridY = Math.floor((newY + 30) / 40);
    switch (newGrid[gridY][gridX]) {
        case "W":
        case "BW":
        case "UW":
            return false;
        case "E":
        case "EC":
            return true;
    }
}



function MovePlayer(moves = 2, nextFrame = 0) {

    if (constants.gameState.isAnimating) return; // prevent race condition for lastFrameTime variable
    constants.gameState.isAnimating = true;

    // Method 1 : for doing a delay
    let now = performance.now();
    let delta = now - constants.gameState.lastFrameTime;

    if (delta >= 100) {
        let frameCol = nextFrame;
        let frameRow = 0;

        constants.gameState.offsetX = -frameCol * FRAME_WIDTH;
        constants.gameState.offsetY = -frameRow * FRAME_HEIGHT;

        constants.gameState.playerDiv.style.backgroundPosition = `${constants.gameState.offsetX}px ${constants.gameState.offsetY}px`;

        constants.gameState.lastFrameTime = now;
        nextFrame -= 1;
        if (moves === 0) {
            
            if (constants.gameState.pendingPosition) {
                constants.gameState.playerPosition.x = constants.gameState.pendingPosition.x;
                constants.gameState.playerPosition.y = constants.gameState.pendingPosition.y;
                constants.gameState.pendingPosition = null;
            }
            
            constants.gameState.playerDiv.style.left = `${constants.gameState.playerPosition.x}px`;
            constants.gameState.playerDiv.style.top = `${constants.gameState.playerPosition.y}px`;
            // Method 2 : for doing a delay
            (async () => {
                // Reset the position to the initial frame
                constants.gameState.offsetX = -8 * FRAME_WIDTH;
                constants.gameState.offsetY = -0 * FRAME_HEIGHT;
                await new Promise(resolve => setTimeout(resolve, 200));
                constants.gameState.playerDiv.style.backgroundPosition = `${constants.gameState.offsetX}px ${constants.gameState.offsetY}px`;
                constants.gameState.isAnimating = false;
            })();
            return;

        }
        moves -= 1;
    }

    requestAnimationFrame(() => {
        constants.gameState.isAnimating = false;
        MovePlayer(moves, nextFrame);
    });
}

