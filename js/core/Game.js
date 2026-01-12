import Config from "../config/config.js";
import StateManager from "./StateManager.js";

import Snake from "../entities/Snake.js";
import Food from "../entities/Food.js";
import Map from "../entities/Map.js";

import Renderer from "../systems/Renderer.js";
import Input from "../systems/Input.js";
import SkinManager from "../systems/SkinManager.js";

export default class Game {
  constructor(canvas) {
    // =====================
    // CANVAS & CONTEXT
    // =====================
    this.ctx = canvas.getContext("2d");

    // =====================
    // SCORE & HIGH SCORE
    // =====================
    this.score = 0;
    this.highScore = this.loadHighScore();

    this.scoreEl = document.getElementById("score");
    this.highScoreEl = document.getElementById("highScore");
    this.finalScoreEl = document.getElementById("finalScore");
    this.finalHighScoreEl = document.getElementById("finalHighScore");

    // =====================
    // INPUT
    // =====================
    this.input = new Input();
    this.input.onPause = () => this.togglePause();

    // =====================
    // STATE, RENDERER, SKIN
    // =====================
    this.state = new StateManager();
    this.renderer = new Renderer(this.ctx, Config.canvas.tileSize);
    this.skinManager = new SkinManager();

    // =====================
    // LOOP
    // =====================
    this.lastUpdate = 0;
    this.running = false;
    this.paused = false;
  }

  async init(options) {
    // =====================
    // RESET SCORE
    // =====================
    this.score = 0;
    this.updateScoreUI();
    this.updateHighScoreUI();

    // =====================
    // SHOW GAME SCREEN
    // =====================
    this.state.show("game");

    // =====================
    // LOAD MAP
    // =====================
    this.map = new Map(options.map);

    // =====================
    // ENTITIES
    // =====================
    this.snake = new Snake(Config.gameplay.startLength, options.skin);
    this.food = new Food();
    this.food.spawn(this.snake, this.map);

    // =====================
    // LOAD ASSETS
    // =====================
    this.snakeImage = await this.skinManager.get(
      `assets/skins/${options.skin}.png`
    );

    this.foodImage = await this.skinManager.get(
      `assets/food/${options.food}.png`
    );

    // =====================
    // START LOOP
    // =====================
    this.running = true;
    this.lastUpdate = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(time) {
    if (!this.running) return;

    if (time - this.lastUpdate > Config.gameplay.tickRate) {
      if (!this.paused) {
        this.update();
        this.render();
      }
      this.lastUpdate = time;
    }

    requestAnimationFrame(this.loop.bind(this));
  }

  update() {
    // =====================
    // UPDATE SNAKE
    // =====================
    this.snake.setDirection(this.input.direction);
    this.snake.update();

    // =====================
    // UPDATE FOOD
    // =====================
    if (this.food.update(this.snake, this.map)) {
      this.score += 10;
      this.updateScoreUI();
    }

    // =====================
    // CEK DEAD
    // =====================
    if (this.snake.isDead(this.map)) {
      this.gameOver();
    }
  }

  render() {
    this.renderer.clear();

    if (this.paused) this.ctx.globalAlpha = 0.3;
    else this.ctx.globalAlpha = 1;

    if (Config.debug.showGrid) {
      this.renderer.drawGrid(this.map.width, this.map.height);
    }

    this.renderer.drawMap(this.map);
    this.renderer.drawFood(this.food, this.foodImage);
    this.renderer.drawSnake(this.snake, this.snakeImage);
  }

  gameOver() {
    this.running = false;

    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.saveHighScore();
    }

    if (this.finalScoreEl) this.finalScoreEl.textContent = `Score: ${this.score}`;
    if (this.finalHighScoreEl) this.finalHighScoreEl.textContent = `High Score: ${this.highScore}`;

    this.state.show("gameOver");
  }

  togglePause() {
    this.paused = !this.paused;

    if (this.paused) this.state.show("pause");
    else this.state.show("game");
  }

  // =====================
  // LOCAL STORAGE HIGH SCORE
  // =====================
  loadHighScore() {
    return Number(localStorage.getItem("snake_high_score")) || 0;
  }

  saveHighScore() {
    localStorage.setItem("snake_high_score", this.highScore);
  }

  // =====================
  // UPDATE UI
  // =====================
  updateScoreUI() {
    if (this.scoreEl) this.scoreEl.textContent = `Score: ${this.score}`;
  }

  updateHighScoreUI() {
    if (this.highScoreEl) this.highScoreEl.textContent = `High Score: ${this.highScore}`;
  }
}
