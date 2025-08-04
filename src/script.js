import * as constants from './core/constants.js';
import {
    getSpriteFrameSize, FRAME_WIDTH, FRAME_HEIGHT,
    SPRITE_SHEET_WIDTH, SPRITE_SHEET_HEIGHT
} from './core/spriteUtils.js';
import { drawGrid, transformGrid } from './core/grid.js';

const newGrid = transformGrid(constants.grid);
function handleKeyDown(event) {
    if (constants.gameState.isAnimating) {
        // If already animating, do not process further key presses
        return;
    }
    const key = event.key;

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
        case "p":
        case "P": // Pause/Unpause the game
            if (!constants.gameState.isPaused) {
                const PauseDiv = document.createElement("PauseDiv");
                const div = document.createElement("div");
                PauseDiv.classList.add("Paused");
                PauseDiv.innerHTML = "Game Paused";
                document.querySelector(".hud-container").appendChild(PauseDiv);
                constants.gameState.isPaused = true;
                
            } else if (constants.gameState.isPaused) {
                const PausedDiv = document.querySelector(".Paused");
                PausedDiv.remove();

                constants.gameState.isPaused = false;
            }
            return;
        default:
            console.log("Invalid key pressed");

            return; // Ignore other keys
    }

    if (canMovePlayer(newX, newY)) {
        constants.gameState.isAnimating = true;
        MovePlayer(newX, newY, nextFrame);
    }
}

function MovePlayer(targetX, targetY, startFrame) {
    const startX = constants.gameState.playerPosition.x;
    const startY = constants.gameState.playerPosition.y;
    const distanceX = targetX - startX;
    const distanceY = targetY - startY;
    const duration = 200; // Animation duration in milliseconds
    const startTime = performance.now();

    // Frame sequences for each direction
    const frameSequences = {
        [constants.STARTER_FRAME.up]: [2, 1, 0],
        [constants.STARTER_FRAME.down]: [8, 7, 6],
        [constants.STARTER_FRAME.left]: [5, 4, 3],
        [constants.STARTER_FRAME.right]: [11, 10, 9]
    };
    const frameSequence = frameSequences[startFrame] || frameSequences[constants.STARTER_FRAME.down];

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Interpolate position
        const interpolatedX = startX + distanceX * progress - 40;
        const interpolatedY = startY + distanceY * progress - 10;
        constants.gameState.playerDiv.style.transform = `translate3d(${interpolatedX}px, ${interpolatedY}px, 0) scale(2)`;

        // Update sprite frame
        const frameIndex = Math.floor(progress * frameSequence.length);
        const frameCol = frameSequence[frameIndex] || frameSequence[0];
        constants.gameState.playerDiv.style.backgroundPosition = `-${frameCol * FRAME_WIDTH}px -${0 * FRAME_HEIGHT}px`;

        if (progress < 1) {
            // Continue animation
            requestAnimationFrame(animate);
        } else {
            // Animation complete
            constants.gameState.playerPosition.x = targetX;
            constants.gameState.playerPosition.y = targetY;
            constants.gameState.isAnimating = false;
            // Reset to the normal frame
            (async () => {
                constants.gameState.offsetX = -8 * FRAME_WIDTH;
                constants.gameState.offsetY = -0 * FRAME_HEIGHT;
                await new Promise(resolve => setTimeout(resolve, 200));
                constants.gameState.playerDiv.style.backgroundPosition = `${constants.gameState.offsetX}px ${constants.gameState.offsetY}px`;
            })();
        }
    }

    requestAnimationFrame(animate);
}

document.addEventListener("keydown", handleKeyDown);


function canMovePlayer(newX, newY) {


    // Convert pixel coordinates to grid indices
    const gridX = Math.floor((newX / 40));
    const gridY = Math.floor((newY + 30) / 40);
    console.log(newGrid[gridY][gridX]);
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

// draw grid after image loads and frame size is calculated
getSpriteFrameSize(constants.SPRITES.player1, constants.SPRITE_COLUMNS, constants.SPRITE_ROWS, () => {
    drawGrid(newGrid);
});