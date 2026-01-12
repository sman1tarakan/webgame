export default class StateManager {
  constructor() {
    this.states = {
      lobby: document.getElementById("lobby"),
      game: document.getElementById("game"),
      pause: document.getElementById("pause"),
      gameOver: document.getElementById("gameOver")
    };

    this.current = null;
  }

  show(stateName) {
    Object.values(this.states).forEach(screen => {
      screen.classList.remove("active");
    });

    if (this.states[stateName]) {
      this.states[stateName].classList.add("active");
      this.current = stateName;
    }
  }
}
