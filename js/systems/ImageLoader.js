export default class ImageLoader {
  static load(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;

      img.onload = () => resolve(img);
      img.onerror = () =>
        reject(new Error(`Gagal load image: ${src}`));
    });
  }
}
