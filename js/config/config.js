const Config = {
  // =====================
  // CANVAS
  // =====================
  canvas: {
    tileSize: 32,     // ukuran 1 tile (px)
    gridWidth: 20,    // jumlah tile horizontal
    gridHeight: 20    // jumlah tile vertical
  },

  // =====================
  // GAMEPLAY
  // =====================
  gameplay: {
    tickRate: 175,    // ms per update (semakin kecil = semakin cepat)
    startLength: 3
  },

  // =====================
  // DEFAULT SELECTION
  // =====================
  default: {
    skin: "classic",
    map: "default",
    food: "apple"
  },

  // =====================
  // DEBUG (opsional)
  // =====================
  debug: {
    showGrid: false,
    showHitbox: false
  }
};

export default Config;
