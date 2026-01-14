import {
  ChaseHeroComponent,
  EnemyComponent,
  HealthComponent,
  XpDropComponent,
} from "@components";
import { Resources } from "@utils";
import {
  Actor,
  Animation,
  Engine,
  range,
  Shape,
  SpriteSheet,
  vec,
  Vector,
} from "excalibur";

export class SkullBeetle extends Actor {
  private _animation!: Animation;

  constructor(pos: Vector) {
    super({
      pos,
      width: 96,
      height: 48,
    });
  }

  public onInitialize(engine: Engine): void {
    this.addComponent(new EnemyComponent());
    this.addComponent(new ChaseHeroComponent(150));
    this.addComponent(new XpDropComponent(10));
    this.addComponent(new HealthComponent(8));

    const spritesheet = SpriteSheet.fromImageSource({
      image: Resources.SpriteSheets.SkullBeetle,
      grid: {
        rows: 3,
        columns: 12,
        spriteWidth: 96,
        spriteHeight: 48,
      },
    });

    this._animation = Animation.fromSpriteSheet(
      spritesheet,
      range(23, 31),
      100
    );

    this.graphics.add("moving", this._animation);
    this.graphics.use("moving");

    this.collider.set(Shape.Box(64, 32, this.anchor, vec(0, 12)));
  }

  public onPreUpdate(engine: Engine, elapsed: number): void {
    super.onPreUpdate(engine, elapsed);

    this._animation.flipHorizontal = this.vel.x < 0;
  }
}
