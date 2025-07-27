import * as constants from "./constants.js";
import { FRAME_WIDTH, FRAME_HEIGHT, SPRITE_SHEET_WIDTH, SPRITE_SHEET_HEIGHT } from './spriteUtils.js';
import { createPlayerDiv } from './player.js';
import { gameState } from '../core/constants.js';

function drawGrid(grid, frameRow = 0, frameCol = 8) {
    // constants.playground.innerHTML = "";
    const fragment = document.createDocumentFragment();
    gameState.playerDiv = createPlayerDiv(frameRow, frameCol);
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
            } else if (grid[i][j] === "EC") {
                cell.classList.add("floor");
            }
            fragment.appendChild(cell);
            if (i === 1 && j === 1) {
                fragment.appendChild(gameState.playerDiv);
            }
        }
    }
    constants.playground.appendChild(fragment);
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

export { drawGrid, transformGrid };