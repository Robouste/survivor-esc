import { Engine, randomIntInRange, vec, Vector } from "excalibur";

export class Helpers {
  public static getRandomSpawnPosition(engine: Engine, offset = 50): Vector {
    const bounds = engine.currentScene.camera.viewport;

    // 0: Top, 1: Right, 2: Bottom, 3: Left
    const side = randomIntInRange(0, 3);
    console.log("side", side);

    let x = 0;
    let y = 0;

    switch (side) {
      case 0:
        x = randomIntInRange(bounds.left, bounds.right);
        y = -offset;
        break;
      case 1:
        x = bounds.right + offset;
        y = randomIntInRange(bounds.top, bounds.bottom);
        break;
      case 2:
        x = randomIntInRange(bounds.left, bounds.right);
        y = bounds.bottom + offset;
        break;
      case 3:
        x = -offset;
        y = randomIntInRange(bounds.top, bounds.bottom);
        break;
    }

    return vec(x, y);
  }
}
