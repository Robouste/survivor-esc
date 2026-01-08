import {
  AcquireClosestEnemyComponent,
  AutoCleanupComponent,
  DamageComponent,
  LineProjectileComponent,
} from "@components";
import { Resources } from "@utils";
import {
  Actor,
  Animation,
  AnimationStrategy,
  Engine,
  range,
  SpriteSheet,
  Vector,
} from "excalibur";

export class Fireball extends Actor {
  constructor(pos: Vector, private _direction?: Vector) {
    super({
      pos,
      width: 72,
      height: 32,
      scale: Vector.One,
    });
  }

  public onInitialize(engine: Engine): void {
    const spritesheet = SpriteSheet.fromImageSource({
      image: Resources.SpriteSheets.Fireball,
      grid: {
        rows: 1,
        columns: 10,
        spriteWidth: 72,
        spriteHeight: 32,
      },
    });

    const animation = Animation.fromSpriteSheet(
      spritesheet,
      range(0, 9),
      50,
      AnimationStrategy.Loop
    );

    this.graphics.add("flying", animation);
    this.graphics.use("flying");

    this.addComponent(new LineProjectileComponent(300, this._direction));

    if (!this._direction) {
      this.addComponent(new AcquireClosestEnemyComponent());
    }

    this.addComponent(new DamageComponent(90));
    // this.addComponent(new PiercingComponent(2));
    this.addComponent(new AutoCleanupComponent());
  }
}
