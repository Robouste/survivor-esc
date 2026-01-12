import { LineProjectileComponent } from "@components";
import { getBaseWeaponComponents, Resources, WeaponConfig } from "@utils";
import {
  Actor,
  Animation,
  AnimationStrategy,
  Engine,
  range,
  SpriteSheet,
  Vector,
} from "excalibur";

export class Knife extends Actor {
  constructor(
    pos: Vector,
    private _config: WeaponConfig,
    private _direction?: Vector
  ) {
    super({
      pos,
      width: 32,
      height: 32,
      scale: new Vector(2, 2),
    });
  }

  public onInitialize(engine: Engine): void {
    const spritesheet = SpriteSheet.fromImageSource({
      image: Resources.SpriteSheets.Knife,
      grid: {
        rows: 1,
        columns: 16,
        spriteWidth: 32,
        spriteHeight: 32,
      },
    });

    const animation = Animation.fromSpriteSheet(
      spritesheet,
      range(0, 15),
      50,
      AnimationStrategy.Loop
    );

    this.graphics.add("flying", animation);
    this.graphics.use("flying");

    this.addComponent(new LineProjectileComponent(400, this._direction));

    for (const component of getBaseWeaponComponents(this._config)) {
      this.addComponent(component);
    }
  }
}
