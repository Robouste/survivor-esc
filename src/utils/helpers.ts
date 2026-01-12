import { Engine, randomIntInRange, vec, Vector } from "excalibur";

export class Helpers {
  public static getRandomSpawnPosition(engine: Engine, offset = 50): Vector {
    const camera = engine.currentScene.camera;
    const halfWidth = engine.drawWidth / 2;
    const halfHeight = engine.drawHeight / 2;

    // Calculate world-space bounds based on camera position
    const left = camera.pos.x - halfWidth;
    const right = camera.pos.x + halfWidth;
    const top = camera.pos.y - halfHeight;
    const bottom = camera.pos.y + halfHeight;

    // 0: Top, 1: Right, 2: Bottom, 3: Left
    const side = randomIntInRange(0, 3);

    let x = 0;
    let y = 0;

    switch (side) {
      // Top
      case 0:
        x = randomIntInRange(left, right);
        y = top - offset;
        break;
      // Right
      case 1:
        x = right + offset;
        y = randomIntInRange(top, bottom);
        break;
      // Bottom
      case 2:
        x = randomIntInRange(left, right);
        y = bottom + offset;
        break;
      // Left
      case 3:
        x = left - offset;
        y = randomIntInRange(top, bottom);
        break;
    }

    return vec(x, y);
  }
}
