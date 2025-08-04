import * as constants from './constants.js';
import { FRAME_WIDTH, FRAME_HEIGHT, SPRITE_SHEET_WIDTH, SPRITE_SHEET_HEIGHT } from './spriteUtils.js';

function createPlayerDiv(frameRow = 0, frameCol = 8) {
    const playerDiv = document.createElement("div");
    playerDiv.style.position = "absolute";
    playerDiv.style.top = `${constants.TOP}px`;
    playerDiv.style.left =  `${constants.LEFT}px`;
    playerDiv.style.width = `${FRAME_WIDTH}px`;
    playerDiv.style.height = `${FRAME_HEIGHT}px`;
    playerDiv.style.backgroundSize = `${SPRITE_SHEET_WIDTH}px ${SPRITE_SHEET_HEIGHT}px`;
    playerDiv.style.backgroundImage = `url(${constants.SPRITES.player1})`;
    playerDiv.style.transform = "scale(2)";
    playerDiv.style.backgroundPosition = `-${frameCol * FRAME_WIDTH}px -${frameRow * FRAME_HEIGHT}px`;
    playerDiv.style.imageRendering = "pixelated";
    playerDiv.style.setProperty("image-rendering", "crisp-edges");
    return playerDiv;
}

export { createPlayerDiv };
