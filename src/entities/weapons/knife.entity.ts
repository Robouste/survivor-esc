import { LineProjectileComponent } from "@components";
import { AnimationFactory, AnimationName } from "@factories";
import { HasAnimation } from "@interfaces";
import { Config, getBaseWeaponComponents, WeaponConfig } from "@utils";
import { Actor, Engine, Vector } from "excalibur";

export class Knife extends Actor implements HasAnimation {
  public animationName = AnimationName.Knife;

  constructor(
    pos: Vector,
    private _config: WeaponConfig,
    private _direction?: Vector
  ) {
    super({
      pos,
      width: 32,
      height: 32,
      // scale: new Vector(2, 2),
    });
  }

  public onInitialize(engine: Engine): void {
    const animation = AnimationFactory.get(this.animationName);

    this.graphics.add("flying", animation);
    this.graphics.use("flying");

    this.addComponent(
      new LineProjectileComponent(Config.Hero.ProjectileSpeed, this._direction)
    );

    for (const component of getBaseWeaponComponents(this._config)) {
      this.addComponent(component);
    }
  }
}
