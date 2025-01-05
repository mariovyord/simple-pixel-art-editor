"use strict";

import { PixelArtGrid } from "./grid.js";
import { setupTools } from "./tools.js";
import { setupEventListeners } from "./events.js";

// Main app initialization

/* type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
/* type {CanvasRenderingContext2D} */
const ctx = canvas?.getContext("2d");

if (!canvas || !ctx) {
  throw new Error("Canvas not supported or missing");
}

// Create a grid instance
const gridSize = 16;
const cellSize = 30;
canvas.width = gridSize * cellSize;
canvas.height = gridSize * cellSize;
const grid = new PixelArtGrid(gridSize, cellSize, ctx);

// Setup tools and event listeners
setupTools(grid);
setupEventListeners(canvas, grid);

// Initial draw
grid.drawGrid();
