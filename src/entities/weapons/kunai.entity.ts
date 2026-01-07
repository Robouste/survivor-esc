import {
  AcquireClosestEnemyComponent,
  EnemyComponent,
  LineProjectileComponent,
} from "@components";
import { Resources } from "@utils";
import {
  Actor,
  Animation,
  AnimationStrategy,
  Collider,
  Engine,
  range,
  SpriteSheet,
  vec,
  Vector,
} from "excalibur";

export class Kunai extends Actor {
  constructor(pos: Vector) {
    super({
      pos,
      width: 32,
      height: 16,
      scale: vec(2, 2),
    });
  }

  public onInitialize(engine: Engine): void {
    const spritesheet = SpriteSheet.fromImageSource({
      image: Resources.SpriteSheets.Kunai,
      grid: {
        rows: 1,
        columns: 8,
        spriteWidth: 32,
        spriteHeight: 16,
      },
    });

    const animation = Animation.fromSpriteSheet(
      spritesheet,
      range(0, 7),
      50,
      AnimationStrategy.Loop
    );

    this.graphics.add("flying", animation);
    this.graphics.use("flying");

    this.addComponent(new LineProjectileComponent(400));
    this.addComponent(new AcquireClosestEnemyComponent());
  }

  public onCollisionStart(_self: Collider, other: Collider): void {
    if (other.owner.has(EnemyComponent)) {
      other.owner.kill();
      this.kill();
    }
  }
}
