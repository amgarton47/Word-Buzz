// Tile class
//   - creates a 'tile' for a given letter
//   - has x,y coords, the letter it represents,
//     and a bool to check if is a center letter or other letter
class Tile {
  constructor(x, y, letter, isCenter) {
    this.x = x;
    this.y = y;
    this.letter = letter.toUpperCase();
    this.isCenter = isCenter;

    if (isCenter) {
      fill(242, 211, 5);
    } else {
      fill(212, 212, 212);
    }

    strokeWeight(0);
    polygon(this.x, this.y, TILE_SIZE, 6);

    fill(0);
    textSize(50);
    textFont(font);
    text(this.letter, x - TILE_SIZE / 3, y + TILE_SIZE / 3);
  }
}
