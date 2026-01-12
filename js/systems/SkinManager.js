import ImageLoader from "./ImageLoader.js";

export default class SkinManager {
  constructor() {
    this.cache = {};
  }

  async get(src) {
    if (!this.cache[src]) {
      this.cache[src] = await ImageLoader.load(src);
    }
    return this.cache[src];
  }
}
