"use strict";

/**
 * @param {PixelArtGrid} grid - The grid instance
 * @returns {void}
 * */
export function setupTools(grid) {
  document.getElementById("colorPicker").addEventListener("input", (e) => {
    grid.currentColor = e.target.value;
  });

  document.getElementById("penTool").addEventListener("click", () => {
    grid.toolState = "pen";
    setActiveTool("penTool", "bucketButton");
  });

  document.getElementById("bucketButton").addEventListener("click", () => {
    grid.toolState = "bucket";
    setActiveTool("bucketButton", "penTool");
  });

  document.getElementById("clearButton").addEventListener("click", () => {
    grid.clearGrid();
  });
}

/**
 * @param {string} active - The active tool ID
 * @param {string} inactive - The inactive tool ID
 * @returns {void}
 * */
function setActiveTool(active, inactive) {
  document.getElementById(active).style.backgroundColor = "lightgreen";
  document.getElementById(inactive).style.backgroundColor = "";
}
