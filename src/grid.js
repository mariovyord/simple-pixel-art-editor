"use strict";

/**
 * Represents an individual cell in the grid.
 */
class GridCell {
  /**
   * @param {number} x - The x-coordinate of the cell in the grid.
   * @param {number} y - The y-coordinate of the cell in the grid.
   * @param {number} size - The size of the cell (width and height).
   * @param {string} [color="#ffffff"] - The initial color of the cell.
   */
  constructor(x, y, size, color = "#ffffff") {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  /**
   * Draws the cell on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    ctx.strokeStyle = "lightgray";
    ctx.strokeRect(
      this.x * this.size,
      this.y * this.size,
      this.size,
      this.size
    );
  }

  /**
   * Sets the color of the cell.
   * @param {string} color - The new color of the cell.
   */
  setColor(color) {
    this.color = color;
  }
}

/**
 * Manages the grid of cells and provides methods for drawing and interaction.
 */
export class PixelArtGrid {
  /**
   * @param {number} gridSize - The number of rows and columns in the grid.
   * @param {number} cellSize - The size of each cell (width and height).
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  constructor(gridSize, cellSize, ctx) {
    this.gridSize = gridSize;
    this.cellSize = cellSize;
    this.ctx = ctx;
    this.grid = this.createGrid();
    this.currentColor = "#000000";
    /** @type {"pen" | "bucket"} */
    this.toolState = "pen";
    this.isDrawing = false;
  }

  /**
   * Creates the grid of `GridCell` instances.
   * @returns {GridCell[][]} A 2D array of `GridCell` instances.
   */
  createGrid() {
    return Array.from({ length: this.gridSize }, (_, x) =>
      Array.from(
        { length: this.gridSize },
        (_, y) => new GridCell(x, y, this.cellSize)
      )
    );
  }

  /**
   * Draws the entire grid on the canvas.
   */
  drawGrid() {
    this.ctx.clearRect(
      0,
      0,
      this.gridSize * this.cellSize,
      this.gridSize * this.cellSize
    );
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        this.grid[x][y].draw(this.ctx);
      }
    }
  }

  /**
   * Fills a cell with the specified color.
   * @param {number} cellX - The x-coordinate of the cell in the grid.
   * @param {number} cellY - The y-coordinate of the cell in the grid.
   * @param {string} color - The color to fill the cell with.
   */
  fillCell(cellX, cellY, color) {
    if (this.isValidCell(cellX, cellY)) {
      const cell = this.grid[cellX][cellY];
      cell.setColor(color);
      cell.draw(this.ctx);
    }
  }

  /**
   * Performs a flood fill operation starting from a specific cell.
   * @param {number} x - The x-coordinate of the starting cell.
   * @param {number} y - The y-coordinate of the starting cell.
   * @param {string} targetColor - The color to replace.
   * @param {string} fillColor - The new color to apply.
   */
  floodFill(x, y, targetColor, fillColor) {
    if (!this.isValidCell(x, y)) return;
    const cell = this.grid[x][y];
    if (cell.color !== targetColor || cell.color === fillColor) return;

    // Fill the current cell
    cell.setColor(fillColor);
    cell.draw(this.ctx);

    // Recursively fill adjacent cells
    this.floodFill(x + 1, y, targetColor, fillColor);
    this.floodFill(x - 1, y, targetColor, fillColor);
    this.floodFill(x, y + 1, targetColor, fillColor);
    this.floodFill(x, y - 1, targetColor, fillColor);
  }

  /**
   * Clears the grid, optionally setting all cells to a specified color.
   * @param {string} [color="#ffffff"] - The color to reset the grid to.
   */
  clearGrid(color = "#ffffff") {
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        this.grid[x][y].setColor(color);
      }
    }
    this.drawGrid();
  }

  /**
   * Checks if a cell coordinate is valid within the grid.
   * @param {number} x - The x-coordinate of the cell.
   * @param {number} y - The y-coordinate of the cell.
   * @returns {boolean} True if the cell is valid, false otherwise.
   */
  isValidCell(x, y) {
    return x >= 0 && y >= 0 && x < this.gridSize && y < this.gridSize;
  }
}
