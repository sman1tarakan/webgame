import Game from "./core/Game.js";
import Config from "./config/config.js";
import Assets from "./assets/assets.js";

// DOM ELEMENTS
const canvas = document.getElementById("gameCanvas");
const startBtn = document.getElementById("startGame");
const skinSelect = document.getElementById("skinSelect");
const mapSelect = document.getElementById("mapSelect");
const skinPreview = document.getElementById("skinPreview");
const mapPreview = document.getElementById("mapPreview");

// SET CANVAS SIZE
canvas.width = Config.canvas.tileSize * Config.canvas.gridWidth;
canvas.height = Config.canvas.tileSize * Config.canvas.gridHeight;

// POPULATE OPTIONS
Object.values(Assets.skins).forEach(skin => {
  const option = document.createElement("option");
  option.value = skin.id;
  option.textContent = skin.name;
  skinSelect.appendChild(option);
});

// preview skin
skinSelect.addEventListener("change", () => {
  const skin = Assets.skins[skinSelect.value];
  skinPreview.style.backgroundImage = `url(${skin.image})`;
  skinPreview.style.backgroundSize = "contain";
  skinPreview.style.backgroundRepeat = "no-repeat";
  skinPreview.style.backgroundPosition = "center";
});
skinSelect.dispatchEvent(new Event("change"));

// POPULATE MAPS
Object.values(Assets.maps).forEach(map => {
  const option = document.createElement("option");
  option.value = map.id;
  option.textContent = map.id.toUpperCase();
  mapSelect.appendChild(option);
});

// preview map (jumlah wall)
mapSelect.addEventListener("change", async () => {
  const mapData = await loadMap(Assets.maps[mapSelect.value]);
  mapPreview.textContent = mapData.walls.length + " walls";
});
mapSelect.dispatchEvent(new Event("change"));

// START GAME
let game = null;
startBtn.addEventListener("click", async () => {
  const selectedSkin = skinSelect.value;
  const selectedMap = mapSelect.value;

  const mapData = await loadMap(Assets.maps[selectedMap]);

  game = new Game(canvas);
  await game.init({
    skin: selectedSkin,
    map: mapData,
    food: Config.default.food
  });
});

// LOAD MAP JSON
async function loadMap(mapConfig) {
  const res = await fetch(mapConfig.file);
  if (!res.ok) throw new Error(`Gagal load map: ${mapConfig.file}`);
  return await res.json();
}
