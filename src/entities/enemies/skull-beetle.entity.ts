import {
  ChaseHeroComponent,
  EnemyComponent,
  HealthComponent,
  PausableComponent,
  XpDropComponent,
} from "@components";
import { Config, Resources } from "@utils";
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
      scale: vec(0.5, 0.5),
    });
  }

  public onInitialize(_engine: Engine): void {
    this.addComponent(new EnemyComponent())
      .addComponent(new ChaseHeroComponent(Config.Enemy.BaseSpeed))
      .addComponent(new XpDropComponent(10))
      .addComponent(new HealthComponent(8))
      .addComponent(new PausableComponent());

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

    this.collider.set(Shape.Box(64, 48, this.anchor));
  }

  public onPreUpdate(engine: Engine, elapsed: number): void {
    super.onPreUpdate(engine, elapsed);

    this._animation.flipHorizontal = this.vel.x < 0;
  }
}
