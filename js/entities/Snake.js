export default class Snake {
  constructor(startLength, skin) {
    this.skin = skin;
    this.direction = "right";

    this.body = [];
    for (let i = 0; i < startLength; i++) {
      this.body.push({ x: 10 - i, y: 10 });
    }
  }

  setDirection(dir) {
    this.direction = dir;
  }

  update() {
    const head = { ...this.body[0] };

    switch (this.direction) {
      case "up": head.y--; break;
      case "down": head.y++; break;
      case "left": head.x--; break;
      case "right": head.x++; break;
    }

    this.body.unshift(head);
    this.body.pop();
  }

  grow() {
    const tail = this.body[this.body.length - 1];
    this.body.push({ ...tail });
  }

  hitSelf() {
    const [head, ...body] = this.body;
    return body.some(p => p.x === head.x && p.y === head.y);
  }

  isDead(map) {
    const head = this.body[0];

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= map.width ||
      head.y >= map.height
    ) return true;

    if (this.hitSelf()) return true;

    if (
      map.walls.some(w => w.x === head.x && w.y === head.y)
    ) return true;

    return false;
  }
}
