export default class Input {
  constructor() {
    this.direction = "right";
    this.onPause = null; // callback pause

    window.addEventListener("keydown", e => {
      switch (e.key) {
        case "ArrowUp":
          if (this.direction !== "down") this.direction = "up";
          break;
        case "ArrowDown":
          if (this.direction !== "up") this.direction = "down";
          break;
        case "ArrowLeft":
          if (this.direction !== "right") this.direction = "left";
          break;
        case "ArrowRight":
          if (this.direction !== "left") this.direction = "right";
          break;
        case "Escape":
          if (this.onPause) this.onPause();
          break;
      }
    });
  }
}
