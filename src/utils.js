"use strict";

/**
 * @param {number} x - The x coordinate
 * @param {number} y - The y coordinate
 * @param {number} cellSize - The cell size
 * @returns {{ cellX: number, cellY: number }}
 * */
export function getCellCoords(x, y, cellSize) {
  return {
    cellX: Math.floor(x / cellSize),
    cellY: Math.floor(y / cellSize),
  };
}
