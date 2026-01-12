export default class Food {
  constructor() {
    this.x = 5;
    this.y = 5;
  }

  spawn(snake, map) {
    let valid = false;
    let tries = 0;

    while (!valid && tries < 100) {
      // random posisi
      this.x = Math.floor(Math.random() * map.width);
      this.y = Math.floor(Math.random() * map.height);

      // cek apakah menimpa snake atau wall
      valid =
        !snake.body.some(p => p.x === this.x && p.y === this.y) &&
        !map.walls.some(w => w.x === this.x && w.y === this.y);

      tries++; // ✅ increment di dalam loop
    }

    // jika gagal spawn setelah 100 kali, biarkan tetap di posisi sebelumnya
    if (!valid) {
      console.warn("Gagal spawn food setelah 100 percobaan");
    }
  }

  update(snake, map) {
    const head = snake.body[0];

    // kalau snake makan food
    if (head.x === this.x && head.y === this.y) {
      snake.grow();
      this.spawn(snake, map);
      return true; // penting untuk update score
    }

    return false;
  }
}
