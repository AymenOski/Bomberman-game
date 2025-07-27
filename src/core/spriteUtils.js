let FRAME_WIDTH, FRAME_HEIGHT, SPRITE_SHEET_WIDTH, SPRITE_SHEET_HEIGHT ;

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

export {
    getSpriteFrameSize,
    FRAME_WIDTH, FRAME_HEIGHT,
    SPRITE_SHEET_WIDTH, SPRITE_SHEET_HEIGHT
};