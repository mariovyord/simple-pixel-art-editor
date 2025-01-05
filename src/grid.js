"use-strict";

export class PixelArtGrid {
  constructor(gridSize, cellSize, ctx) {
    this.gridSize = gridSize;
    this.cellSize = cellSize;
    this.ctx = ctx;
    this.grid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => "#ffffff")
    );
    this.currentColor = "#000000";
    /* type {"pen" | "bucket"} */
    this.toolState = "pen";
    this.isDrawing = false;
  }

  drawGrid() {
    this.ctx.save();
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        this.ctx.fillStyle = this.grid[x][y];
        this.ctx.fillRect(
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize,
          this.cellSize
        );
        this.ctx.strokeStyle = "lightgray";
        this.ctx.strokeRect(
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize,
          this.cellSize
        );
      }
    }
    this.ctx.restore();
  }

  fillCell(cellX, cellY, color) {
    this.ctx.save();
    this.grid[cellX][cellY] = color;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      cellX * this.cellSize,
      cellY * this.cellSize,
      this.cellSize,
      this.cellSize
    );
    this.ctx.strokeStyle = "lightgray";
    this.ctx.strokeRect(
      cellX * this.cellSize,
      cellY * this.cellSize,
      this.cellSize,
      this.cellSize
    );
    this.ctx.restore();
  }

  floodFill(x, y, targetColor, fillColor) {
    if (x < 0 || y < 0 || x >= this.gridSize || y >= this.gridSize) return; // Out of bounds
    if (this.grid[x][y] !== targetColor || this.grid[x][y] === fillColor)
      return; // Different color or already filled

    // Fill the current cell
    this.grid[x][y] = fillColor;
    this.fillCell(x, y, fillColor);

    // Recursively fill adjacent cells
    this.floodFill(x + 1, y, targetColor, fillColor);
    this.floodFill(x - 1, y, targetColor, fillColor);
    this.floodFill(x, y + 1, targetColor, fillColor);
    this.floodFill(x, y - 1, targetColor, fillColor);
  }

  clearGrid() {
    this.grid = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => "#ffffff")
    );
    this.drawGrid();
  }
}
