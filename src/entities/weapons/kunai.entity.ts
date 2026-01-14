import { LineProjectileComponent } from "@components";
import { AnimationFactory, AnimationName } from "@factories";
import { HasAnimation } from "@interfaces";
import { getBaseWeaponComponents, WeaponConfig } from "@utils";
import { Actor, Engine, vec, Vector } from "excalibur";

export class Kunai extends Actor implements HasAnimation {
  public animationName = AnimationName.Kunai;

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
    const animation = AnimationFactory.get(this.animationName);
    this.graphics.add("flying", animation);
    this.graphics.use("flying");

    this.addComponent(new LineProjectileComponent(400, this._direction));

    for (const component of getBaseWeaponComponents(this._config)) {
      this.addComponent(component);
    }
  }
}
