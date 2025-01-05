"use strict";

import { getCellCoords } from "./utils.js";

/**
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {PixelArtGrid} grid - The grid instance
 * @returns {void}
 * */
export function setupEventListeners(canvas, grid) {
  canvas.addEventListener("mousedown", (event) => {
    const rect = canvas.getBoundingClientRect();
    const { cellX, cellY } = getCellCoords(
      event.clientX - rect.left,
      event.clientY - rect.top,
      grid.cellSize
    );

    if (grid.toolState === "bucket") {
      const targetColor = grid.grid[cellX][cellY];
      if (targetColor !== grid.currentColor) {
        grid.floodFill(cellX, cellY, targetColor, grid.currentColor);
      }
    } else if (grid.toolState === "pen") {
      grid.isDrawing = true;
      grid.fillCell(cellX, cellY, grid.currentColor);
    }
  });

  canvas.addEventListener("mousemove", (event) => {
    if (!grid.isDrawing || grid.toolState !== "pen") return;
    const rect = canvas.getBoundingClientRect();
    const { cellX, cellY } = getCellCoords(
      event.clientX - rect.left,
      event.clientY - rect.top,
      grid.cellSize
    );
    grid.fillCell(cellX, cellY, grid.currentColor);
  });

  canvas.addEventListener("mouseup", () => {
    grid.isDrawing = false;
  });

  canvas.addEventListener("mouseleave", () => {
    grid.isDrawing = false;
  });
}
