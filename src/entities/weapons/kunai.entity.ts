import { LineProjectileComponent } from "@components";
import { getBaseWeaponComponents, Resources, WeaponConfig } from "@utils";
import {
  Actor,
  Animation,
  AnimationStrategy,
  Engine,
  range,
  SpriteSheet,
  vec,
  Vector,
} from "excalibur";

export class Kunai extends Actor {
  public static spritesheet = SpriteSheet.fromImageSource({
    image: Resources.SpriteSheets.Kunai,
    grid: {
      rows: 1,
      columns: 8,
      spriteWidth: 32,
      spriteHeight: 16,
    },
  });

  public static animation = Animation.fromSpriteSheet(
    Kunai.spritesheet,
    range(0, 7),
    50,
    AnimationStrategy.Loop
  );

  constructor(
    pos: Vector,
    private _config: WeaponConfig,
    private _direction?: Vector
  ) {
    super({
      pos,
      width: 32,
      height: 16,
      scale: vec(2, 2),
    });
  }

  public onInitialize(_engine: Engine): void {
    this.graphics.add("flying", Kunai.animation);
    this.graphics.use("flying");

    this.addComponent(new LineProjectileComponent(400, this._direction));

    for (const component of getBaseWeaponComponents(this._config)) {
      this.addComponent(component);
    }
  }
}
