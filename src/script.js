const playground = document.getElementsByClassName('playground')[0];
const fragment = document.createDocumentFragment();


const grid = [
    ["C1", "WT", "WT", "WT", "WT", "WT", "WT", "WT", "WT", "WT", "C2"],
    ["WL", "C", "C", "E", "E", "E", "E", "E", "C", "C", "WR"],
    ["WL", "C", "E", "E", "E", "E", "E", "E", "E", "C", "WR"],
    ["WL", "E", "E", "E", "E", "E", "E", "E", "E", "E", "WR"],
    ["WL", "E", "E", "E", "E", "E", "E", "E", "E", "E", "WR"],
    ["WL", "E", "E", "E", "E", "E", "E", "E", "E", "E", "WR"],
    ["WL", "E", "E", "E", "E", "E", "E", "E", "E", "E", "WR"],
    ["WL", "E", "E", "E", "E", "E", "E", "E", "E", "E", "WR"],
    ["WL", "C", "E", "E", "E", "E", "E", "E", "E", "C", "WR"],
    ["WL", "C", "C", "E", "E", "E", "E", "E", "C", "C", "WR"],
    ["C3", "WB", "WB", "WB", "WB", "WB", "WB", "WB", "WB", "WB", "C4"]
];

function drawGrid(grid) {

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            const cell = document.createElement('div');
            if (grid[i][j].startsWith("W")) {
                if (grid[i][j][1] === "T") {
                    cell.classList.add("top-wall");

                } else if (grid[i][j][1] === "L") {
                    cell.classList.add("left-wall");

                } else if (grid[i][j][1] === "R") {
                    cell.classList.add("right-wall");

                } else if (grid[i][j][1] === "B") {
                    cell.classList.add("bottom-wall");

                }
            } else if (grid[i][j] === "E") {
                cell.classList.add("floor");

            } else if (grid[i][j] === "BW") {
                cell.classList.add("breakable-wall");

            } else if (grid[i][j] === "UW") {
                cell.classList.add("unbreakable-wall");

                // corners 
            } else if (grid[i][j].startsWith("C")) {
                if (grid[i][j].includes("1")) {
                    cell.classList.add("corner1");

                } else if (grid[i][j].includes("2")) {
                    cell.classList.add("corner2");

                } else if (grid[i][j].includes("3")) {
                    cell.classList.add("corner3");

                } else if (grid[i][j].includes("4")) {
                    cell.classList.add("corner4");
                } else {
                    cell.classList.add("empty-corner");
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
                if (j === 1 && i != 0 && i != grid.length - 1 || i === 1 && j != 0 && j !== grid.length - 1 || j === grid[i].length - 2 && i != 0 && i != grid.length - 1 || i === grid.length - 2 && j != 0 && j != grid.length - 1) {
                    if (Math.random() <= 0.5) {
                        grid[i][j] = "E";
                        continue
                    } else {
                        grid[i][j] = "BW";
                        continue
                    }
                }
                if (Math.random() <= 0.20) {
                    grid[i][j] = "UW";
                } else if (Math.random() <= 0.66) {
                    grid[i][j] = "BW";
                } else {
                    grid[i][j] = "E";
                }
            }
        }
    }
    return grid;
}

const newGrid = transformGrid(grid);

drawGrid(newGrid);
