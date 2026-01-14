import { LineProjectileComponent } from "@components";
import { AnimationFactory, AnimationName } from "@factories";
import { HasAnimation } from "@interfaces";
import { getBaseWeaponComponents, WeaponConfig } from "@utils";
import { Actor, Engine, Vector } from "excalibur";

export class Fireball extends Actor implements HasAnimation {
  public animationName = AnimationName.Fireball;

  constructor(
    pos: Vector,
    private _config: WeaponConfig,
    private _direction?: Vector
  ) {
    super({
      pos,
      width: 72,
      height: 32,
      scale: Vector.One,
    });
  }

  public onInitialize(_engine: Engine): void {
    const animation = AnimationFactory.get(this.animationName);

    this.graphics.add("flying", animation);
    this.graphics.use("flying");

    this.addComponent(new LineProjectileComponent(300, this._direction));

    for (const component of getBaseWeaponComponents(this._config)) {
      this.addComponent(component);
    }
  }
}
