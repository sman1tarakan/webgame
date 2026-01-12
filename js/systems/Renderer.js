export default class Renderer {
  constructor(ctx, tileSize) {
    this.ctx = ctx;
    this.tileSize = tileSize;
  }

  clear() {
    this.ctx.clearRect(
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
  }

  drawSnake(snake, image) {
    snake.body.forEach(part => {
      this.ctx.drawImage(
        image,
        part.x * this.tileSize,
        part.y * this.tileSize,
        this.tileSize,
        this.tileSize
      );
    });
  }

  drawFood(food, image) {
    this.ctx.drawImage(
      image,
      food.x * this.tileSize,
      food.y * this.tileSize,
      this.tileSize,
      this.tileSize
    );
  }

  drawMap(map) {
    this.ctx.fillStyle = "#334155";
    map.walls.forEach(wall => {
      this.ctx.fillRect(
        wall.x * this.tileSize,
        wall.y * this.tileSize,
        this.tileSize,
        this.tileSize
      );
    });
  }

  drawGrid(width, height) {
    this.ctx.strokeStyle = "#1e293b";

    for (let x = 0; x <= width; x++) {
      this.ctx.beginPath();
      this.ctx.moveTo(x * this.tileSize, 0);
      this.ctx.lineTo(
        x * this.tileSize,
        height * this.tileSize
      );
      this.ctx.stroke();
    }

    for (let y = 0; y <= height; y++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y * this.tileSize);
      this.ctx.lineTo(
        width * this.tileSize,
        y * this.tileSize
      );
      this.ctx.stroke();
    }
  }
}
