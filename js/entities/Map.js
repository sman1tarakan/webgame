export default class Map {
  constructor(mapData) {
    this.width = mapData.width;
    this.height = mapData.height;
    this.walls = mapData.walls || [];
  }
}
